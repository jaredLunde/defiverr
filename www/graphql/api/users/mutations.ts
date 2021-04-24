import crypto from 'crypto';
import * as nexus from 'nexus';
import * as jwt from 'jsonwebtoken';
import joi from 'joi';
import human from 'humanparser';
import {jwtConfig, jwtCookieName} from '@/graphql/api/jwt';
import {errorCode, messages, is} from '@/graphql/api/validation';
import {Viewer} from './schemas';

export const signUp = nexus.mutationField('signUp', {
  type: Viewer,

  args: {
    walletAddress: nexus.nonNull(nexus.stringArg()),
  },

  async validate(source, {walletAddress}, {db}) {
    const user = await db.user.findUnique({where: {walletAddress}});
    return joi.object({
      walletAddress: joi
        .string()
        .custom(is.notDuplicate(user))
        .email()
        .messages(messages),
    });
  },

  async resolve(source, {walletAddress}, {req, db}) {
    const ips =
      req.headers['x-forwarded-for'] || req.socket.remoteAddress || '::1';
    const ip = Array.isArray(ips) ? ips[0] : ips;
    const viewer = await db.user.create({
      data: {
        walletAddress,
        encryptionKey: crypto.randomBytes(32).toString('base64'),
        createdIp: ip,
        latestIp: ip,
      },
    });

    jwt.sign({id: viewer.id}, req.secrets.jwt, {
      ...jwtConfig,
      expiresIn: '30d',
    });

    return viewer;
  },
});

export const logIn = nexus.mutationField('logIn', {
  type: Viewer,

  args: {
    walletAddress: nexus.nonNull(nexus.stringArg()),
  },

  async validate(source, {walletAddress}, {db}) {
    const user = await db.user.findUnique({where: {walletAddress}});
    // Additional timing attack mitigation
    await new Promise((resolve) =>
      setTimeout(resolve, Math.random() * (300 - 100) + 100)
    );

    return joi.object({
      walletAddress: joi
        .string()
        .custom(is.truthy(user, errorCode.password.incorrect))
        .messages(messages),
    });
  },

  async resolve(source, {walletAddress}, {req, db}) {
    const viewer = await db.user.findUnique({where: {walletAddress}});
    if (!viewer) return null;
    const ips =
      req.headers['x-forwarded-for'] || req.socket.remoteAddress || '::1';
    const ip = Array.isArray(ips) ? ips[0] : ips;
    await db.user.update({where: {id: viewer.id}, data: {latestIp: ip}});

    return {
      ...viewer,
      token: jwt.sign({id: viewer.id}, req.secrets.jwt, {
        ...jwtConfig,
        expiresIn: '30d',
      }),
    };
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

    return db.user.update({
      where: {id},
      data: {
        email,
        latestIp: ip,
      },
    });
  },
});
