import * as React from 'react';
import {Checkbox, Toggle} from '@accessible/checkbox';
import type {CheckboxProps} from '@accessible/checkbox';
import type {DashTokens} from '@dash-ui/styles';
import {styles, mq} from '@/styles';
import type {ResponsiveProp} from '@/styles';
import {Text} from '@/components/text';

/**
 * An accessible switch component that uses a native `<input type='checkbox'>`
 */
export const Switch = React.forwardRef<HTMLInputElement, SwitchProps>(
  function Switch({size = 'lg', ...props}, ref) {
    const [checked, setChecked] = React.useState(
      props.checked ?? props.defaultChecked ?? false
    );
    const [focused, setFocused] = React.useState(false);

    return (
      <Checkbox
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
          <Text
            size={size}
            className={toggleSwitch({
              on: checked,
              off: !checked,
              focused,
              disabled: props.disabled,
            })}
          >
            <span
              className={toggleSwitch.thumb({
                on: checked,
                off: !checked,
              })}
            />
          </Text>
        </Toggle>
      </Checkbox>
    );
  }
);

export interface SwitchProps extends Omit<CheckboxProps, 'size'> {
  size?: ResponsiveProp<keyof DashTokens['font']['size']>;
}

export const toggleSwitch = Object.assign(
  styles({
    default: ({color, borderWidth, radius, transition}) => ({
      display: 'inline-flex',
      alignItems: 'center',
      border: `${borderWidth.hairline} solid ${color.translucentContrast}`,
      borderRadius: radius.full,
      transition: `background-color ${transition.duration.normal} ${transition.timing.inOut}`,
      height: '1.125em',
      width: '2em',
      padding: '0.1em',
    }),

    off: mq({
      default: ({color}) => ({
        backgroundColor: color.accent,
      }),
      hover: ({color}) => ({
        '&:hover': {
          backgroundColor: color.accentHover,
        },
        '[disabled] ~ &:hover': {
          backgroundColor: color.accent,
        },
        '&:active': {
          backgroundColor: color.accentActive,
        },
        '[disabled] ~ &:active': {
          backgroundColor: color.accent,
        },
      }),
    }),

    on: mq({
      default: ({color}) => ({
        backgroundColor: color.primary,
      }),
      hover: ({color}) => ({
        '&:hover': {
          backgroundColor: color.primaryHover,
        },
        '[disabled] ~ &:hover': {
          backgroundColor: color.primary,
        },
        '&:active': {
          backgroundColor: color.primaryActive,
        },
        '[disabled] ~ &:active': {
          backgroundColor: color.primary,
        },
      }),
    }),

    focused: ({elevation}) => ({
      boxShadow: elevation.outline,
    }),

    disabled: {
      opacity: 0.5,
      cursor: 'not-allowed',
    },
  }),
  {
    thumb: styles({
      default: ({color, transition, radius}) => ({
        display: 'inline-block',
        transition: `transform ${transition.duration.fast} ${transition.timing.inOut}`,
        width: `50%`,
        height: '100%',
        borderRadius: radius.full,
        backgroundColor: color.white,
        pointerEvents: 'none',
      }),

      off: {
        transform: 'translateX(0)',
      },

      on: {
        transform: `translateX(100%)`,
      },
    }),
  }
);
