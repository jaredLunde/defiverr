import * as React from 'react';
import {button} from '@/components/button';
import {Link} from '@/components/link';
import * as Sheet from '@/components/sheet';
import {WalletDialog} from '@/components/wallet-dialog';
import {box, layer, row} from '@/styles/layout';
import {text} from '@/styles/text';
import {logout, useViewer} from '@/viewer';
import type {ViewerQueryState} from '@/viewer';

export function Header() {
  const viewer = useViewer();

  return (
    <header
      className={row({
        align: 'center',
        distribute: 'between',
        pad: ['sm', 'md'],
        border: [['none', 'none', 'hairline'], 'accent'],
        z: 1,
      })}
    >
      <span
        className={text({
          font: 'brand',
          size: '3xl',
          color: 'blueGray900',
          tracking: 'tighter',
          leading: 'normal',
          weight: '700',
        })}
      >
        defiverr
      </span>

      <div
        className={layer({
          placement: 'center',
          display: {min: 'none', md: 'block'},
        })}
      >
        <nav className={row({gap: 'xl'})}>
          <Link
            className={text({
              weight: '500',
            })}
            variant='secondary'
            href='/'
          >
            Earn crypto
          </Link>
          <Link
            className={text({
              weight: '500',
            })}
            variant='secondary'
            href='/'
          >
            Find talent
          </Link>
          <Link
            className={text({
              weight: '500',
            })}
            variant='secondary'
            href='/'
          >
            About
          </Link>
        </nav>
      </div>

      {viewer.data ? (
        <LoggedInMenu viewer={viewer} />
      ) : (
        <WalletDialog pageProps={{}}>
          <button className={button('primary')}>Connect wallet</button>
        </WalletDialog>
      )}
    </header>
  );
}

function LoggedInMenu({viewer}: {viewer: ViewerQueryState}) {
  if (!viewer.data) return null;
  return (
    <React.Fragment>
      <div className={box({display: {min: 'block', md: 'none'}})}>
        <Sheet.Root>
          <Sheet.Trigger>{viewer.data.walletAddress}</Sheet.Trigger>
          <Sheet.Overlay
            className={layer({
              position: 'fixed',
              inset: 0,
              bg: 'translucentDark',
              placement: 'topLeft',
            })}
          />
          <Sheet.Content placement='right'>
            <div className={box({bg: 'white', pad: 'xl'})}></div>
          </Sheet.Content>
        </Sheet.Root>
      </div>

      <div className={box({display: {min: 'none', md: 'block'}})}>
        <Sheet.Root>
          <Sheet.Trigger>{viewer.data.walletAddress}</Sheet.Trigger>
          <Sheet.Overlay
            className={layer({
              position: 'fixed',
              inset: 0,
              bg: 'translucentDark',
              placement: 'topLeft',
            })}
          />
          <Sheet.Content placement='right'>
            <div className={box({bg: 'white', pad: 'xl'})}></div>
          </Sheet.Content>
        </Sheet.Root>
      </div>
    </React.Fragment>
  );
}
