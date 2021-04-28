import useId from '@accessible/use-id';
import * as React from 'react';
import type {FieldError} from 'react-hook-form';
import {Icon} from '@/components/icon';
import {column, row} from '@/styles/layout';
import {text} from '@/styles/text';

/**
 * A component that formats Yup errors and creates accessible error messages
 * by adding `aria-invalida` and `aria-describedby` props to its child, while
 * displaying the error message below with the ID provided to the `aria-describedby`
 * prop. By default, it uses the `name` prop from its child to determine which error
 * in the `errors` property to display. If no `name` prop is present on the child,
 * it is expected that you add a `name` prop to this component.
 *
 * @example
 * <YupError errors={errors}>
 *  <input name='foo' type='text'/>
 * </YupError>
 */
export function YupError({
  errors,
  children,
  name = children.props.name,
}: YupErrorProps) {
  const id = useId();
  const error = errors[name];
  let errorMessage: YupError<any> | string | undefined;

  if (error && error.message) {
    try {
      errorMessage = JSON.parse(error.message);
    } catch (err) {
      errorMessage = error.message;
    }
  }

  const ErrorComponent =
    typeof errorMessage === 'object'
      ? messageComponent[errorMessage.type]
      : messageComponent.default;

  return (
    <div className={column({gap: 'sm'})}>
      {error
        ? React.cloneElement(children, {
            'aria-invalid': true,
            'aria-describedby': id,
          })
        : children}

      {!!errorMessage && (
        <div className={row({align: 'start', gap: 'sm'})} id={id}>
          <Icon
            src='/icons/alert-circle.svg'
            color='orange600'
            style={{top: '0.25em'}}
          />

          <span
            className={text({size: 'xs'})}
            aria-label={
              typeof errorMessage === 'object'
                ? errorMessage['aria-label']
                : undefined
            }
          >
            <ErrorComponent message={errorMessage} />
          </span>
        </div>
      )}
    </div>
  );
}

const messageComponent: Record<
  string,
  React.ComponentType<{message: YupError<any, any> | string}>
> = {
  min({message}: {message: YupError<'min', {min: number}>}) {
    return (
      <React.Fragment>
        {message.originalValue.length}/{message.min}
      </React.Fragment>
    );
  },
  max({message}: {message: YupError<'max', {max: number}>}) {
    return (
      <React.Fragment>
        {message.originalValue.length}/{message.max}
      </React.Fragment>
    );
  },
  email(props: {message: YupError<'email', {regex: string}>}) {
    return (
      <React.Fragment>
        This should be a valid email address. For example:
        contact+support@theoretic.dev.
      </React.Fragment>
    );
  },
  url({message}: {message: YupError<'url', {regex: string}>}) {
    return (
      <React.Fragment>
        {message.path} should be a valid URL. For example:
        https://theoretic.dev.
      </React.Fragment>
    );
  },
  default({message}: {message: string}) {
    return <React.Fragment>{message}</React.Fragment>;
  },
};

export const yupMessage = {
  min: ({originalValue, min, label, path}: Message<{min: number}>) =>
    JSON.stringify({
      type: 'min',
      min,
      label,
      path,
      originalValue,
      'aria-label': `The minimum number of characters required by this field is: ${min}. The current value contains ${originalValue.length} characters.`,
    }),
  max: ({originalValue, max, label, path}: Message<{max: number}>) =>
    JSON.stringify({
      type: 'max',
      max,
      label,
      path,
      originalValue,
      'aria-label': `The maximum number of characters allowed for this field is: ${max}. The current value contains ${originalValue.length} characters.`,
    }),
  email: ({originalValue, regex, label, path}: Message<{regex: RegExp}>) =>
    JSON.stringify({
      type: 'email',
      regex: regex.toString(),
      label,
      path,
      originalValue,
    }),
  url: (fieldName: Message<{regex: RegExp}> | string) => {
    const cb = ({
      originalValue,
      regex,
      label,
      path,
    }: Message<{regex: RegExp}>) =>
      JSON.stringify({
        type: 'url',
        label,
        path,
        regex: regex.toString(),
        originalValue,
      });

    if (typeof fieldName === 'string') {
      return (message: Message<{regex: RegExp}>) =>
        cb({...message, path: fieldName});
    }

    return cb(fieldName);
  },
};

type YupError<
  T,
  P extends Record<string, unknown> = Record<string, unknown>
> = {
  type: T;
  path: string;
  label: string;
  originalValue: string;
  'aria-label'?: string;
} & P;

interface YupErrorProps {
  name?: string;
  errors: Record<string, FieldError | undefined>;
  children: React.ReactElement;
}

type Message<T> = {
  originalValue: string;
  label: string;
  path: string;
} & T;
