import * as React from 'react';
import clsx from 'clsx';
import * as Dropdown from '@radix-ui/react-dropdown-menu';
import type {RadioGroupItemOwnProps} from '@radix-ui/react-radio-group';
import useMergedRef from '@react-hook/merged-ref';
import useSize from '@react-hook/size';
import useSwitch from '@react-hook/switch';
import useId from '@accessible/use-id';
import {canTouch} from '@/utils/can-touch';
import {resetVendorButtonStyles} from '@/components/button';
import {styles} from '@/styles';

export const Select = Object.assign(
  React.forwardRef<HTMLSelectElement, SelectProps>(function Select(
    {
      children,
      defaultOpen,
      open,
      onOpenChange,
      value,
      defaultValue,
      onChange,
      side = 'bottom',
      sideOffset,
      align = 'start',
      alignOffset,
      disabled,
      native,
      styles = selectStyles,
      style,
      ...props
    },
    outerRef
  ) {
    const id = useId();
    const innerRef = React.useRef<HTMLSelectElement>(null);
    const ref = useMergedRef(outerRef, innerRef);
    const rootRef = React.useRef<HTMLDivElement>(null);
    const [selected, setSelected] = React.useState(value ?? defaultValue);
    const [isOpen, toggleIsOpen] = useSwitch(defaultOpen, open, onOpenChange);
    const [labelWidth] = useSize(rootRef);
    const didMount = React.useRef(false);
    const storedOnChange = React.useRef(onChange);
    const renderNativeSelect = canTouch() || native;

    React.useEffect(() => {
      storedOnChange.current = onChange;
    });

    React.useEffect(() => {
      if (didMount.current) {
        storedOnChange.current?.(selected);
      }

      didMount.current = true;
    }, [selected]);
    let selectedOption: React.ReactElement<OptionProps>;

    React.Children.forEach(
      children,
      (
        child:
          | React.ReactElement<OptionProps>
          | React.ReactElement<OptGroupProps>,
        i
      ) => {
        if (!('value' in child.props)) {
          React.Children.forEach(
            child.props.children,
            (child2: React.ReactElement<OptionProps>, i2) => {
              if (i === 0 && i2 === 0) {
                // Pick the first by default
                selectedOption = child2;
              } else if (child2.props.value === selected) {
                selectedOption = child2;
              }
            }
          );
        } else if (i === 0) {
          // Pick the first by default
          selectedOption = child as React.ReactElement<OptionProps>;
        } else if (child.props.value === selected) {
          selectedOption = child as React.ReactElement<OptionProps>;
        }
      }
    );
    // @ts-expect-error
    const labelElement = React.cloneElement(selectedOption, {
      as: renderNativeSelect ? 'label' : 'div',
      // @ts-expect-error
      htmlFor: id,
      className: renderNativeSelect
        ? // @ts-expect-error
          clsx('select-label', styles('label'), selectedOption.props.className)
        : // @ts-expect-error
          selectedOption.props.className,
      'aria-hidden': true,
      'data-is-label': true,
    });

    return (
      <div
        className={clsx('select', styles('root'))}
        style={{userSelect: 'none', ...style}}
        data-disabled={disabled}
        ref={rootRef}
      >
        <select
          id={id}
          aria-label={props['aria-label']}
          disabled={disabled}
          onChange={(e) => {
            setSelected(e.target.value);
          }}
          value={selected}
          style={
            renderNativeSelect
              ? {
                  position: 'absolute',
                  opacity: 0,
                  width: '100%',
                  height: '100%',
                  zIndex: 1,
                }
              : selectStyle
          }
          onKeyDown={(e) =>
            !renderNativeSelect &&
            (e.key === ' ' ||
              e.key === 'Spacebar' ||
              e.key === 'Enter' ||
              e.key === 'ArrowDown' ||
              e.key === 'ArrowUp') &&
            toggleIsOpen.on()
          }
          ref={ref}
          {...props}
        >
          {React.Children.map(
            children,
            (
              child:
                | React.ReactElement<OptionProps>
                | React.ReactElement<OptGroupProps>
            ) => {
              if ('value' in child.props) {
                return (
                  <option key={child.props.value} value={child.props.value}>
                    {child.props.textValue ||
                      (typeof child.props.children === 'string'
                        ? child.props.children
                        : child.props.value)}
                  </option>
                );
              }

              return (
                <optgroup
                  label={
                    typeof child.props.label === 'object'
                      ? child.props.label.label
                      : child.props.label
                  }
                >
                  {React.Children.map(
                    child.props.children,
                    (child: React.ReactElement<OptionProps>) => {
                      return (
                        <option
                          key={child.props.value}
                          value={child.props.value}
                        >
                          {child.props.textValue ||
                            (typeof child.props.children === 'string'
                              ? child.props.children
                              : child.props.value)}
                        </option>
                      );
                    }
                  )}
                </optgroup>
              );
            }
          )}
        </select>

        {renderNativeSelect ? (
          labelElement
        ) : (
          <Dropdown.Root
            open={isOpen}
            onOpenChange={(open) => {
              if (innerRef.current?.matches(':disabled')) return;
              if (open) {
                toggleIsOpen.on();
              } else {
                toggleIsOpen.off();
              }
            }}
          >
            <Dropdown.Trigger
              className={clsx('select-label', styles('label'))}
              tabIndex={-1}
              aria-hidden
            >
              {labelElement}
            </Dropdown.Trigger>
            <Dropdown.Content
              align={align}
              alignOffset={alignOffset}
              side={side}
              sideOffset={sideOffset}
              disableOutsideScroll={false}
              style={{width: labelWidth}}
              className={clsx('select-menu', styles('menu'))}
              aria-hidden
            >
              <Dropdown.RadioGroup
                value={selected}
                onValueChange={(value) => {
                  setSelected(value);
                }}
                className={clsx('select-menu-options', styles('options'))}
              >
                {children}
              </Dropdown.RadioGroup>
            </Dropdown.Content>
          </Dropdown.Root>
        )}
      </div>
    );
  }),
  {
    Option: React.forwardRef<HTMLDivElement, OptionProps>(function Option(
      {as: As = Dropdown.RadioItem, className, textValue, ...props},
      ref
    ) {
      return (
        <As
          ref={ref as any}
          className={clsx('select-menu-option', className)}
          textValue={As !== Dropdown.RadioItem ? undefined : textValue}
          {...props}
        />
      );
    }),
    OptGroup: React.forwardRef<HTMLDivElement, OptGroupProps>(function OptGroup(
      {label, className, children, ...props},
      ref
    ) {
      return (
        <div
          ref={ref}
          className={clsx('select-menu-optgroup', className)}
          {...props}
        >
          {typeof label === 'object' ? (
            label.element
          ) : (
            <div className='select-menu-optgroup-label'>{label}</div>
          )}
          {children}
        </div>
      );
    }),
  }
);

export const selectStyles = styles({
  root: (t) => ({
    '> select:focus ~ .select-label': {
      boxShadow: t.shadow.outline,
    },

    '.select-label': {
      ...resetVendorButtonStyles,
      padding: `${t.pad.xs} ${t.pad.sm}`,
      borderRadius: t.radius.primary,
      backgroundColor: t.color.bodyBg,
      border: `${t.borderWidth.hairline} solid ${t.color.accent}`,
      width: '100%',
      height: '100%',
      textAlign: 'left',
    },

    '.select-menu': {
      backgroundColor: t.color.accent,
    },

    '.select-menu-option': {
      display: 'flex',
      alignItems: 'center',

      '> * + *': {
        marginLeft: t.gap.md,
        align: 'center',
      },
    },
  }),

  menu: (t) => ({
    backgroundColor: t.color.bodyBg,
    border: `${t.borderWidth.hairline} solid ${t.color.accent}`,
    boxShadow: t.shadow.sm,
    overflow: 'auto',
    maxHeight: '80vh',
    zIndex: t.zIndexes.max,

    '&[data-side="top"]': {
      borderRadius: `${t.radius.primary} ${t.radius.primary} 0 0`,
      bottom: `calc(-1 * ${t.radius.primary})`,

      '> *:first-child': {
        borderRadius: `${t.radius.primary} ${t.radius.primary} 0 0`,
        overflow: 'hidden',
      },
    },

    '&[data-side="bottom"]': {
      borderRadius: `0 0 ${t.radius.primary} ${t.radius.primary}`,
      top: `calc(-1 * ${t.radius.primary})`,

      '> *:last-child': {
        borderRadius: `0 0 ${t.radius.primary} ${t.radius.primary}`,
        overflow: 'hidden',
      },
    },

    '.select-label': {
      ...resetVendorButtonStyles,
      padding: `${t.pad.xs} ${t.pad.sm}`,
      width: '100%',
      height: '100%',
      textAlign: 'left',
    },

    '.select-menu-optgroup-label': {
      color: t.color.textAccent,
      padding: `${t.pad.xs} ${t.pad.sm} 0`,
      fontSize: t.font.size.xs,
    },

    '.select-menu-option': {
      display: 'flex',
      alignItems: 'center',
      cursor: 'default',
      padding: `${t.pad.xs} ${t.pad.sm}`,

      '> * + *': {
        marginLeft: t.gap.md,
        align: 'center',
      },

      ':focus': {
        backgroundColor: t.color.accent,
      },

      '&[data-state="checked"]': {
        '::before': {
          content: '""',
          position: 'absolute',
          left: `calc(-1 * ${t.borderWidth.hairline})`,
          top: 0,
          bottom: 0,
          right: 'auto',
          backgroundColor: t.color.primary,
          width: 4,
        },
      },
    },
  }),

  label: {},
  options: {},
});

const selectStyle: React.CSSProperties = {
  zIndex: -1,
  position: 'absolute',
  fontSize: '1rem',
  height: 0,
  minHeight: 0,
  width: 0,
  minWidth: 0,
  border: 'none',
  outline: 'none',
  MozAppearance: 'none',
  WebkitAppearance: 'none',
  WebkitBoxShadow: 'none',
  MozBoxShadow: 'none',
  backgroundImage: 'none',
  backgroundColor: 'transparent',
  boxShadow: 'none',
  appearance: 'none',
};

export interface SelectProps
  extends Pick<
    Dropdown.DropdownMenuContentOwnProps,
    'side' | 'sideOffset' | 'align' | 'alignOffset'
  > {
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  value?: string | undefined;
  defaultValue?: string | undefined;
  onChange?: (value: string | undefined) => void;
  disabled?: boolean;
  'aria-label'?: string;
  className?: string;
  native?: boolean;
  styles?: typeof selectStyles;
  style?: React.CSSProperties;
  children:
    | React.ReactElement<OptionProps>
    | React.ReactElement<OptGroupProps>
    | (React.ReactElement<OptGroupProps> | React.ReactElement<OptionProps>)[];
}

export interface OptGroupProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, 'children'> {
  label: string | {label: string; element: React.ReactNode};
  children: React.ReactElement<OptionProps> | React.ReactElement<OptionProps>[];
}

export interface OptionProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onSelect'>,
    RadioGroupItemOwnProps {
  as?: React.ElementType;
  textValue?: string;
  renderedAsLabel?: boolean;
  'data-is-label'?: boolean;
}
