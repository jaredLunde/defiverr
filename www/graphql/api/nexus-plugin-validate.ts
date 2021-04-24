/* eslint-disable no-unused-vars */
import path from 'path';
import {GraphQLResolveInfo} from 'graphql';
import {UserInputError} from 'apollo-server-micro';
import {plugin, core} from 'nexus';
import type {ObjectSchema} from 'joi';

export function fieldValidatePlugin() {
  return plugin({
    name: 'NexusValidate',
    description:
      'The validate plugin provides field-level validation for a schema.',
    fieldDefTypes: fieldDefTypes,
    onCreateFieldResolver(config) {
      const validate = config.fieldConfig.extensions?.nexus?.config.validate;
      // If the field doesn't have a validate field, don't worry about wrapping the resolver
      if (validate == null) return;

      return async function (root, args, ctx, info, next) {
        let validated;
        try {
          validated =
            typeof validate === 'function'
              ? validate(root, args, ctx, info)
              : validate;
        } catch (e) {
          validated = Promise.reject(e);
        }

        return plugin.completeValue(validated, async (validateResult) => {
          if (
            typeof validateResult !== 'boolean' &&
            'validate' in validateResult
          ) {
            const validated = validateResult.validate(args, {
              abortEarly: false,
            });

            if (validated.error) {
              throw new UserInputError(validated.error.message, {
                details: validated.error.details,
              });
            }

            validateResult = true;
          }

          if (validateResult === true) {
            return next(root, args, ctx, info);
          }

          throw new UserInputError('Invalid arguments', {
            details: [],
          });
        });
      };
    },
  });
}

const FieldValidateResolverImport = core.printedGenTypingImport({
  module: '../graphql/api/nexus-plugin-validate',
  bindings: ['FieldValidateResolver'],
});

const fieldDefTypes = core.printedGenTyping({
  optional: true,
  name: 'validate',
  description: `
    Validation for an individual field. Returning "true"
    or "Promise<true>" means the field can be accessed.
    Returning "false" or "Promise<false>" will respond
    with a "Invalid arguments" error for the field. 
    Returning a Joi schema will call \`validate(args)\` on 
    the result. Throwing an error will also prevent the 
    resolver from executing.
  `,
  type: 'FieldValidateResolver<TypeName, FieldName>',
  imports: [FieldValidateResolverImport],
});

export type FieldValidateResolver<
  TypeName extends string,
  FieldName extends string
> =
  | ObjectSchema<core.ArgsValue<TypeName, FieldName>>
  | ((
      root: core.SourceValue<TypeName>,
      args: core.ArgsValue<TypeName, FieldName>,
      context: core.GetGen<'context'>,
      info: GraphQLResolveInfo
    ) => core.MaybePromise<
      ObjectSchema<core.ArgsValue<TypeName, FieldName>> | boolean
    >);

export interface FieldValidatePluginErrorConfig {
  error: Error;
  root: any;
  args: any;
  ctx: core.GetGen<'context'>;
  info: GraphQLResolveInfo;
}
