import * as Dialog from '@radix-ui/react-dialog';
import {Slot} from '@radix-ui/react-slot';
import {useAsync} from '@react-hook/async';
import clsx from 'clsx';
import * as React from 'react';
import Eth from 'web3-eth';
import {loaderElement, resetVendorButtonStyles} from '@/components/button';
import {Icon} from '@/components/icon';
import {Link} from '@/components/link';
import {withUrqlClient} from '@/graphql/client';
import {useUrqlError} from '@/graphql/errors';
import {useLogInMutation} from '@/graphql/hooks';
import {mq, styles} from '@/styles';
import {box, column, layer} from '@/styles/layout';
import {text} from '@/styles/text';
import {hasMetaMask} from '@/utils/has-metamask';
import {useViewer} from '@/viewer';

export const WalletDialog = withUrqlClient(function WalletDialog({
  open,
  defaultOpen,
  onOpenChange,
  children,
}: WalletDialogProps) {
  const [logInMutation, logIn] = useLogInMutation();
  const [requesting, requestAccounts] = useAsync(async () => {
    const eth = new Eth(Eth.givenProvider);
    const account: string = eth.accounts[0];

    if (account) {
      const {data} = await logIn({walletAddress: account});

      if (data && data.logIn) {
        const msg = `Welcome to defivver! Sign this message to prove you have access to this wallet. This won’t cost you any Ether.\n\nTo stop hackers from using your wallet, here’s a unique message ID they can’t guess: ${data.logIn.nonce}`;
        const signature = await eth.personal.sign(msg, account);
        console.log('Signature!', signature);
      }
    }

    return null;
  });

  useUrqlError(logInMutation, {
    'wallet.invalidAddress': {
      subject: 'Invalid wallet address',
      message: 'The provided wallet address was invalid or unsupported',
    },
  });

  React.useEffect(() => {
    // if (logInMutation.data?.logIn) {
    //   useViewer.dispatch('setViewer', logInMutation.data.logIn as any);
    // }
  }, [logInMutation.data?.logIn]);

  return (
    <Dialog.Root
      open={open}
      defaultOpen={defaultOpen}
      onOpenChange={onOpenChange}
    >
      <Dialog.Overlay
        className={layer({
          position: 'fixed',
          inset: 0,
          bg: 'translucentDark',
          placement: 'topLeft',
        })}
        style={{zIndex: -1}}
      />

      {children && <Dialog.Trigger as={Slot}>{children}</Dialog.Trigger>}

      <Dialog.Content as='section' className={dialogContent()}>
        <Dialog.Close
          className={clsx(
            layer({placement: 'topRight', z: 'low'}),
            closeButton()
          )}
        >
          <Icon src='/icons/x.svg' size='1.5em' />
        </Dialog.Close>

        <header
          className={column({
            pad: 'lg',
            gap: 'lg',
            radius: ['primary', 'primary', 'none', 'none'],
          })}
        >
          <h1 className={text({font: 'brand', size: '4xl', weight: '600'})}>
            Connect your wallet
          </h1>
          <h2
            className={clsx(
              box({width: 300}),
              text({
                size: 'xs',
                color: 'textAccent',
                weight: '500',
                leading: 'snug',
              })
            )}
            style={{marginLeft: 'auto', marginRight: 'auto'}}
          >
            By connecting your wallet, you agree to our <b>Terms of Service</b>{' '}
            and our <b>Privacy Policy</b>.
          </h2>
        </header>

        <div className={column({pad: ['none', 'lg', 'none'], gap: 'md'})}>
          <button
            className={providerButton()}
            disabled={requesting.status === 'loading'}
            onClick={() => {
              if (hasMetaMask()) {
                requestAccounts();
              }
            }}
          >
            <div
              className={clsx(
                layer({placement: 'left'}),
                box({pad: ['xs'], bg: 'white', radius: 'full'})
              )}
              style={{marginLeft: 12}}
            >
              <img
                src='/images/metamask.png'
                aria-hidden
                width='32'
                height='32'
              />
            </div>

            {requesting.status === 'loading' ? (
              <span>{loaderElement}</span>
            ) : (
              <span>Connect to MetaMask</span>
            )}
          </button>
        </div>

        <div
          className={column({
            pad: 'lg',
            radius: ['none', 'none', 'primary', 'primary'],
          })}
        >
          <p
            className={text({
              font: 'brand',
              size: '2xl',
              align: 'center',
              weight: '600',
            })}
          >
            New to Ethereum wallets?
          </p>
          <Link href='/'>Learn how to use wallets in the browser</Link>
        </div>
      </Dialog.Content>
    </Dialog.Root>
  );
});

const dialogContent = styles.one(
  mq({
    default: (t) => ({
      textAlign: 'center',
      boxShadow: t.shadow['2xl'],
      backgroundColor: t.color.white,
    }),
    min: {
      position: 'fixed',
      bottom: 0,
      left: 0,
      right: 0,
      width: '100%',
    },
    sm: (t) => ({
      width: 400,
      left: '50%',
      top: '50%',
      bottom: 'auto',
      transform: 'translate(-50%, -50%)',
      borderRadius: t.radius.primary,
    }),
  })
);

const providerButton = styles.one(
  mq({
    default: (t) => ({
      ...resetVendorButtonStyles,
      display: 'flex',
      justifyContent: 'center',
      padding: t.pad.md,
      // border: `${t.borderWidth.hairline} solid ${t.color.blueGray300}`,
      backgroundColor: t.color.indigo600,
      borderRadius: t.radius.full,
      color: t.color.white,
      fontSize: t.font.size.base,
      fontWeight: 600,

      ':focus-visible': {
        boxShadow: t.shadow.outline,
      },
    }),
    hover: (t) => ({
      '&:hover': {
        backgroundColor: t.color.primaryHover,
      },
      '&:active': {
        backgroundColor: t.color.primaryActive,
      },
    }),
  })
);

const closeButton = styles.one(
  mq({
    default: (t) => ({
      ...resetVendorButtonStyles,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      height: 32,
      width: 32,
      border: `${t.borderWidth.hairline} solid ${t.color.blueGray300}`,
      borderRadius: t.radius.full,
      margin: t.pad.md,
      color: t.color.textAccentLight,

      ':focus-visible': {
        boxShadow: t.shadow.outline,
      },
    }),
    hover: (t) => ({
      '&:hover': {
        backgroundColor: t.color.blueGray50,
      },

      '&:active': {
        backgroundColor: t.color.blueGray100,
      },
    }),
  })
);

export interface WalletDialogProps {
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  children?: React.ReactNode;
}
