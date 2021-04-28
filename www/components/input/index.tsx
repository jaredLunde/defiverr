import clsx from 'clsx';
import * as React from 'react';
import {mq, styles} from '@/styles';
import {noop} from '@/utils/noop';

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  function Input(
    {
      className,
      placeholder,
      required,
      onChange = noop,
      onFocus = noop,
      onBlur = noop,
      ...props
    },
    ref
  ) {
    const [focused, setFocused] = React.useState(false);
    const [entered, setEntered] = React.useState(
      !!(props.value ?? props.defaultValue)
    );
    const typing = (!props.readOnly && focused) || entered;

    return (
      <React.Fragment>
        <label
          className={clsx(
            className,
            input({
              focused: focused && !props.readOnly,
              disabled: props.disabled,
              readOnly: props.readOnly,
            })
          )}
        >
          <span
            className={input.visualStyles({
              focused: focused && !props.readOnly,
              typing,
              readOnly: props.readOnly,
            })}
          >
            <span />
            {placeholder && (
              <span>
                <span className={input.placeholder({typing})}>
                  {placeholder}
                </span>
              </span>
            )}
            <span />
          </span>

          <input
            ref={ref}
            {...props}
            required={required}
            aria-required={required}
            onChange={(e) => {
              setEntered(!!e.target.value);
              onChange(e);
            }}
            onFocus={(e) => {
              setFocused(true);
              onFocus(e);
            }}
            onBlur={(e) => {
              setFocused(false);
              onBlur(e);
            }}
          />
        </label>
      </React.Fragment>
    );
  }
);

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: React.ReactNode;
}

export const resetVendorInputStyles = {
  display: 'inline-block',
  verticalAlign: 'middle',
  margin: 0,
  padding: 0,
  lineHeight: 1,
  border: 'none',
  backgroundImage: 'none',
  backgroundColor: 'transparent',
  boxShadow: 'none',
  appearance: 'none',
  outline: 'none',
  color: 'currentColor',
  fontFamily: 'inherit',
  fontSize: 'inherit',
  fontWeight: 'inherit',
  letterSpacing: 'inherit',

  ':focus, .using-keyboard &:focus': {
    outline: 'none',
    boxShadow: 'none',
  },
} as const;

export const input = Object.assign(
  styles({
    default: mq({
      default: ({pad, color, transition, font}) => ({
        display: 'inline-block',
        color: color.textAccent,

        input: {
          ...resetVendorInputStyles,
          color: color.text,
          lineHeight: font.leading.relaxed,
          padding: `${pad.sm} ${pad.md}`,
          width: '100%',
          transitionProperty: 'color',
          transitionDuration: transition.duration.fast,
          transitionTimingFunction: transition.timing.inOut,
        },
      }),
      hover: ({color}) => ({
        ':hover': {
          // backgroundColor: color.translucent,
        },
      }),
    }),

    focused: ({color}) => ({
      input: {
        caretColor: color.text,
        color: color.text,
      },
    }),

    disabled: mq({
      default: {
        opacity: 0.5,
        input: {
          cursor: 'not-allowed',
        },
      },
      hover: {
        ':hover': {
          backgroundColor: 'transparent',
        },
      },
    }),

    readOnly: mq({
      default: {
        input: {
          cursor: 'default',
        },
      },
      hover: {
        ':hover': {
          backgroundColor: 'transparent',
        },
      },
    }),
  }),
  {
    visualStyles: styles({
      default: ({color, radius, transition, borderWidth}) => ({
        position: 'absolute',
        pointerEvents: 'none',
        display: 'flex',
        height: '100%',
        width: '100%',
        color: 'currentColor',
        borderRadius: radius.primary,

        '> span': {
          flexShrink: 0,
          height: '100%',
          border: `${borderWidth.hairline} solid ${color.accent}`,
          transitionProperty: 'border-color',
          transitionDuration: transition.duration.fast,
          transitionTimingFunction: transition.timing.inOut,

          ':first-child': {
            width: 6,
            borderRightWidth: 0,
            borderRadius: `${radius.primary} 0 0 ${radius.primary}`,
          },

          ':nth-child(2):not(:last-child)': {
            display: 'flex',
            width: 'max-content',
            alignItems: 'center',
            borderRightWidth: 0,
            borderLeftWidth: 0,
            padding: `0 6px`,
          },

          ':last-child': {
            flexGrow: 1,
            borderLeftWidth: 0,
            borderRadius: `0 ${radius.primary} ${radius.primary} 0`,
          },
        },
      }),

      readOnly: ({color}) => ({
        // backgroundColor: color.translucent,
      }),

      focused: ({color}) => ({
        '> span': {
          borderColor: color.primary,
        },
      }),

      typing: {
        span: {
          ':nth-child(2):not(:last-child)': {
            borderTopColor: 'transparent',
          },
        },
      },
    }),

    placeholder: styles({
      default: ({transition}) => ({
        display: 'inline-block',
        color: 'currentColor',
        transformOrigin: 'top left',
        transitionProperty: 'font-size, color, transform, font-weight',
        transitionDuration: transition.duration.fast,
        transitionTimingFunction: transition.timing.inOut,
      }),

      typing: ({font}) => ({
        fontWeight: 600,
        fontSize: font.size.xs,
        transform: `translateY(-1.618em)`,
      }),
    }),
  } as const
);
