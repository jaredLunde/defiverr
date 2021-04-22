import joi from 'joi';

export const errorCode = {
  sql: {
    duplicateKey: 'db.duplicateKey',
    notFound: 'db.notFound',
  },
  password: {
    incorrect: 'password.incorrect',
  },
} as const;

export const messages = {
  [errorCode.sql.duplicateKey]: `{{#label}} already exists`,
  [errorCode.sql.notFound]: `{{#label}} not found`,

  [errorCode.password.incorrect]: `{{#label}} is incorrect`,
} as const;

export const is = {
  notDuplicate<T>(entity: T) {
    return this.falsy(entity, errorCode.sql.duplicateKey);
  },

  falsy<T>(entity: T, code: string = errorCode.sql.duplicateKey) {
    return function <T>(
      value: T,
      helper: joi.CustomHelpers<any>
    ): T | joi.ErrorReport {
      return entity ? helper.error(code) : value;
    };
  },

  truthy<T>(entity: T, code: string = errorCode.sql.duplicateKey) {
    return function <T>(
      value: T,
      helper: joi.CustomHelpers<any>
    ): T | joi.ErrorReport {
      return entity ? value : helper.error(code);
    };
  },
} as const;
