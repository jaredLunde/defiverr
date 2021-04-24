import * as React from 'react';
import {Checkbox as AccessibleCheckbox, Toggle} from '@accessible/checkbox';
import type {CheckboxProps as AccessibleCheckboxProps} from '@accessible/checkbox';
import {styles, mq} from '@/styles';

/**
 * An accessible checkbox component that uses a native `<input type='checkbox'>`
 */
export const Checkbox = React.forwardRef<HTMLInputElement, CheckboxProps>(
  function Checkbox(props, ref) {
    const [checked, setChecked] = React.useState(
      props.checked ?? props.defaultChecked ?? false
    );
    const [focused, setFocused] = React.useState(false);

    return (
      <AccessibleCheckbox
        {...props}
        onFocus={(e) => {
          props.onFocus?.(e);
          setFocused(true);
        }}
        onBlur={(e) => {
          props.onBlur?.(e);
          setFocused(false);
        }}
        onChange={(checked) => {
          props.onChange?.(checked);
          setChecked(checked);
        }}
        ref={ref}
      >
        <Toggle>
          <span
            className={checkbox({
              checked,
              unchecked: !checked,
              focused,
              disabled: props.disabled,
            })}
          >
            <span
              className={checkbox.checkmark({
                checked,
                unchecked: !checked,
              })}
            >
              {checkMark}
            </span>
          </span>
        </Toggle>
      </AccessibleCheckbox>
    );
  }
);

export interface CheckboxProps extends AccessibleCheckboxProps {}

const checkMark = (
  <svg fill='currentColor' viewBox='0 0 20 20' width='100%'>
    <path
      fillRule='evenodd'
      d='M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z'
      clipRule='evenodd'
    ></path>
  </svg>
);

export const checkbox = Object.assign(
  styles({
    default: ({color, borderWidth, transition}) => ({
      display: 'inline-flex',
      justifyContent: 'center',
      alignItems: 'center',
      // border: `${hairline} solid ${color.translucent}`,
      borderRadius: '0.1875em',
      transition: `background-color ${transition.duration.normal} ${transition.timing.inOut}`,
      height: '1.05em',
      width: '1.05em',
    }),

    unchecked: mq({
      default: ({color, transition, shadow}) => ({
        backgroundColor: color.indigo100,
        transitionDelay: transition.duration.fast,
        boxShadow: shadow.inner,
        '[disabled] ~ &': {
          boxShadow: 'none',
        },
      }),
      hover: ({color}) => ({
        '&:hover': {
          backgroundColor: color.gray300,
        },
        '[disabled] ~ &:hover': {
          backgroundColor: color.gray200,
          boxShadow: 'none',
        },
      }),
    }),

    checked: mq({
      default: ({color}) => ({
        backgroundColor: color.indigo700,
        boxShadow: 'none',
      }),
      hover: ({color}) => ({
        '&:hover': {
          backgroundColor: color.indigo600,
        },
        '[disabled] ~ &:hover': {
          backgroundColor: color.indigo700,
        },
      }),
    }),

    focused: ({shadow}) => ({
      boxShadow: shadow.outline,
    }),

    disabled: {
      opacity: 0.6,
      cursor: 'not-allowed',
    },
  }),
  {
    checkmark: styles({
      default: ({color, transition, radius}) => ({
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        height: '100%',
        borderRadius: radius.sm,
        color: color.white,
        pointerEvents: 'none',

        svg: {
          transitionProperty: 'transform, opacity',
          transitionDuration: transition.duration.normal,
          transitionDelay: transition.duration.faster,
          transitionTimingFunction: transition.timing.inOut,
        },
      }),

      unchecked: {
        svg: {
          opacity: 0,
          transform: 'scale(0) rotate(-61.8deg)',
        },
      },

      checked: {
        svg: {
          opacity: 1,
          transform: 'scale(1) rotate(0)',
        },
      },
    }),
  }
);
