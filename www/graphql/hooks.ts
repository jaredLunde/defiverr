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
  /** Json custom scalar type */
  Json: any;
  /** Decimal custom scalar type */
  Decimal: any;
  /** Date custom scalar type */
  DateTime: any;
};

export type User = {
  __typename?: 'User';
  id?: Maybe<Scalars['ID']>;
  email?: Maybe<Scalars['String']>;
};

export type BaseViewer = {
  id: Scalars['ID'];
  email: Scalars['String'];
  role: Scalars['String'];
  status: Scalars['String'];
  plan: Scalars['String'];
  name?: Maybe<Scalars['Json']>;
  avatar?: Maybe<Scalars['Json']>;
  bio?: Maybe<Scalars['String']>;
  shortBio?: Maybe<Scalars['String']>;
  homepage?: Maybe<Scalars['String']>;
  location?: Maybe<Scalars['String']>;
  createdAt: Scalars['DateTime'];
};

export type Viewer = BaseViewer & {
  __typename?: 'Viewer';
  id: Scalars['ID'];
  email: Scalars['String'];
  role: Scalars['String'];
  status: Scalars['String'];
  plan: Scalars['String'];
  name?: Maybe<Scalars['Json']>;
  avatar?: Maybe<Scalars['Json']>;
  bio?: Maybe<Scalars['String']>;
  shortBio?: Maybe<Scalars['String']>;
  homepage?: Maybe<Scalars['String']>;
  location?: Maybe<Scalars['String']>;
  createdAt: Scalars['DateTime'];
};

export type ViewerWithToken = BaseViewer & {
  __typename?: 'ViewerWithToken';
  id: Scalars['ID'];
  email: Scalars['String'];
  role: Scalars['String'];
  status: Scalars['String'];
  plan: Scalars['String'];
  name?: Maybe<Scalars['Json']>;
  avatar?: Maybe<Scalars['Json']>;
  bio?: Maybe<Scalars['String']>;
  shortBio?: Maybe<Scalars['String']>;
  homepage?: Maybe<Scalars['String']>;
  location?: Maybe<Scalars['String']>;
  createdAt: Scalars['DateTime'];
  token: Scalars['String'];
};

export type BatchPayload = {
  __typename?: 'BatchPayload';
  count: Scalars['Int'];
};

export enum UserScalarFieldEnum {
  Id = 'id',
  Email = 'email',
  Password = 'password',
  EncryptionKey = 'encryptionKey',
  Role = 'role',
  Status = 'status',
  Plan = 'plan',
  Name = 'name',
  Avatar = 'avatar',
  Bio = 'bio',
  ShortBio = 'shortBio',
  Homepage = 'homepage',
  Location = 'location',
  CreatedIp = 'createdIp',
  LatestIp = 'latestIp',
  CreatedAt = 'createdAt',
  ActiveAt = 'activeAt',
  UpdatedAt = 'updatedAt',
  DeletedAt = 'deletedAt',
}

export enum OAuthProvidersScalarFieldEnum {
  UserId = 'userId',
  Provider = 'provider',
  Token = 'token',
  Expires = 'expires',
  CreatedAt = 'createdAt',
  UpdatedAt = 'updatedAt',
}

export enum SortOrder {
  Asc = 'asc',
  Desc = 'desc',
}

export enum QueryMode {
  Default = 'default',
  Insensitive = 'insensitive',
}

export enum UserRole {
  SuperAdmin = 'superAdmin',
  Admin = 'admin',
  SuperModerator = 'superModerator',
  Moderator = 'moderator',
  User = 'user',
}

export enum UserStatus {
  Active = 'active',
  Inactive = 'inactive',
  Banned = 'banned',
  Deleted = 'deleted',
}

export enum UserPlan {
  Free = 'free',
}

export enum OAuthProvider {
  Bitbucket = 'bitbucket',
  Github = 'github',
  Gitlab = 'gitlab',
  Google = 'google',
}

export type UserWhereInput = {
  AND?: Maybe<Array<Maybe<UserWhereInput>>>;
  OR?: Maybe<Array<Maybe<UserWhereInput>>>;
  NOT?: Maybe<Array<Maybe<UserWhereInput>>>;
  id?: Maybe<StringFilter>;
  email?: Maybe<StringFilter>;
  password?: Maybe<StringNullableFilter>;
  encryptionKey?: Maybe<StringFilter>;
  role?: Maybe<EnumUserRoleFilter>;
  status?: Maybe<EnumUserStatusFilter>;
  plan?: Maybe<EnumUserPlanFilter>;
  name?: Maybe<JsonNullableFilter>;
  avatar?: Maybe<JsonNullableFilter>;
  bio?: Maybe<StringNullableFilter>;
  shortBio?: Maybe<StringNullableFilter>;
  homepage?: Maybe<StringNullableFilter>;
  location?: Maybe<StringNullableFilter>;
  createdIp?: Maybe<StringFilter>;
  latestIp?: Maybe<StringFilter>;
  createdAt?: Maybe<DateTimeFilter>;
  activeAt?: Maybe<DateTimeFilter>;
  updatedAt?: Maybe<DateTimeFilter>;
  deletedAt?: Maybe<DateTimeNullableFilter>;
  oAuthProviders?: Maybe<OAuthProvidersListRelationFilter>;
};

export type UserOrderByInput = {
  id?: Maybe<SortOrder>;
  email?: Maybe<SortOrder>;
  password?: Maybe<SortOrder>;
  encryptionKey?: Maybe<SortOrder>;
  role?: Maybe<SortOrder>;
  status?: Maybe<SortOrder>;
  plan?: Maybe<SortOrder>;
  name?: Maybe<SortOrder>;
  avatar?: Maybe<SortOrder>;
  bio?: Maybe<SortOrder>;
  shortBio?: Maybe<SortOrder>;
  homepage?: Maybe<SortOrder>;
  location?: Maybe<SortOrder>;
  createdIp?: Maybe<SortOrder>;
  latestIp?: Maybe<SortOrder>;
  createdAt?: Maybe<SortOrder>;
  activeAt?: Maybe<SortOrder>;
  updatedAt?: Maybe<SortOrder>;
  deletedAt?: Maybe<SortOrder>;
};

export type UserWhereUniqueInput = {
  id?: Maybe<Scalars['String']>;
  email?: Maybe<Scalars['String']>;
};

export type OAuthProvidersWhereInput = {
  AND?: Maybe<Array<Maybe<OAuthProvidersWhereInput>>>;
  OR?: Maybe<Array<Maybe<OAuthProvidersWhereInput>>>;
  NOT?: Maybe<Array<Maybe<OAuthProvidersWhereInput>>>;
  userId?: Maybe<StringFilter>;
  provider?: Maybe<EnumOAuthProviderFilter>;
  token?: Maybe<StringFilter>;
  expires?: Maybe<IntFilter>;
  createdAt?: Maybe<DateTimeFilter>;
  updatedAt?: Maybe<DateTimeFilter>;
  owner?: Maybe<UserWhereInput>;
};

export type OAuthProvidersOrderByInput = {
  userId?: Maybe<SortOrder>;
  provider?: Maybe<SortOrder>;
  token?: Maybe<SortOrder>;
  expires?: Maybe<SortOrder>;
  createdAt?: Maybe<SortOrder>;
  updatedAt?: Maybe<SortOrder>;
  owner?: Maybe<UserOrderByInput>;
};

export type OAuthProvidersWhereUniqueInput = {
  userId_provider?: Maybe<OAuthProvidersUserIdProviderCompoundUniqueInput>;
};

export type UserCreateInput = {
  id?: Maybe<Scalars['String']>;
  email: Scalars['String'];
  password?: Maybe<Scalars['String']>;
  encryptionKey: Scalars['String'];
  role?: Maybe<UserRole>;
  status?: Maybe<UserStatus>;
  plan?: Maybe<UserPlan>;
  name?: Maybe<Scalars['Json']>;
  avatar?: Maybe<Scalars['Json']>;
  bio?: Maybe<Scalars['String']>;
  shortBio?: Maybe<Scalars['String']>;
  homepage?: Maybe<Scalars['String']>;
  location?: Maybe<Scalars['String']>;
  createdIp: Scalars['String'];
  latestIp: Scalars['String'];
  createdAt?: Maybe<Scalars['DateTime']>;
  activeAt?: Maybe<Scalars['DateTime']>;
  updatedAt?: Maybe<Scalars['DateTime']>;
  deletedAt?: Maybe<Scalars['DateTime']>;
  oAuthProviders?: Maybe<OAuthProvidersCreateNestedManyWithoutOwnerInput>;
};

export type UserUncheckedCreateInput = {
  id?: Maybe<Scalars['String']>;
  email: Scalars['String'];
  password?: Maybe<Scalars['String']>;
  encryptionKey: Scalars['String'];
  role?: Maybe<UserRole>;
  status?: Maybe<UserStatus>;
  plan?: Maybe<UserPlan>;
  name?: Maybe<Scalars['Json']>;
  avatar?: Maybe<Scalars['Json']>;
  bio?: Maybe<Scalars['String']>;
  shortBio?: Maybe<Scalars['String']>;
  homepage?: Maybe<Scalars['String']>;
  location?: Maybe<Scalars['String']>;
  createdIp: Scalars['String'];
  latestIp: Scalars['String'];
  createdAt?: Maybe<Scalars['DateTime']>;
  activeAt?: Maybe<Scalars['DateTime']>;
  updatedAt?: Maybe<Scalars['DateTime']>;
  deletedAt?: Maybe<Scalars['DateTime']>;
  oAuthProviders?: Maybe<OAuthProvidersUncheckedCreateNestedManyWithoutOwnerInput>;
};

export type UserUpdateInput = {
  id?: Maybe<StringFieldUpdateOperationsInput>;
  email?: Maybe<StringFieldUpdateOperationsInput>;
  password?: Maybe<NullableStringFieldUpdateOperationsInput>;
  encryptionKey?: Maybe<StringFieldUpdateOperationsInput>;
  role?: Maybe<EnumUserRoleFieldUpdateOperationsInput>;
  status?: Maybe<EnumUserStatusFieldUpdateOperationsInput>;
  plan?: Maybe<EnumUserPlanFieldUpdateOperationsInput>;
  name?: Maybe<Scalars['Json']>;
  avatar?: Maybe<Scalars['Json']>;
  bio?: Maybe<NullableStringFieldUpdateOperationsInput>;
  shortBio?: Maybe<NullableStringFieldUpdateOperationsInput>;
  homepage?: Maybe<NullableStringFieldUpdateOperationsInput>;
  location?: Maybe<NullableStringFieldUpdateOperationsInput>;
  createdIp?: Maybe<StringFieldUpdateOperationsInput>;
  latestIp?: Maybe<StringFieldUpdateOperationsInput>;
  createdAt?: Maybe<DateTimeFieldUpdateOperationsInput>;
  activeAt?: Maybe<DateTimeFieldUpdateOperationsInput>;
  updatedAt?: Maybe<DateTimeFieldUpdateOperationsInput>;
  deletedAt?: Maybe<NullableDateTimeFieldUpdateOperationsInput>;
  oAuthProviders?: Maybe<OAuthProvidersUpdateManyWithoutOwnerInput>;
};

export type UserUncheckedUpdateInput = {
  id?: Maybe<StringFieldUpdateOperationsInput>;
  email?: Maybe<StringFieldUpdateOperationsInput>;
  password?: Maybe<NullableStringFieldUpdateOperationsInput>;
  encryptionKey?: Maybe<StringFieldUpdateOperationsInput>;
  role?: Maybe<EnumUserRoleFieldUpdateOperationsInput>;
  status?: Maybe<EnumUserStatusFieldUpdateOperationsInput>;
  plan?: Maybe<EnumUserPlanFieldUpdateOperationsInput>;
  name?: Maybe<Scalars['Json']>;
  avatar?: Maybe<Scalars['Json']>;
  bio?: Maybe<NullableStringFieldUpdateOperationsInput>;
  shortBio?: Maybe<NullableStringFieldUpdateOperationsInput>;
  homepage?: Maybe<NullableStringFieldUpdateOperationsInput>;
  location?: Maybe<NullableStringFieldUpdateOperationsInput>;
  createdIp?: Maybe<StringFieldUpdateOperationsInput>;
  latestIp?: Maybe<StringFieldUpdateOperationsInput>;
  createdAt?: Maybe<DateTimeFieldUpdateOperationsInput>;
  activeAt?: Maybe<DateTimeFieldUpdateOperationsInput>;
  updatedAt?: Maybe<DateTimeFieldUpdateOperationsInput>;
  deletedAt?: Maybe<NullableDateTimeFieldUpdateOperationsInput>;
  oAuthProviders?: Maybe<OAuthProvidersUncheckedUpdateManyWithoutOwnerInput>;
};

export type UserUpdateManyMutationInput = {
  id?: Maybe<StringFieldUpdateOperationsInput>;
  email?: Maybe<StringFieldUpdateOperationsInput>;
  password?: Maybe<NullableStringFieldUpdateOperationsInput>;
  encryptionKey?: Maybe<StringFieldUpdateOperationsInput>;
  role?: Maybe<EnumUserRoleFieldUpdateOperationsInput>;
  status?: Maybe<EnumUserStatusFieldUpdateOperationsInput>;
  plan?: Maybe<EnumUserPlanFieldUpdateOperationsInput>;
  name?: Maybe<Scalars['Json']>;
  avatar?: Maybe<Scalars['Json']>;
  bio?: Maybe<NullableStringFieldUpdateOperationsInput>;
  shortBio?: Maybe<NullableStringFieldUpdateOperationsInput>;
  homepage?: Maybe<NullableStringFieldUpdateOperationsInput>;
  location?: Maybe<NullableStringFieldUpdateOperationsInput>;
  createdIp?: Maybe<StringFieldUpdateOperationsInput>;
  latestIp?: Maybe<StringFieldUpdateOperationsInput>;
  createdAt?: Maybe<DateTimeFieldUpdateOperationsInput>;
  activeAt?: Maybe<DateTimeFieldUpdateOperationsInput>;
  updatedAt?: Maybe<DateTimeFieldUpdateOperationsInput>;
  deletedAt?: Maybe<NullableDateTimeFieldUpdateOperationsInput>;
};

export type UserUncheckedUpdateManyInput = {
  id?: Maybe<StringFieldUpdateOperationsInput>;
  email?: Maybe<StringFieldUpdateOperationsInput>;
  password?: Maybe<NullableStringFieldUpdateOperationsInput>;
  encryptionKey?: Maybe<StringFieldUpdateOperationsInput>;
  role?: Maybe<EnumUserRoleFieldUpdateOperationsInput>;
  status?: Maybe<EnumUserStatusFieldUpdateOperationsInput>;
  plan?: Maybe<EnumUserPlanFieldUpdateOperationsInput>;
  name?: Maybe<Scalars['Json']>;
  avatar?: Maybe<Scalars['Json']>;
  bio?: Maybe<NullableStringFieldUpdateOperationsInput>;
  shortBio?: Maybe<NullableStringFieldUpdateOperationsInput>;
  homepage?: Maybe<NullableStringFieldUpdateOperationsInput>;
  location?: Maybe<NullableStringFieldUpdateOperationsInput>;
  createdIp?: Maybe<StringFieldUpdateOperationsInput>;
  latestIp?: Maybe<StringFieldUpdateOperationsInput>;
  createdAt?: Maybe<DateTimeFieldUpdateOperationsInput>;
  activeAt?: Maybe<DateTimeFieldUpdateOperationsInput>;
  updatedAt?: Maybe<DateTimeFieldUpdateOperationsInput>;
  deletedAt?: Maybe<NullableDateTimeFieldUpdateOperationsInput>;
};

export type OAuthProvidersCreateInput = {
  provider: OAuthProvider;
  token: Scalars['String'];
  expires: Scalars['Int'];
  createdAt?: Maybe<Scalars['DateTime']>;
  updatedAt?: Maybe<Scalars['DateTime']>;
  owner: UserCreateNestedOneWithoutOAuthProvidersInput;
};

export type OAuthProvidersUncheckedCreateInput = {
  userId: Scalars['String'];
  provider: OAuthProvider;
  token: Scalars['String'];
  expires: Scalars['Int'];
  createdAt?: Maybe<Scalars['DateTime']>;
  updatedAt?: Maybe<Scalars['DateTime']>;
};

export type OAuthProvidersUpdateInput = {
  provider?: Maybe<EnumOAuthProviderFieldUpdateOperationsInput>;
  token?: Maybe<StringFieldUpdateOperationsInput>;
  expires?: Maybe<IntFieldUpdateOperationsInput>;
  createdAt?: Maybe<DateTimeFieldUpdateOperationsInput>;
  updatedAt?: Maybe<DateTimeFieldUpdateOperationsInput>;
  owner?: Maybe<UserUpdateOneRequiredWithoutOAuthProvidersInput>;
};

export type OAuthProvidersUncheckedUpdateInput = {
  userId?: Maybe<StringFieldUpdateOperationsInput>;
  provider?: Maybe<EnumOAuthProviderFieldUpdateOperationsInput>;
  token?: Maybe<StringFieldUpdateOperationsInput>;
  expires?: Maybe<IntFieldUpdateOperationsInput>;
  createdAt?: Maybe<DateTimeFieldUpdateOperationsInput>;
  updatedAt?: Maybe<DateTimeFieldUpdateOperationsInput>;
};

export type OAuthProvidersUpdateManyMutationInput = {
  provider?: Maybe<EnumOAuthProviderFieldUpdateOperationsInput>;
  token?: Maybe<StringFieldUpdateOperationsInput>;
  expires?: Maybe<IntFieldUpdateOperationsInput>;
  createdAt?: Maybe<DateTimeFieldUpdateOperationsInput>;
  updatedAt?: Maybe<DateTimeFieldUpdateOperationsInput>;
};

export type OAuthProvidersUncheckedUpdateManyInput = {
  userId?: Maybe<StringFieldUpdateOperationsInput>;
  provider?: Maybe<EnumOAuthProviderFieldUpdateOperationsInput>;
  token?: Maybe<StringFieldUpdateOperationsInput>;
  expires?: Maybe<IntFieldUpdateOperationsInput>;
  createdAt?: Maybe<DateTimeFieldUpdateOperationsInput>;
  updatedAt?: Maybe<DateTimeFieldUpdateOperationsInput>;
};

export type StringFilter = {
  equals?: Maybe<Scalars['String']>;
  in?: Maybe<Array<Maybe<Scalars['String']>>>;
  notIn?: Maybe<Array<Maybe<Scalars['String']>>>;
  lt?: Maybe<Scalars['String']>;
  lte?: Maybe<Scalars['String']>;
  gt?: Maybe<Scalars['String']>;
  gte?: Maybe<Scalars['String']>;
  contains?: Maybe<Scalars['String']>;
  startsWith?: Maybe<Scalars['String']>;
  endsWith?: Maybe<Scalars['String']>;
  mode?: Maybe<QueryMode>;
  not?: Maybe<NestedStringFilter>;
};

export type StringNullableFilter = {
  equals?: Maybe<Scalars['String']>;
  in?: Maybe<Array<Maybe<Scalars['String']>>>;
  notIn?: Maybe<Array<Maybe<Scalars['String']>>>;
  lt?: Maybe<Scalars['String']>;
  lte?: Maybe<Scalars['String']>;
  gt?: Maybe<Scalars['String']>;
  gte?: Maybe<Scalars['String']>;
  contains?: Maybe<Scalars['String']>;
  startsWith?: Maybe<Scalars['String']>;
  endsWith?: Maybe<Scalars['String']>;
  mode?: Maybe<QueryMode>;
  not?: Maybe<NestedStringNullableFilter>;
};

export type EnumUserRoleFilter = {
  equals?: Maybe<UserRole>;
  in?: Maybe<Array<Maybe<UserRole>>>;
  notIn?: Maybe<Array<Maybe<UserRole>>>;
  not?: Maybe<NestedEnumUserRoleFilter>;
};

export type EnumUserStatusFilter = {
  equals?: Maybe<UserStatus>;
  in?: Maybe<Array<Maybe<UserStatus>>>;
  notIn?: Maybe<Array<Maybe<UserStatus>>>;
  not?: Maybe<NestedEnumUserStatusFilter>;
};

export type EnumUserPlanFilter = {
  equals?: Maybe<UserPlan>;
  in?: Maybe<Array<Maybe<UserPlan>>>;
  notIn?: Maybe<Array<Maybe<UserPlan>>>;
  not?: Maybe<NestedEnumUserPlanFilter>;
};

export type JsonNullableFilter = {
  equals?: Maybe<Scalars['Json']>;
  not?: Maybe<Scalars['Json']>;
};

export type DateTimeFilter = {
  equals?: Maybe<Scalars['DateTime']>;
  in?: Maybe<Array<Maybe<Scalars['DateTime']>>>;
  notIn?: Maybe<Array<Maybe<Scalars['DateTime']>>>;
  lt?: Maybe<Scalars['DateTime']>;
  lte?: Maybe<Scalars['DateTime']>;
  gt?: Maybe<Scalars['DateTime']>;
  gte?: Maybe<Scalars['DateTime']>;
  not?: Maybe<NestedDateTimeFilter>;
};

export type DateTimeNullableFilter = {
  equals?: Maybe<Scalars['DateTime']>;
  in?: Maybe<Array<Maybe<Scalars['DateTime']>>>;
  notIn?: Maybe<Array<Maybe<Scalars['DateTime']>>>;
  lt?: Maybe<Scalars['DateTime']>;
  lte?: Maybe<Scalars['DateTime']>;
  gt?: Maybe<Scalars['DateTime']>;
  gte?: Maybe<Scalars['DateTime']>;
  not?: Maybe<NestedDateTimeNullableFilter>;
};

export type OAuthProvidersListRelationFilter = {
  every?: Maybe<OAuthProvidersWhereInput>;
  some?: Maybe<OAuthProvidersWhereInput>;
  none?: Maybe<OAuthProvidersWhereInput>;
};

export type EnumOAuthProviderFilter = {
  equals?: Maybe<OAuthProvider>;
  in?: Maybe<Array<Maybe<OAuthProvider>>>;
  notIn?: Maybe<Array<Maybe<OAuthProvider>>>;
  not?: Maybe<NestedEnumOAuthProviderFilter>;
};

export type IntFilter = {
  equals?: Maybe<Scalars['Int']>;
  in?: Maybe<Array<Maybe<Scalars['Int']>>>;
  notIn?: Maybe<Array<Maybe<Scalars['Int']>>>;
  lt?: Maybe<Scalars['Int']>;
  lte?: Maybe<Scalars['Int']>;
  gt?: Maybe<Scalars['Int']>;
  gte?: Maybe<Scalars['Int']>;
  not?: Maybe<NestedIntFilter>;
};

export type UserRelationFilter = {
  is?: Maybe<UserWhereInput>;
  isNot?: Maybe<UserWhereInput>;
};

export type OAuthProvidersUserIdProviderCompoundUniqueInput = {
  userId: Scalars['String'];
  provider: OAuthProvider;
};

export type OAuthProvidersCreateNestedManyWithoutOwnerInput = {
  create?: Maybe<Array<Maybe<OAuthProvidersCreateWithoutOwnerInput>>>;
  connectOrCreate?: Maybe<
    Array<Maybe<OAuthProvidersCreateOrConnectWithoutownerInput>>
  >;
  connect?: Maybe<Array<Maybe<OAuthProvidersWhereUniqueInput>>>;
};

export type OAuthProvidersUncheckedCreateNestedManyWithoutOwnerInput = {
  create?: Maybe<Array<Maybe<OAuthProvidersCreateWithoutOwnerInput>>>;
  connectOrCreate?: Maybe<
    Array<Maybe<OAuthProvidersCreateOrConnectWithoutownerInput>>
  >;
  connect?: Maybe<Array<Maybe<OAuthProvidersWhereUniqueInput>>>;
};

export type StringFieldUpdateOperationsInput = {
  set?: Maybe<Scalars['String']>;
};

export type NullableStringFieldUpdateOperationsInput = {
  set?: Maybe<Scalars['String']>;
};

export type EnumUserRoleFieldUpdateOperationsInput = {
  set?: Maybe<UserRole>;
};

export type EnumUserStatusFieldUpdateOperationsInput = {
  set?: Maybe<UserStatus>;
};

export type EnumUserPlanFieldUpdateOperationsInput = {
  set?: Maybe<UserPlan>;
};

export type DateTimeFieldUpdateOperationsInput = {
  set?: Maybe<Scalars['DateTime']>;
};

export type NullableDateTimeFieldUpdateOperationsInput = {
  set?: Maybe<Scalars['DateTime']>;
};

export type OAuthProvidersUpdateManyWithoutOwnerInput = {
  create?: Maybe<Array<Maybe<OAuthProvidersCreateWithoutOwnerInput>>>;
  connectOrCreate?: Maybe<
    Array<Maybe<OAuthProvidersCreateOrConnectWithoutownerInput>>
  >;
  upsert?: Maybe<
    Array<Maybe<OAuthProvidersUpsertWithWhereUniqueWithoutOwnerInput>>
  >;
  connect?: Maybe<Array<Maybe<OAuthProvidersWhereUniqueInput>>>;
  set?: Maybe<Array<Maybe<OAuthProvidersWhereUniqueInput>>>;
  disconnect?: Maybe<Array<Maybe<OAuthProvidersWhereUniqueInput>>>;
  delete?: Maybe<Array<Maybe<OAuthProvidersWhereUniqueInput>>>;
  update?: Maybe<
    Array<Maybe<OAuthProvidersUpdateWithWhereUniqueWithoutOwnerInput>>
  >;
  updateMany?: Maybe<
    Array<Maybe<OAuthProvidersUpdateManyWithWhereWithoutOwnerInput>>
  >;
  deleteMany?: Maybe<Array<Maybe<OAuthProvidersScalarWhereInput>>>;
};

export type OAuthProvidersUncheckedUpdateManyWithoutOwnerInput = {
  create?: Maybe<Array<Maybe<OAuthProvidersCreateWithoutOwnerInput>>>;
  connectOrCreate?: Maybe<
    Array<Maybe<OAuthProvidersCreateOrConnectWithoutownerInput>>
  >;
  upsert?: Maybe<
    Array<Maybe<OAuthProvidersUpsertWithWhereUniqueWithoutOwnerInput>>
  >;
  connect?: Maybe<Array<Maybe<OAuthProvidersWhereUniqueInput>>>;
  set?: Maybe<Array<Maybe<OAuthProvidersWhereUniqueInput>>>;
  disconnect?: Maybe<Array<Maybe<OAuthProvidersWhereUniqueInput>>>;
  delete?: Maybe<Array<Maybe<OAuthProvidersWhereUniqueInput>>>;
  update?: Maybe<
    Array<Maybe<OAuthProvidersUpdateWithWhereUniqueWithoutOwnerInput>>
  >;
  updateMany?: Maybe<
    Array<Maybe<OAuthProvidersUpdateManyWithWhereWithoutOwnerInput>>
  >;
  deleteMany?: Maybe<Array<Maybe<OAuthProvidersScalarWhereInput>>>;
};

export type UserCreateNestedOneWithoutOAuthProvidersInput = {
  create?: Maybe<UserUncheckedCreateWithoutOAuthProvidersInput>;
  connectOrCreate?: Maybe<UserCreateOrConnectWithoutoAuthProvidersInput>;
  connect?: Maybe<UserWhereUniqueInput>;
};

export type EnumOAuthProviderFieldUpdateOperationsInput = {
  set?: Maybe<OAuthProvider>;
};

export type IntFieldUpdateOperationsInput = {
  set?: Maybe<Scalars['Int']>;
  increment?: Maybe<Scalars['Int']>;
  decrement?: Maybe<Scalars['Int']>;
  multiply?: Maybe<Scalars['Int']>;
  divide?: Maybe<Scalars['Int']>;
};

export type UserUpdateOneRequiredWithoutOAuthProvidersInput = {
  create?: Maybe<UserUncheckedCreateWithoutOAuthProvidersInput>;
  connectOrCreate?: Maybe<UserCreateOrConnectWithoutoAuthProvidersInput>;
  upsert?: Maybe<UserUpsertWithoutOAuthProvidersInput>;
  connect?: Maybe<UserWhereUniqueInput>;
  update?: Maybe<UserUncheckedUpdateWithoutOAuthProvidersInput>;
};

export type NestedStringFilter = {
  equals?: Maybe<Scalars['String']>;
  in?: Maybe<Array<Maybe<Scalars['String']>>>;
  notIn?: Maybe<Array<Maybe<Scalars['String']>>>;
  lt?: Maybe<Scalars['String']>;
  lte?: Maybe<Scalars['String']>;
  gt?: Maybe<Scalars['String']>;
  gte?: Maybe<Scalars['String']>;
  contains?: Maybe<Scalars['String']>;
  startsWith?: Maybe<Scalars['String']>;
  endsWith?: Maybe<Scalars['String']>;
  not?: Maybe<NestedStringFilter>;
};

export type NestedStringNullableFilter = {
  equals?: Maybe<Scalars['String']>;
  in?: Maybe<Array<Maybe<Scalars['String']>>>;
  notIn?: Maybe<Array<Maybe<Scalars['String']>>>;
  lt?: Maybe<Scalars['String']>;
  lte?: Maybe<Scalars['String']>;
  gt?: Maybe<Scalars['String']>;
  gte?: Maybe<Scalars['String']>;
  contains?: Maybe<Scalars['String']>;
  startsWith?: Maybe<Scalars['String']>;
  endsWith?: Maybe<Scalars['String']>;
  not?: Maybe<NestedStringNullableFilter>;
};

export type NestedEnumUserRoleFilter = {
  equals?: Maybe<UserRole>;
  in?: Maybe<Array<Maybe<UserRole>>>;
  notIn?: Maybe<Array<Maybe<UserRole>>>;
  not?: Maybe<NestedEnumUserRoleFilter>;
};

export type NestedEnumUserStatusFilter = {
  equals?: Maybe<UserStatus>;
  in?: Maybe<Array<Maybe<UserStatus>>>;
  notIn?: Maybe<Array<Maybe<UserStatus>>>;
  not?: Maybe<NestedEnumUserStatusFilter>;
};

export type NestedEnumUserPlanFilter = {
  equals?: Maybe<UserPlan>;
  in?: Maybe<Array<Maybe<UserPlan>>>;
  notIn?: Maybe<Array<Maybe<UserPlan>>>;
  not?: Maybe<NestedEnumUserPlanFilter>;
};

export type NestedDateTimeFilter = {
  equals?: Maybe<Scalars['DateTime']>;
  in?: Maybe<Array<Maybe<Scalars['DateTime']>>>;
  notIn?: Maybe<Array<Maybe<Scalars['DateTime']>>>;
  lt?: Maybe<Scalars['DateTime']>;
  lte?: Maybe<Scalars['DateTime']>;
  gt?: Maybe<Scalars['DateTime']>;
  gte?: Maybe<Scalars['DateTime']>;
  not?: Maybe<NestedDateTimeFilter>;
};

export type NestedDateTimeNullableFilter = {
  equals?: Maybe<Scalars['DateTime']>;
  in?: Maybe<Array<Maybe<Scalars['DateTime']>>>;
  notIn?: Maybe<Array<Maybe<Scalars['DateTime']>>>;
  lt?: Maybe<Scalars['DateTime']>;
  lte?: Maybe<Scalars['DateTime']>;
  gt?: Maybe<Scalars['DateTime']>;
  gte?: Maybe<Scalars['DateTime']>;
  not?: Maybe<NestedDateTimeNullableFilter>;
};

export type NestedEnumOAuthProviderFilter = {
  equals?: Maybe<OAuthProvider>;
  in?: Maybe<Array<Maybe<OAuthProvider>>>;
  notIn?: Maybe<Array<Maybe<OAuthProvider>>>;
  not?: Maybe<NestedEnumOAuthProviderFilter>;
};

export type NestedIntFilter = {
  equals?: Maybe<Scalars['Int']>;
  in?: Maybe<Array<Maybe<Scalars['Int']>>>;
  notIn?: Maybe<Array<Maybe<Scalars['Int']>>>;
  lt?: Maybe<Scalars['Int']>;
  lte?: Maybe<Scalars['Int']>;
  gt?: Maybe<Scalars['Int']>;
  gte?: Maybe<Scalars['Int']>;
  not?: Maybe<NestedIntFilter>;
};

export type OAuthProvidersCreateWithoutOwnerInput = {
  provider: OAuthProvider;
  token: Scalars['String'];
  expires: Scalars['Int'];
  createdAt?: Maybe<Scalars['DateTime']>;
  updatedAt?: Maybe<Scalars['DateTime']>;
};

export type OAuthProvidersUncheckedCreateWithoutOwnerInput = {
  provider: OAuthProvider;
  token: Scalars['String'];
  expires: Scalars['Int'];
  createdAt?: Maybe<Scalars['DateTime']>;
  updatedAt?: Maybe<Scalars['DateTime']>;
};

export type OAuthProvidersCreateOrConnectWithoutownerInput = {
  where: OAuthProvidersWhereUniqueInput;
  create: OAuthProvidersUncheckedCreateWithoutOwnerInput;
};

export type OAuthProvidersUpsertWithWhereUniqueWithoutOwnerInput = {
  where: OAuthProvidersWhereUniqueInput;
  update: OAuthProvidersUncheckedUpdateWithoutOwnerInput;
  create: OAuthProvidersUncheckedCreateWithoutOwnerInput;
};

export type OAuthProvidersUpdateWithWhereUniqueWithoutOwnerInput = {
  where: OAuthProvidersWhereUniqueInput;
  data: OAuthProvidersUncheckedUpdateWithoutOwnerInput;
};

export type OAuthProvidersUpdateManyWithWhereWithoutOwnerInput = {
  where: OAuthProvidersScalarWhereInput;
  data: OAuthProvidersUncheckedUpdateManyWithoutOAuthProvidersInput;
};

export type OAuthProvidersScalarWhereInput = {
  AND?: Maybe<Array<Maybe<OAuthProvidersScalarWhereInput>>>;
  OR?: Maybe<Array<Maybe<OAuthProvidersScalarWhereInput>>>;
  NOT?: Maybe<Array<Maybe<OAuthProvidersScalarWhereInput>>>;
  userId?: Maybe<StringFilter>;
  provider?: Maybe<EnumOAuthProviderFilter>;
  token?: Maybe<StringFilter>;
  expires?: Maybe<IntFilter>;
  createdAt?: Maybe<DateTimeFilter>;
  updatedAt?: Maybe<DateTimeFilter>;
};

export type UserCreateWithoutOAuthProvidersInput = {
  id?: Maybe<Scalars['String']>;
  email: Scalars['String'];
  password?: Maybe<Scalars['String']>;
  encryptionKey: Scalars['String'];
  role?: Maybe<UserRole>;
  status?: Maybe<UserStatus>;
  plan?: Maybe<UserPlan>;
  name?: Maybe<Scalars['Json']>;
  avatar?: Maybe<Scalars['Json']>;
  bio?: Maybe<Scalars['String']>;
  shortBio?: Maybe<Scalars['String']>;
  homepage?: Maybe<Scalars['String']>;
  location?: Maybe<Scalars['String']>;
  createdIp: Scalars['String'];
  latestIp: Scalars['String'];
  createdAt?: Maybe<Scalars['DateTime']>;
  activeAt?: Maybe<Scalars['DateTime']>;
  updatedAt?: Maybe<Scalars['DateTime']>;
  deletedAt?: Maybe<Scalars['DateTime']>;
};

export type UserUncheckedCreateWithoutOAuthProvidersInput = {
  id?: Maybe<Scalars['String']>;
  email: Scalars['String'];
  password?: Maybe<Scalars['String']>;
  encryptionKey: Scalars['String'];
  role?: Maybe<UserRole>;
  status?: Maybe<UserStatus>;
  plan?: Maybe<UserPlan>;
  name?: Maybe<Scalars['Json']>;
  avatar?: Maybe<Scalars['Json']>;
  bio?: Maybe<Scalars['String']>;
  shortBio?: Maybe<Scalars['String']>;
  homepage?: Maybe<Scalars['String']>;
  location?: Maybe<Scalars['String']>;
  createdIp: Scalars['String'];
  latestIp: Scalars['String'];
  createdAt?: Maybe<Scalars['DateTime']>;
  activeAt?: Maybe<Scalars['DateTime']>;
  updatedAt?: Maybe<Scalars['DateTime']>;
  deletedAt?: Maybe<Scalars['DateTime']>;
};

export type UserCreateOrConnectWithoutoAuthProvidersInput = {
  where: UserWhereUniqueInput;
  create: UserUncheckedCreateWithoutOAuthProvidersInput;
};

export type UserUpsertWithoutOAuthProvidersInput = {
  update: UserUncheckedUpdateWithoutOAuthProvidersInput;
  create: UserUncheckedCreateWithoutOAuthProvidersInput;
};

export type UserUpdateWithoutOAuthProvidersInput = {
  id?: Maybe<StringFieldUpdateOperationsInput>;
  email?: Maybe<StringFieldUpdateOperationsInput>;
  password?: Maybe<NullableStringFieldUpdateOperationsInput>;
  encryptionKey?: Maybe<StringFieldUpdateOperationsInput>;
  role?: Maybe<EnumUserRoleFieldUpdateOperationsInput>;
  status?: Maybe<EnumUserStatusFieldUpdateOperationsInput>;
  plan?: Maybe<EnumUserPlanFieldUpdateOperationsInput>;
  name?: Maybe<Scalars['Json']>;
  avatar?: Maybe<Scalars['Json']>;
  bio?: Maybe<NullableStringFieldUpdateOperationsInput>;
  shortBio?: Maybe<NullableStringFieldUpdateOperationsInput>;
  homepage?: Maybe<NullableStringFieldUpdateOperationsInput>;
  location?: Maybe<NullableStringFieldUpdateOperationsInput>;
  createdIp?: Maybe<StringFieldUpdateOperationsInput>;
  latestIp?: Maybe<StringFieldUpdateOperationsInput>;
  createdAt?: Maybe<DateTimeFieldUpdateOperationsInput>;
  activeAt?: Maybe<DateTimeFieldUpdateOperationsInput>;
  updatedAt?: Maybe<DateTimeFieldUpdateOperationsInput>;
  deletedAt?: Maybe<NullableDateTimeFieldUpdateOperationsInput>;
};

export type UserUncheckedUpdateWithoutOAuthProvidersInput = {
  id?: Maybe<StringFieldUpdateOperationsInput>;
  email?: Maybe<StringFieldUpdateOperationsInput>;
  password?: Maybe<NullableStringFieldUpdateOperationsInput>;
  encryptionKey?: Maybe<StringFieldUpdateOperationsInput>;
  role?: Maybe<EnumUserRoleFieldUpdateOperationsInput>;
  status?: Maybe<EnumUserStatusFieldUpdateOperationsInput>;
  plan?: Maybe<EnumUserPlanFieldUpdateOperationsInput>;
  name?: Maybe<Scalars['Json']>;
  avatar?: Maybe<Scalars['Json']>;
  bio?: Maybe<NullableStringFieldUpdateOperationsInput>;
  shortBio?: Maybe<NullableStringFieldUpdateOperationsInput>;
  homepage?: Maybe<NullableStringFieldUpdateOperationsInput>;
  location?: Maybe<NullableStringFieldUpdateOperationsInput>;
  createdIp?: Maybe<StringFieldUpdateOperationsInput>;
  latestIp?: Maybe<StringFieldUpdateOperationsInput>;
  createdAt?: Maybe<DateTimeFieldUpdateOperationsInput>;
  activeAt?: Maybe<DateTimeFieldUpdateOperationsInput>;
  updatedAt?: Maybe<DateTimeFieldUpdateOperationsInput>;
  deletedAt?: Maybe<NullableDateTimeFieldUpdateOperationsInput>;
};

export type OAuthProvidersUpdateWithoutOwnerInput = {
  provider?: Maybe<EnumOAuthProviderFieldUpdateOperationsInput>;
  token?: Maybe<StringFieldUpdateOperationsInput>;
  expires?: Maybe<IntFieldUpdateOperationsInput>;
  createdAt?: Maybe<DateTimeFieldUpdateOperationsInput>;
  updatedAt?: Maybe<DateTimeFieldUpdateOperationsInput>;
};

export type OAuthProvidersUncheckedUpdateWithoutOwnerInput = {
  provider?: Maybe<EnumOAuthProviderFieldUpdateOperationsInput>;
  token?: Maybe<StringFieldUpdateOperationsInput>;
  expires?: Maybe<IntFieldUpdateOperationsInput>;
  createdAt?: Maybe<DateTimeFieldUpdateOperationsInput>;
  updatedAt?: Maybe<DateTimeFieldUpdateOperationsInput>;
};

export type OAuthProvidersUncheckedUpdateManyWithoutOAuthProvidersInput = {
  provider?: Maybe<EnumOAuthProviderFieldUpdateOperationsInput>;
  token?: Maybe<StringFieldUpdateOperationsInput>;
  expires?: Maybe<IntFieldUpdateOperationsInput>;
  createdAt?: Maybe<DateTimeFieldUpdateOperationsInput>;
  updatedAt?: Maybe<DateTimeFieldUpdateOperationsInput>;
};

export type AggregateUser = {
  __typename?: 'AggregateUser';
  count?: Maybe<UserCountAggregateOutputType>;
  min?: Maybe<UserMinAggregateOutputType>;
  max?: Maybe<UserMaxAggregateOutputType>;
};

export type AggregateOAuthProviders = {
  __typename?: 'AggregateOAuthProviders';
  count?: Maybe<OAuthProvidersCountAggregateOutputType>;
  avg?: Maybe<OAuthProvidersAvgAggregateOutputType>;
  sum?: Maybe<OAuthProvidersSumAggregateOutputType>;
  min?: Maybe<OAuthProvidersMinAggregateOutputType>;
  max?: Maybe<OAuthProvidersMaxAggregateOutputType>;
};

export type UserCountAggregateOutputType = {
  __typename?: 'UserCountAggregateOutputType';
  id?: Maybe<Scalars['Int']>;
  email?: Maybe<Scalars['Int']>;
  password?: Maybe<Scalars['Int']>;
  encryptionKey?: Maybe<Scalars['Int']>;
  role?: Maybe<Scalars['Int']>;
  status?: Maybe<Scalars['Int']>;
  plan?: Maybe<Scalars['Int']>;
  name?: Maybe<Scalars['Int']>;
  avatar?: Maybe<Scalars['Int']>;
  bio?: Maybe<Scalars['Int']>;
  shortBio?: Maybe<Scalars['Int']>;
  homepage?: Maybe<Scalars['Int']>;
  location?: Maybe<Scalars['Int']>;
  createdIp?: Maybe<Scalars['Int']>;
  latestIp?: Maybe<Scalars['Int']>;
  createdAt?: Maybe<Scalars['Int']>;
  activeAt?: Maybe<Scalars['Int']>;
  updatedAt?: Maybe<Scalars['Int']>;
  deletedAt?: Maybe<Scalars['Int']>;
  _all: Scalars['Int'];
};

export type UserMinAggregateOutputType = {
  __typename?: 'UserMinAggregateOutputType';
  id?: Maybe<Scalars['String']>;
  email?: Maybe<Scalars['String']>;
  password?: Maybe<Scalars['String']>;
  encryptionKey?: Maybe<Scalars['String']>;
  role?: Maybe<UserRole>;
  status?: Maybe<UserStatus>;
  plan?: Maybe<UserPlan>;
  bio?: Maybe<Scalars['String']>;
  shortBio?: Maybe<Scalars['String']>;
  homepage?: Maybe<Scalars['String']>;
  location?: Maybe<Scalars['String']>;
  createdIp?: Maybe<Scalars['String']>;
  latestIp?: Maybe<Scalars['String']>;
  createdAt?: Maybe<Scalars['DateTime']>;
  activeAt?: Maybe<Scalars['DateTime']>;
  updatedAt?: Maybe<Scalars['DateTime']>;
  deletedAt?: Maybe<Scalars['DateTime']>;
};

export type UserMaxAggregateOutputType = {
  __typename?: 'UserMaxAggregateOutputType';
  id?: Maybe<Scalars['String']>;
  email?: Maybe<Scalars['String']>;
  password?: Maybe<Scalars['String']>;
  encryptionKey?: Maybe<Scalars['String']>;
  role?: Maybe<UserRole>;
  status?: Maybe<UserStatus>;
  plan?: Maybe<UserPlan>;
  bio?: Maybe<Scalars['String']>;
  shortBio?: Maybe<Scalars['String']>;
  homepage?: Maybe<Scalars['String']>;
  location?: Maybe<Scalars['String']>;
  createdIp?: Maybe<Scalars['String']>;
  latestIp?: Maybe<Scalars['String']>;
  createdAt?: Maybe<Scalars['DateTime']>;
  activeAt?: Maybe<Scalars['DateTime']>;
  updatedAt?: Maybe<Scalars['DateTime']>;
  deletedAt?: Maybe<Scalars['DateTime']>;
};

export type OAuthProvidersCountAggregateOutputType = {
  __typename?: 'OAuthProvidersCountAggregateOutputType';
  userId?: Maybe<Scalars['Int']>;
  provider?: Maybe<Scalars['Int']>;
  token?: Maybe<Scalars['Int']>;
  expires: Scalars['Int'];
  createdAt?: Maybe<Scalars['Int']>;
  updatedAt?: Maybe<Scalars['Int']>;
  _all: Scalars['Int'];
};

export type OAuthProvidersAvgAggregateOutputType = {
  __typename?: 'OAuthProvidersAvgAggregateOutputType';
  expires: Scalars['Float'];
};

export type OAuthProvidersSumAggregateOutputType = {
  __typename?: 'OAuthProvidersSumAggregateOutputType';
  expires: Scalars['Int'];
};

export type OAuthProvidersMinAggregateOutputType = {
  __typename?: 'OAuthProvidersMinAggregateOutputType';
  userId?: Maybe<Scalars['String']>;
  provider?: Maybe<OAuthProvider>;
  token?: Maybe<Scalars['String']>;
  expires: Scalars['Int'];
  createdAt?: Maybe<Scalars['DateTime']>;
  updatedAt?: Maybe<Scalars['DateTime']>;
};

export type OAuthProvidersMaxAggregateOutputType = {
  __typename?: 'OAuthProvidersMaxAggregateOutputType';
  userId?: Maybe<Scalars['String']>;
  provider?: Maybe<OAuthProvider>;
  token?: Maybe<Scalars['String']>;
  expires: Scalars['Int'];
  createdAt?: Maybe<Scalars['DateTime']>;
  updatedAt?: Maybe<Scalars['DateTime']>;
};

export type Query = {
  __typename?: 'Query';
  users?: Maybe<Array<Maybe<User>>>;
};

export type QueryUsersArgs = {
  orderBy?: Maybe<UserOrderByInput>;
  cursor?: Maybe<UserWhereUniqueInput>;
  take?: Maybe<Scalars['Int']>;
  skip?: Maybe<Scalars['Int']>;
};

export type Mutation = {
  __typename?: 'Mutation';
  signUp?: Maybe<ViewerWithToken>;
  logIn?: Maybe<ViewerWithToken>;
  authenticate?: Maybe<Viewer>;
  updateProfile?: Maybe<Viewer>;
  updatePassword?: Maybe<Viewer>;
  updateEmail?: Maybe<Viewer>;
};

export type MutationSignUpArgs = {
  email: Scalars['String'];
  password: Scalars['String'];
};

export type MutationLogInArgs = {
  email: Scalars['String'];
  password: Scalars['String'];
};

export type MutationUpdateProfileArgs = {
  id: Scalars['String'];
  name?: Maybe<Scalars['String']>;
  shortBio?: Maybe<Scalars['String']>;
  homepage?: Maybe<Scalars['String']>;
  location?: Maybe<Scalars['String']>;
};

export type MutationUpdatePasswordArgs = {
  id: Scalars['String'];
  password: Scalars['String'];
  newPassword: Scalars['String'];
};

export type MutationUpdateEmailArgs = {
  id: Scalars['String'];
  email: Scalars['String'];
};

export type AuthenticateMutationVariables = Exact<{[key: string]: never}>;

export type AuthenticateMutation = {__typename?: 'Mutation'} & {
  authenticate?: Maybe<
    {__typename?: 'Viewer'} & Pick<
      Viewer,
      | 'id'
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

export type SignUpMutationVariables = Exact<{
  email: Scalars['String'];
  password: Scalars['String'];
}>;

export type SignUpMutation = {__typename?: 'Mutation'} & {
  signUp?: Maybe<
    {__typename?: 'ViewerWithToken'} & Pick<
      ViewerWithToken,
      | 'id'
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
      | 'token'
    >
  >;
};

export type LogInMutationVariables = Exact<{
  email: Scalars['String'];
  password: Scalars['String'];
}>;

export type LogInMutation = {__typename?: 'Mutation'} & {
  logIn?: Maybe<
    {__typename?: 'ViewerWithToken'} & Pick<
      ViewerWithToken,
      | 'id'
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
      | 'token'
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

export type UpdatePasswordMutationVariables = Exact<{
  id: Scalars['String'];
  password: Scalars['String'];
  newPassword: Scalars['String'];
}>;

export type UpdatePasswordMutation = {__typename?: 'Mutation'} & {
  updatePassword?: Maybe<{__typename?: 'Viewer'} & Pick<Viewer, 'id'>>;
};

export type UpdateEmailMutationVariables = Exact<{
  id: Scalars['String'];
  email: Scalars['String'];
}>;

export type UpdateEmailMutation = {__typename?: 'Mutation'} & {
  updateEmail?: Maybe<{__typename?: 'Viewer'} & Pick<Viewer, 'id'>>;
};

export type UsersQueryVariables = Exact<{
  cursor?: Maybe<UserWhereUniqueInput>;
  orderBy?: Maybe<UserOrderByInput>;
  skip?: Maybe<Scalars['Int']>;
  take?: Maybe<Scalars['Int']>;
}>;

export type UsersQuery = {__typename?: 'Query'} & {
  users?: Maybe<Array<Maybe<{__typename?: 'User'} & Pick<User, 'id'>>>>;
};

export type UsersWithEmailQueryVariables = Exact<{
  cursor?: Maybe<UserWhereUniqueInput>;
  orderBy?: Maybe<UserOrderByInput>;
  skip?: Maybe<Scalars['Int']>;
  take?: Maybe<Scalars['Int']>;
}>;

export type UsersWithEmailQuery = {__typename?: 'Query'} & {
  users?: Maybe<
    Array<Maybe<{__typename?: 'User'} & Pick<User, 'id' | 'email'>>>
  >;
};

export const AuthenticateDocument = gql`
  mutation authenticate {
    authenticate {
      id
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
export const SignUpDocument = gql`
  mutation signUp($email: String!, $password: String!) {
    signUp(email: $email, password: $password) {
      id
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
      token
    }
  }
`;

export function useSignUpMutation() {
  return Urql.useMutation<SignUpMutation, SignUpMutationVariables>(
    SignUpDocument
  );
}
export const LogInDocument = gql`
  mutation logIn($email: String!, $password: String!) {
    logIn(email: $email, password: $password) {
      id
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
      token
    }
  }
`;

export function useLogInMutation() {
  return Urql.useMutation<LogInMutation, LogInMutationVariables>(LogInDocument);
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

export function useUpdateProfileMutation() {
  return Urql.useMutation<
    UpdateProfileMutation,
    UpdateProfileMutationVariables
  >(UpdateProfileDocument);
}
export const UpdatePasswordDocument = gql`
  mutation updatePassword(
    $id: String!
    $password: String!
    $newPassword: String!
  ) {
    updatePassword(id: $id, password: $password, newPassword: $newPassword) {
      id
    }
  }
`;

export function useUpdatePasswordMutation() {
  return Urql.useMutation<
    UpdatePasswordMutation,
    UpdatePasswordMutationVariables
  >(UpdatePasswordDocument);
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
export const UsersDocument = gql`
  query Users(
    $cursor: UserWhereUniqueInput
    $orderBy: UserOrderByInput
    $skip: Int
    $take: Int
  ) {
    users(cursor: $cursor, orderBy: $orderBy, skip: $skip, take: $take) {
      id
    }
  }
`;

export function useUsersQuery(
  options: Omit<Urql.UseQueryArgs<UsersQueryVariables>, 'query'> = {}
) {
  return Urql.useQuery<UsersQuery>({query: UsersDocument, ...options});
}
export const UsersWithEmailDocument = gql`
  query UsersWithEmail(
    $cursor: UserWhereUniqueInput
    $orderBy: UserOrderByInput
    $skip: Int
    $take: Int
  ) {
    users(cursor: $cursor, orderBy: $orderBy, skip: $skip, take: $take) {
      id
      email
    }
  }
`;

export function useUsersWithEmailQuery(
  options: Omit<Urql.UseQueryArgs<UsersWithEmailQueryVariables>, 'query'> = {}
) {
  return Urql.useQuery<UsersWithEmailQuery>({
    query: UsersWithEmailDocument,
    ...options,
  });
}
