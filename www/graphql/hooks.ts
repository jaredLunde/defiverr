import gql from 'graphql-tag';
import * as Urql from 'urql';
export type Maybe<T> = T | null;
export type Exact<T extends {[key: string]: unknown}> = {[K in keyof T]: T[K]};
export type MakeOptional<T, K extends keyof T> = Omit<T, K> &
  {[SubKey in K]?: Maybe<T[SubKey]>};
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> &
  {[SubKey in K]: Maybe<T[SubKey]>};
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** A date string, such as 2007-12-03, compliant with the `full-date` format outlined in section 5.6 of the RFC 3339 profile of the ISO 8601 standard for representation of dates and times using the Gregorian calendar. */
  Date: Date;
  /** The `JSON` scalar type represents JSON values as specified by [ECMA-404](http://www.ecma-international.org/publications/files/ECMA-ST/ECMA-404.pdf). */
  JSON: String;
};

export type BaseViewer = {
  id: Scalars['ID'];
  walletAddress: Scalars['String'];
  nonce: Scalars['String'];
  email?: Maybe<Scalars['String']>;
  role: Scalars['String'];
  status: Scalars['String'];
  plan: Scalars['String'];
  name?: Maybe<Scalars['JSON']>;
  username?: Maybe<Scalars['String']>;
  avatar?: Maybe<Scalars['JSON']>;
  bio?: Maybe<Scalars['String']>;
  shortBio?: Maybe<Scalars['String']>;
  homepage?: Maybe<Scalars['String']>;
  location?: Maybe<Scalars['String']>;
  createdAt: Scalars['Date'];
};

export type Mutation = {
  __typename?: 'Mutation';
  logIn?: Maybe<Viewer>;
  verifySignature?: Maybe<Viewer>;
  authenticate?: Maybe<Viewer>;
  updateProfile?: Maybe<Viewer>;
  updateEmail?: Maybe<Viewer>;
};

export type MutationLogInArgs = {
  walletAddress: Scalars['String'];
};

export type MutationVerifySignatureArgs = {
  walletAddress: Scalars['String'];
  signature: Scalars['String'];
  message: Scalars['String'];
};

export type MutationUpdateProfileArgs = {
  id: Scalars['String'];
  name?: Maybe<Scalars['String']>;
  shortBio?: Maybe<Scalars['String']>;
  homepage?: Maybe<Scalars['String']>;
  location?: Maybe<Scalars['String']>;
};

export type MutationUpdateEmailArgs = {
  id: Scalars['String'];
  email: Scalars['String'];
};

export type Query = {
  __typename?: 'Query';
  users?: Maybe<Array<Maybe<User>>>;
};

export type QueryUsersArgs = {
  take?: Maybe<Scalars['Int']>;
  skip?: Maybe<Scalars['Int']>;
};

export type User = {
  __typename?: 'User';
  id?: Maybe<Scalars['ID']>;
  name?: Maybe<Scalars['JSON']>;
};

export type Viewer = BaseViewer & {
  __typename?: 'Viewer';
  id: Scalars['ID'];
  walletAddress: Scalars['String'];
  nonce: Scalars['String'];
  email?: Maybe<Scalars['String']>;
  role: Scalars['String'];
  status: Scalars['String'];
  plan: Scalars['String'];
  name?: Maybe<Scalars['JSON']>;
  username?: Maybe<Scalars['String']>;
  avatar?: Maybe<Scalars['JSON']>;
  bio?: Maybe<Scalars['String']>;
  shortBio?: Maybe<Scalars['String']>;
  homepage?: Maybe<Scalars['String']>;
  location?: Maybe<Scalars['String']>;
  createdAt: Scalars['Date'];
};

export type AuthenticateMutationVariables = Exact<{[key: string]: never}>;

export type AuthenticateMutation = {__typename?: 'Mutation'} & {
  authenticate?: Maybe<
    {__typename?: 'Viewer'} & Pick<
      Viewer,
      | 'id'
      | 'walletAddress'
      | 'email'
      | 'role'
      | 'status'
      | 'plan'
      | 'name'
      | 'avatar'
      | 'bio'
      | 'shortBio'
      | 'homepage'
      | 'location'
      | 'createdAt'
    >
  >;
};

export type LogInMutationVariables = Exact<{
  walletAddress: Scalars['String'];
}>;

export type LogInMutation = {__typename?: 'Mutation'} & {
  logIn?: Maybe<
    {__typename?: 'Viewer'} & Pick<
      Viewer,
      | 'id'
      | 'walletAddress'
      | 'nonce'
      | 'email'
      | 'role'
      | 'status'
      | 'plan'
      | 'username'
      | 'name'
      | 'avatar'
      | 'bio'
      | 'shortBio'
      | 'homepage'
      | 'location'
      | 'createdAt'
    >
  >;
};

export type VerifySignatureMutationVariables = Exact<{
  walletAddress: Scalars['String'];
  signature: Scalars['String'];
  message: Scalars['String'];
}>;

export type VerifySignatureMutation = {__typename?: 'Mutation'} & {
  verifySignature?: Maybe<
    {__typename?: 'Viewer'} & Pick<
      Viewer,
      | 'id'
      | 'walletAddress'
      | 'nonce'
      | 'email'
      | 'role'
      | 'status'
      | 'plan'
      | 'username'
      | 'name'
      | 'avatar'
      | 'bio'
      | 'shortBio'
      | 'homepage'
      | 'location'
      | 'createdAt'
    >
  >;
};

export type UpdateProfileMutationVariables = Exact<{
  id: Scalars['String'];
  name?: Maybe<Scalars['String']>;
  shortBio?: Maybe<Scalars['String']>;
  homepage?: Maybe<Scalars['String']>;
  location?: Maybe<Scalars['String']>;
}>;

export type UpdateProfileMutation = {__typename?: 'Mutation'} & {
  updateProfile?: Maybe<
    {__typename?: 'Viewer'} & Pick<
      Viewer,
      | 'id'
      | 'walletAddress'
      | 'email'
      | 'role'
      | 'status'
      | 'plan'
      | 'username'
      | 'name'
      | 'avatar'
      | 'bio'
      | 'shortBio'
      | 'homepage'
      | 'location'
      | 'createdAt'
    >
  >;
};

export type UpdateEmailMutationVariables = Exact<{
  id: Scalars['String'];
  email: Scalars['String'];
}>;

export type UpdateEmailMutation = {__typename?: 'Mutation'} & {
  updateEmail?: Maybe<{__typename?: 'Viewer'} & Pick<Viewer, 'id'>>;
};

export const AuthenticateDocument = gql`
  mutation authenticate {
    authenticate {
      id
      walletAddress
      email
      role
      status
      plan
      name
      avatar
      bio
      shortBio
      homepage
      location
      createdAt
    }
  }
`;

export function useAuthenticateMutation() {
  return Urql.useMutation<AuthenticateMutation, AuthenticateMutationVariables>(
    AuthenticateDocument
  );
}
export const LogInDocument = gql`
  mutation logIn($walletAddress: String!) {
    logIn(walletAddress: $walletAddress) {
      id
      walletAddress
      nonce
      email
      role
      status
      plan
      username
      name
      avatar
      bio
      shortBio
      homepage
      location
      createdAt
    }
  }
`;

export function useLogInMutation() {
  return Urql.useMutation<LogInMutation, LogInMutationVariables>(LogInDocument);
}
export const VerifySignatureDocument = gql`
  mutation verifySignature(
    $walletAddress: String!
    $signature: String!
    $message: String!
  ) {
    verifySignature(
      walletAddress: $walletAddress
      signature: $signature
      message: $message
    ) {
      id
      walletAddress
      nonce
      email
      role
      status
      plan
      username
      name
      avatar
      bio
      shortBio
      homepage
      location
      createdAt
    }
  }
`;

export function useVerifySignatureMutation() {
  return Urql.useMutation<
    VerifySignatureMutation,
    VerifySignatureMutationVariables
  >(VerifySignatureDocument);
}
export const UpdateProfileDocument = gql`
  mutation updateProfile(
    $id: String!
    $name: String
    $shortBio: String
    $homepage: String
    $location: String
  ) {
    updateProfile(
      id: $id
      name: $name
      shortBio: $shortBio
      homepage: $homepage
      location: $location
    ) {
      id
      walletAddress
      email
      role
      status
      plan
      username
      name
      avatar
      bio
      shortBio
      homepage
      location
      createdAt
    }
  }
`;

export function useUpdateProfileMutation() {
  return Urql.useMutation<
    UpdateProfileMutation,
    UpdateProfileMutationVariables
  >(UpdateProfileDocument);
}
export const UpdateEmailDocument = gql`
  mutation updateEmail($id: String!, $email: String!) {
    updateEmail(id: $id, email: $email) {
      id
    }
  }
`;

export function useUpdateEmailMutation() {
  return Urql.useMutation<UpdateEmailMutation, UpdateEmailMutationVariables>(
    UpdateEmailDocument
  );
}
