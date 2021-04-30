/**
 * This file was generated by Nexus Schema
 * Do not make changes to this file directly
 */


import { core } from "nexus"
import { FieldAuthorizeResolver } from "nexus/dist/plugins/fieldAuthorizePlugin"
import { FieldValidateResolver } from "../graphql/api/nexus-plugin-validate"
import { NexusContext } from "./nexus-context"
declare global {
  interface NexusGenCustomInputMethods<TypeName extends string> {
    /**
     * A date string, such as 2007-12-03, compliant with the `full-date` format outlined in section 5.6 of the RFC 3339 profile of the ISO 8601 standard for representation of dates and times using the Gregorian calendar.
     */
    date<FieldName extends string>(fieldName: FieldName, opts?: core.CommonInputFieldConfig<TypeName, FieldName>): void // "Date";
    /**
     * The `JSON` scalar type represents JSON values as specified by [ECMA-404](http://www.ecma-international.org/publications/files/ECMA-ST/ECMA-404.pdf).
     */
    json<FieldName extends string>(fieldName: FieldName, opts?: core.CommonInputFieldConfig<TypeName, FieldName>): void // "JSON";
  }
}
declare global {
  interface NexusGenCustomOutputMethods<TypeName extends string> {
    /**
     * A date string, such as 2007-12-03, compliant with the `full-date` format outlined in section 5.6 of the RFC 3339 profile of the ISO 8601 standard for representation of dates and times using the Gregorian calendar.
     */
    date<FieldName extends string>(fieldName: FieldName, ...opts: core.ScalarOutSpread<TypeName, FieldName>): void // "Date";
    /**
     * The `JSON` scalar type represents JSON values as specified by [ECMA-404](http://www.ecma-international.org/publications/files/ECMA-ST/ECMA-404.pdf).
     */
    json<FieldName extends string>(fieldName: FieldName, ...opts: core.ScalarOutSpread<TypeName, FieldName>): void // "JSON";
  }
}


declare global {
  interface NexusGen extends NexusGenTypes {}
}

export interface NexusGenInputs {
}

export interface NexusGenEnums {
}

export interface NexusGenScalars {
  String: string
  Int: number
  Float: number
  Boolean: boolean
  ID: string
  Date: Date
  JSON: import("type-fest").JsonValue
}

export interface NexusGenObjects {
  Mutation: {};
  Query: {};
  User: { // root type
    id?: string | null; // ID
    name?: NexusGenScalars['JSON'] | null; // JSON
  }
  Viewer: { // root type
    avatar?: NexusGenScalars['JSON'] | null; // JSON
    bio?: string | null; // String
    createdAt: NexusGenScalars['Date']; // Date!
    email?: string | null; // String
    homepage?: string | null; // String
    id: string; // ID!
    location?: string | null; // String
    name?: NexusGenScalars['JSON'] | null; // JSON
    nonce: string; // String!
    plan: string; // String!
    role: string; // String!
    shortBio?: string | null; // String
    status: string; // String!
    username?: string | null; // String
    walletAddress: string; // String!
  }
}

export interface NexusGenInterfaces {
  BaseViewer: NexusGenRootTypes['Viewer'];
}

export interface NexusGenUnions {
}

export type NexusGenRootTypes = NexusGenInterfaces & NexusGenObjects

export type NexusGenAllTypes = NexusGenRootTypes & NexusGenScalars

export interface NexusGenFieldTypes {
  Mutation: { // field return type
    authenticate: NexusGenRootTypes['Viewer'] | null; // Viewer
    logIn: NexusGenRootTypes['Viewer'] | null; // Viewer
    updateEmail: NexusGenRootTypes['Viewer'] | null; // Viewer
    updateProfile: NexusGenRootTypes['Viewer'] | null; // Viewer
    verifySignature: NexusGenRootTypes['Viewer'] | null; // Viewer
  }
  Query: { // field return type
    users: Array<NexusGenRootTypes['User'] | null> | null; // [User]
  }
  User: { // field return type
    id: string | null; // ID
    name: NexusGenScalars['JSON'] | null; // JSON
  }
  Viewer: { // field return type
    avatar: NexusGenScalars['JSON'] | null; // JSON
    bio: string | null; // String
    createdAt: NexusGenScalars['Date']; // Date!
    email: string | null; // String
    homepage: string | null; // String
    id: string; // ID!
    location: string | null; // String
    name: NexusGenScalars['JSON'] | null; // JSON
    nonce: string; // String!
    plan: string; // String!
    role: string; // String!
    shortBio: string | null; // String
    status: string; // String!
    username: string | null; // String
    walletAddress: string; // String!
  }
  BaseViewer: { // field return type
    avatar: NexusGenScalars['JSON'] | null; // JSON
    bio: string | null; // String
    createdAt: NexusGenScalars['Date']; // Date!
    email: string | null; // String
    homepage: string | null; // String
    id: string; // ID!
    location: string | null; // String
    name: NexusGenScalars['JSON'] | null; // JSON
    nonce: string; // String!
    plan: string; // String!
    role: string; // String!
    shortBio: string | null; // String
    status: string; // String!
    username: string | null; // String
    walletAddress: string; // String!
  }
}

export interface NexusGenFieldTypeNames {
  Mutation: { // field return type name
    authenticate: 'Viewer'
    logIn: 'Viewer'
    updateEmail: 'Viewer'
    updateProfile: 'Viewer'
    verifySignature: 'Viewer'
  }
  Query: { // field return type name
    users: 'User'
  }
  User: { // field return type name
    id: 'ID'
    name: 'JSON'
  }
  Viewer: { // field return type name
    avatar: 'JSON'
    bio: 'String'
    createdAt: 'Date'
    email: 'String'
    homepage: 'String'
    id: 'ID'
    location: 'String'
    name: 'JSON'
    nonce: 'String'
    plan: 'String'
    role: 'String'
    shortBio: 'String'
    status: 'String'
    username: 'String'
    walletAddress: 'String'
  }
  BaseViewer: { // field return type name
    avatar: 'JSON'
    bio: 'String'
    createdAt: 'Date'
    email: 'String'
    homepage: 'String'
    id: 'ID'
    location: 'String'
    name: 'JSON'
    nonce: 'String'
    plan: 'String'
    role: 'String'
    shortBio: 'String'
    status: 'String'
    username: 'String'
    walletAddress: 'String'
  }
}

export interface NexusGenArgTypes {
  Mutation: {
    logIn: { // args
      walletAddress: string; // String!
    }
    updateEmail: { // args
      email: string; // String!
      id: string; // String!
    }
    updateProfile: { // args
      homepage?: string | null; // String
      id: string; // String!
      location?: string | null; // String
      name?: string | null; // String
      shortBio?: string | null; // String
    }
    verifySignature: { // args
      message: string; // String!
      signature: string; // String!
      walletAddress: string; // String!
    }
  }
  Query: {
    users: { // args
      skip?: number | null; // Int
      take?: number | null; // Int
    }
  }
}

export interface NexusGenAbstractTypeMembers {
  BaseViewer: "Viewer"
}

export interface NexusGenTypeInterfaces {
  Viewer: "BaseViewer"
}

export type NexusGenObjectNames = keyof NexusGenObjects;

export type NexusGenInputNames = never;

export type NexusGenEnumNames = never;

export type NexusGenInterfaceNames = keyof NexusGenInterfaces;

export type NexusGenScalarNames = keyof NexusGenScalars;

export type NexusGenUnionNames = never;

export type NexusGenObjectsUsingAbstractStrategyIsTypeOf = never;

export type NexusGenAbstractsUsingStrategyResolveType = "BaseViewer";

export type NexusGenFeaturesConfig = {
  abstractTypeStrategies: {
    isTypeOf: false
    resolveType: true
    __typename: false
  }
}

export interface NexusGenTypes {
  context: NexusContext;
  inputTypes: NexusGenInputs;
  rootTypes: NexusGenRootTypes;
  inputTypeShapes: NexusGenInputs & NexusGenEnums & NexusGenScalars;
  argTypes: NexusGenArgTypes;
  fieldTypes: NexusGenFieldTypes;
  fieldTypeNames: NexusGenFieldTypeNames;
  allTypes: NexusGenAllTypes;
  typeInterfaces: NexusGenTypeInterfaces;
  objectNames: NexusGenObjectNames;
  inputNames: NexusGenInputNames;
  enumNames: NexusGenEnumNames;
  interfaceNames: NexusGenInterfaceNames;
  scalarNames: NexusGenScalarNames;
  unionNames: NexusGenUnionNames;
  allInputTypes: NexusGenTypes['inputNames'] | NexusGenTypes['enumNames'] | NexusGenTypes['scalarNames'];
  allOutputTypes: NexusGenTypes['objectNames'] | NexusGenTypes['enumNames'] | NexusGenTypes['unionNames'] | NexusGenTypes['interfaceNames'] | NexusGenTypes['scalarNames'];
  allNamedTypes: NexusGenTypes['allInputTypes'] | NexusGenTypes['allOutputTypes']
  abstractTypes: NexusGenTypes['interfaceNames'] | NexusGenTypes['unionNames'];
  abstractTypeMembers: NexusGenAbstractTypeMembers;
  objectsUsingAbstractStrategyIsTypeOf: NexusGenObjectsUsingAbstractStrategyIsTypeOf;
  abstractsUsingStrategyResolveType: NexusGenAbstractsUsingStrategyResolveType;
  features: NexusGenFeaturesConfig;
}


declare global {
  interface NexusGenPluginTypeConfig<TypeName extends string> {
  }
  interface NexusGenPluginFieldConfig<TypeName extends string, FieldName extends string> {
    /**
     * Authorization for an individual field. Returning "true"
     * or "Promise<true>" means the field can be accessed.
     * Returning "false" or "Promise<false>" will respond
     * with a "Not Authorized" error for the field.
     * Returning or throwing an error will also prevent the
     * resolver from executing.
     */
    authorize?: FieldAuthorizeResolver<TypeName, FieldName>
    /**
     * Validation for an individual field. Returning "true"
     * or "Promise<true>" means the field can be accessed.
     * Returning "false" or "Promise<false>" will respond
     * with a "Invalid arguments" error for the field.
     * Returning a Joi schema will call `validate(args)` on
     * the result. Throwing an error will also prevent the
     * resolver from executing.
     */
    validate?: FieldValidateResolver<TypeName, FieldName>
  }
  interface NexusGenPluginInputFieldConfig<TypeName extends string, FieldName extends string> {
  }
  interface NexusGenPluginSchemaConfig {
  }
  interface NexusGenPluginArgConfig {
  }
}