import * as Dialog from '@radix-ui/react-dialog';
import clsx from 'clsx';
import * as React from 'react';
import {responsiveStyles} from '@/styles';
import type {ResponsiveProp} from '@/styles';

export const Root = Dialog.Root;
export const Trigger = Dialog.Trigger;
export const Overlay = Dialog.Overlay;
export const Close = Dialog.Close;
export const Content = React.forwardRef<HTMLDivElement, SheetContentProps>(
  function SheetContent({placement, className, children, ...props}, ref) {
    return (
      <Dialog.Content
        className={clsx(className, drawerContent(placement))}
        ref={ref}
        {...props}
      >
        {children}
      </Dialog.Content>
    );
  }
);

const drawerContent = responsiveStyles({
  default: (t) => ({
    '&[data-state="closed"]': {
      visibility: 'hidden',
    },
    '&[data-state="open"]': {
      visibility: 'visible',
      transform: 'translate3d(0, 0, 0)',
    },
  }),
  top: {
    position: 'fixed',
    top: 0,
    right: 0,
    bottom: 'auto',
    left: 0,

    '&[data-state="closed"]': {
      transform: 'translate3d(0, -100%, 0)',
    },
  },
  right: {
    position: 'fixed',
    top: 0,
    right: 0,
    bottom: 0,
    left: 'auto',

    '&[data-state="closed"]': {
      transform: 'translate3d(100%, 0, 0)',
    },
  },
  bottom: {
    position: 'fixed',
    top: 'auto',
    right: 0,
    bottom: 0,
    left: 0,

    '&[data-state="closed"]': {
      transform: 'translate3d(0, 100%, 0)',
    },
  },
  left: {
    position: 'fixed',
    top: 0,
    right: 'auto',
    bottom: 0,
    left: 0,

    '&[data-state="closed"]': {
      transform: 'translate3d(-100%, 0, 0)',
    },
  },
});

export interface SheetContentProps
  extends Dialog.DialogContentOwnProps,
    React.HTMLAttributes<HTMLDivElement> {
  placement: ResponsiveProp<'top' | 'right' | 'bottom' | 'left'>;
}
