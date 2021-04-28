import type {DashTokens, StyleMap} from '@dash-ui/styles';
import * as Separator from '@radix-ui/react-separator';
import clsx from 'clsx';
import * as React from 'react';
import type {ResponsiveProp} from '@/styles';
import {responsiveStyles, tokens} from '@/styles';

export const Divider = React.forwardRef<HTMLDivElement, DividerProps>(
  function Divider({className, color, ...props}, ref) {
    return (
      <Separator.Root
        ref={ref}
        className={clsx(className, divider(color))}
        {...props}
      />
    );
  }
);

export interface DividerProps
  extends Omit<React.HTMLAttributes<HTMLSpanElement>, 'color'>,
    Separator.SeparatorOwnProps {
  color?: ResponsiveProp<keyof DashTokens['color']>;
}

export const divider = responsiveStyles({
  default: (t) => ({
    width: '100%',
    height: t.borderWidth.hairline,
    backgroundColor: t.color.accent,
  }),
  ...(Object.keys(tokens.color) as (keyof DashTokens['color'])[]).reduce<
    Partial<StyleMap<keyof DashTokens['color']>>
  >((obj, key) => {
    obj[key] = ({color}) =>
      ({
        backgroundColor: color[key],
      } as any);

    return obj;
  }, {}),
});
