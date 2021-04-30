import crypto from 'crypto';
import * as sigUtil from 'eth-sig-util';
import * as ethUtil from 'ethereumjs-util';
import human from 'humanparser';
import joi from 'joi';
import * as jwt from 'jsonwebtoken';
import * as nexus from 'nexus';
import {v4 as uuid} from 'uuid';
import {jwtConfig, jwtCookieName} from '@/graphql/api/jwt';
import type {JwtData} from '@/graphql/api/jwt';
import * as cookies from '@/graphql/api/utils/cookies';
import {errorCode, is, messages} from '@/graphql/api/validation';
import {Viewer} from './schemas';

export const logIn = nexus.mutationField('logIn', {
  type: Viewer,

  args: {
    walletAddress: nexus.nonNull(nexus.stringArg()),
  },

  validate: joi.object({
    walletAddress: joi
      .string()
      .custom((address, helpers) =>
        is.truthy(
          ethUtil.isValidAddress(address),
          errorCode.wallet.invalidAddress
        )(address, helpers)
      )
      .messages(messages),
  }),

  async resolve(source, {walletAddress}, {req, res, db}) {
    let viewer = await db.user.findUnique({where: {walletAddress}});
    const ips =
      req.headers['x-forwarded-for'] || req.socket.remoteAddress || '::1';
    const ip = Array.isArray(ips) ? ips[0] : ips;

    if (!viewer) {
      viewer = await db.user.create({
        data: {
          walletAddress,
          encryptionKey: crypto.randomBytes(32).toString('base64'),
          createdIp: ip,
          latestIp: ip,
        },
      });
    } else {
      await db.user.update({where: {id: viewer.id}, data: {latestIp: ip}});
    }

    /*
    const jwtData: JwtData = {id: viewer.id};
    cookies.set(
      res,
      jwtCookieName,
      jwt.sign(jwtData, req.secrets.jwt, {
        ...jwtConfig,
        expiresIn: '30d',
      }),
      {
        maxAge: 30 * 24 * 60 * 1000,
        httpOnly: true,
        secure: process.env.NODE_ENV !== 'development',
      }
    );
      */
    return viewer;
  },
});

export const verifySignature = nexus.mutationField('verifySignature', {
  type: Viewer,

  args: {
    walletAddress: nexus.nonNull(nexus.stringArg()),
    signature: nexus.nonNull(nexus.stringArg()),
    message: nexus.nonNull(nexus.stringArg()),
  },

  validate: joi.object({
    walletAddress: joi
      .string()
      .custom((address, helpers) =>
        is.truthy(
          ethUtil.isValidAddress(address),
          errorCode.wallet.invalidAddress
        )(address, helpers)
      )
      .messages(messages),
    signature: joi.string().messages(messages),
    message: joi.string().messages(messages),
  }),

  async resolve(source, {walletAddress, message, signature}, {req, res, db}) {
    const viewer = await db.user.findUnique({where: {walletAddress}});

    if (!viewer) {
      throw new Error('Could not find a user with this wallet address');
    }
    // We now are in possession of msg, publicAddress and signature. We
    // will use a helper from eth-sig-util to extract the address from the signature
    const msgBufferHex = ethUtil.bufferToHex(
      Buffer.from(message.replace('{nonce}', viewer.nonce), 'utf8')
    );
    const address = sigUtil.recoverPersonalSignature({
      data: msgBufferHex,
      sig: signature,
    });

    if (address.toLowerCase() !== walletAddress.toLowerCase()) {
      throw new Error('Invalid signature');
    }

    await db.user.update({where: {id: viewer.id}, data: {nonce: uuid()}});
    const jwtData: JwtData = {id: viewer.id};

    cookies.set(
      res,
      jwtCookieName,
      jwt.sign(jwtData, req.secrets.jwt, {
        ...jwtConfig,
        expiresIn: '30d',
      }),
      {
        maxAge: 30 * 24 * 60 * 1000,
        httpOnly: true,
        secure: process.env.NODE_ENV !== 'development',
      }
    );

    return viewer;
  },
});

export const authenticate = nexus.mutationField('authenticate', {
  type: Viewer,
  resolve(query, args, {req}) {
    return req.viewer;
  },
});

export const updateProfile = nexus.mutationField('updateProfile', {
  type: Viewer,

  args: {
    id: nexus.nonNull(nexus.stringArg()),
    name: nexus.nullable(nexus.stringArg()),
    shortBio: nexus.nullable(nexus.stringArg()),
    homepage: nexus.nullable(nexus.stringArg()),
    location: nexus.nullable(nexus.stringArg()),
  },

  validate: joi.object({
    id: joi.string().required(),
    name: joi.string().max(120).allow(''),
    shortBio: joi.string().max(280).allow(''),
    homepage: joi.string().max(2048).allow(''),
    location: joi.string().max(120).allow(''),
  }),

  authorize(source, {id}, {req}) {
    return (
      !!req.viewer &&
      (['superAdmin', 'admin', 'superModerator'].includes(req.viewer.role) ||
        id === req.viewer.id)
    );
  },

  resolve(query, {id, name, shortBio, homepage, location}, {db}) {
    return db.user.update({
      where: {id},
      data: {
        name: name ? human.parseName(name) : name || null,
        shortBio: shortBio || null,
        homepage: homepage || null,
        location: location || null,
      },
    });
  },
});

export const updateEmail = nexus.mutationField('updateEmail', {
  type: Viewer,

  args: {
    id: nexus.nonNull(nexus.stringArg()),
    email: nexus.nonNull(nexus.stringArg()),
  },

  validate: joi.object({
    id: joi.string(),
    email: joi.string().email().messages(messages),
  }),

  authorize(source, {id}, {req}) {
    return (
      !!req.viewer &&
      (['superAdmin', 'admin', 'superModerator'].includes(req.viewer.role) ||
        id === req.viewer.id)
    );
  },

  resolve(query, {id, email}, {req, db}) {
    const ips =
      req.headers['x-forwarded-for'] || req.socket.remoteAddress || '::1';
    const ip = Array.isArray(ips) ? ips[0] : ips;
    // TODO: send validate email

    return db.user.update({
      where: {id},
      data: {
        email,
        status: 'unconfirmed',
        latestIp: ip,
      },
    });
  },
});
