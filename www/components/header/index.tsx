import * as React from 'react';
import {button} from '@/components/button';
import {Link} from '@/components/link';
import {WalletDialog} from '@/components/wallet-dialog';
import {layer, row} from '@/styles/layout';
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
        // border: [['none', 'none', 'hairline'], 'accent'],
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

      <div className={layer({placement: 'center'})}>
        <nav className={row({gap: 'xl'})}>
          <Link
            className={text({
              weight: '600',
            })}
            variant='secondary'
            href='/'
          >
            Earn crypto
          </Link>
          <Link
            className={text({
              weight: '600',
            })}
            variant='secondary'
            href='/'
          >
            Hire freelancers
          </Link>
          <Link
            className={text({
              weight: '600',
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
  return <button onClick={logout}>{viewer.data.walletAddress}</button>;
}
