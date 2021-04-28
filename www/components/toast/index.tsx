import * as React from 'react';
import {resetVendorButtonStyles} from '@/components/button';
import {Icon} from '@/components/icon';
import {createImmerStore} from '@/stores';
import {styles} from '@/styles';
import {column, layer} from '@/styles/layout';
import {text} from '@/styles/text';

export function Toast() {
  const toasts = useToastStore((state) => state.toasts);

  return (
    <div
      aria-live='polite'
      aria-atomic='true'
      style={{pointerEvents: 'none'}}
      className={layer({
        offset: 24,
        placement: 'bottom',
        z: 'max',
        width: 460,
        maxWidth: '90vw',
        position: 'fixed',
      })}
    >
      <div className={column({gap: 'md'})}>
        {toasts.map((item) => (
          <div
            key={item.id}
            role='alert'
            onMouseEnter={() => useToastStore.dispatch('pause', item.id)}
            onMouseLeave={() => useToastStore.dispatch('start', item.id)}
            className={toastStyles(item.variant)}
          >
            <div className='icon'>
              <Icon size='1.25em' src={variantIcon[item.variant]} />
            </div>

            <div style={{pointerEvents: 'auto'}}>
              <div>
                {item.subject && (
                  <strong
                    className={text({
                      weight: '500',
                      size: 'base',
                      leading: 'normal',
                    })}
                  >
                    {item.subject}
                  </strong>
                )}
              </div>
              <p className={text({leading: 'tight'})}>{item.message}</p>
            </div>

            <button
              className='close'
              aria-label='Close this alert'
              onClick={() => useToastStore.dispatch('remove', item.id)}
            >
              <Icon src='/icons/x.svg' />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

const variantIcon = {
  success: '/icons/check-circle.svg',
  info: '/icons/info.svg',
  danger: '/icons/x-circle.svg',
  warn: '/icons/alert-circle.svg',
} as const;

const popUp = styles.keyframes({
  from: {
    opacity: 0,
    transform:
      'perspective(100px) translate3d(0, -50%, 0px) scale(1.1) rotateX(24deg)',
    transformOrigin: 'top',
    transformStyle: 'preserve-3d',
  },

  to: {
    opacity: 1,
    transform:
      'perspective(40px) translate3d(0, 0, 0px) scale(1) rotateX(0deg)',
  },
});

const toastStyles = styles({
  default: (t) => ({
    display: 'grid',
    gap: t.gap.lg,
    gridTemplateColumns: 'min-content minmax(0, 1fr) min-content',
    borderRadius: t.radius.primary,
    padding: `${t.pad.sm} 0 ${t.pad.md} ${t.pad.md}`,
    backgroundColor: t.color.primary,
    boxShadow: t.shadow.lg,
    color: t.color.white,
    width: 460,
    maxWidth: '90vw',
    animation: `${popUp} 500ms ${t.transition.timing.bounce}`,

    'button.close': {
      ...resetVendorButtonStyles,
      display: 'flex',
      alignItems: ' flex-start',
      pointerEvents: 'auto',
      padding: `${t.pad.xs} ${t.pad.md} ${t.pad.xs}`,
      margin: 0,
    },

    '.icon': {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      top: 3,
      color: t.color.white,
      width: '1.25em',
      height: '1.25em',
      borderRadius: t.radius.full,
      backgroundColor: 'transparent',
      boxShadow: t.shadow.sm,
    },

    a: {
      color: t.color.text,

      ':hover': {
        color: t.color.text,
        textDecoration: 'underline',
      },
    },
  }),
  success: (t) => ({
    backgroundColor: t.color.teal600,
  }),
  danger: (t) => ({
    backgroundColor: t.color.rose500,
  }),
  warn: (t) => ({
    backgroundColor: t.color.amber600,
  }),
  info: {},
});

const useToastStore = createImmerStore({
  state: (): ToastsStoreState => ({
    toasts: [],
  }),

  mutations: {
    add(draft, value: ToastsStoreState['toasts'][0]) {
      draft.toasts.unshift(value);
    },

    pause(draft, value: number) {
      const toast = draft.toasts.find((toast) => toast.id === value);
      if (!toast) return;
      window.clearTimeout(toast.timeout);
      toast.ttl = toast.ttl - (Date.now() - toast.startedAt);
    },

    start(draft, value: number) {
      const toast = draft.toasts.find((toast) => toast.id === value);
      if (!toast) return;
      toast.timeout = window.setTimeout(
        () => dispatch('remove', value),
        toast.ttl
      );
      toast.startedAt = Date.now();
    },

    remove(draft, value: number) {
      draft.toasts = draft.toasts.filter((toast) => toast.id !== value);
    },
  },
});

const dispatch = useToastStore.dispatch;

type ToastsStoreState = {
  toasts: (Toast & {
    id: number;
    timeout: number;
    startedAt: number;
    ttl: number;
  })[];
};

type Toast = {
  variant: 'success' | 'danger' | 'warn' | 'info';
  subject?: React.ReactNode;
  message: React.ReactNode;
};

let ID = 0;

export function toast({ttl = 6500, ...toast}: Toast & {ttl?: number}) {
  if (typeof window === 'undefined') {
    return;
  }

  const id = ID++;
  const timeout = window.setTimeout(
    () => useToastStore.dispatch('remove', id),
    ttl
  );

  useToastStore.dispatch('add', {
    id,
    timeout,
    startedAt: Date.now(),
    ttl,
    ...toast,
  });
}
