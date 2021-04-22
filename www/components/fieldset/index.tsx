import * as React from 'react';
import clsx from 'clsx';
import * as VisuallyHidden from '@radix-ui/react-visually-hidden';
import {responsiveStyles, mq, styles} from '@/styles';
import type {ResponsiveProp} from '@/styles';

export const Fieldset = Object.assign(
  React.forwardRef<HTMLFieldSetElement, FieldsetProps>(function Fieldset(
    {variant = 'column', className, ...props},
    ref
  ) {
    return (
      <fieldset
        className={clsx(className, fieldset(variant))}
        ref={ref}
        {...props}
      />
    );
  }),
  {
    Legend: React.forwardRef<HTMLDivElement, LegendProps>(function Legend(
      {className, children, ...props},
      ref
    ) {
      return (
        <React.Fragment>
          <VisuallyHidden.Root as='legend'>{children}</VisuallyHidden.Root>
          <div
            aria-hidden
            className={clsx(className, legend())}
            ref={ref}
            {...props}
          >
            {children}
          </div>
        </React.Fragment>
      );
    }),
  }
);

const fieldset = responsiveStyles({
  default: {
    display: 'grid',
    border: 0,
    padding: 0,
    minWidth: 0,
    width: '100%',

    'body:not(:-moz-handler-blocked) &': {
      display: 'grid',
    },

    '&[disabled]': {
      opacity: 0.5,
    },
  },

  column: (t) => ({
    gridTemplateColumns: '1fr',
    gap: t.gap.lg,
  }),

  row: mq({
    min: (t) => ({
      gridTemplateColumns: '1fr',
      gap: t.gap.lg,
      alignItems: 'start',
    }),
    sm: {
      gridTemplateColumns: '1fr 1fr',
    },
    lg: (t) => ({
      gap: t.gap.xl,
    }),
  }),
});

const legend = styles.one((t) => ({
  float: 'left',
  width: 'auto',
  padding: 0,
  margin: 0,

  '+ *': {
    clear: 'left',
  },

  h2: {
    fontSize: t.font.size.lg,
    fontWeight: 500,
  },
  h3: {
    fontSize: t.font.size.sm,
    fontWeight: 700,
  },
  p: {
    fontSize: t.font.size.sm,
    lineHeight: t.font.leading.snug,
    color: t.color.textAccent,
  },
}));

export interface FieldsetProps
  extends React.FieldsetHTMLAttributes<HTMLFieldSetElement> {
  variant?: ResponsiveProp<'column' | 'row'>;
}

export interface LegendProps extends React.HTMLAttributes<HTMLDivElement> {}
