import * as React from 'react';
import {column, layer} from '@/styles/layout';

export function Hero({children}: {children: React.ReactNode}) {
  return (
    <div
      className={column({
        pad: 'xl',
        distribute: 'center',
        align: 'center',
        height: 600,
      })}
      style={{overflow: 'hidden'}}
    >
      <div style={{zIndex: 1}}>{children}</div>

      <div
        className={layer({
          bg: 'purple100',
          radius: 'full',
          placement: 'bottomLeft',
          width: '67%',
          height: '55%',
          offset: -64,
        })}
        style={{filter: 'blur(56px)'}}
      />

      <div
        className={layer({
          bg: 'lightBlue50',
          radius: 'full',
          placement: 'topLeft',
          width: '60%',
          height: '90%',
          offset: -128,
        })}
        style={{filter: 'blur(56px)'}}
      />

      <div
        className={layer({
          bg: 'indigo50',
          radius: 'full',
          placement: 'topRight',
          width: '60%',
          height: '90%',
          offset: -128,
        })}
        style={{filter: 'blur(56px)'}}
      />

      <div
        className={layer({
          bg: 'lightBlue200',
          radius: 'full',
          placement: 'bottomRight',
          width: '40%',
          height: '80%',
          offset: -128,
        })}
        style={{filter: 'blur(56px)'}}
      />

      <div
        className={layer({
          bg: 'lightBlue100',
          radius: 'full',
          placement: 'center',
          width: '60%',
          height: '80%',
        })}
        style={{filter: 'blur(56px)'}}
      />

      {/*<LayerItem placement='right' offset={48}>
          <LayerItem
            radius='full'
            bg='blue100'
            placement='center'
            width='540'
            height='540'
            style={{filter: 'blur(24px)'}}
          ></LayerItem>
          <img
            src='/illustrations/people-on-computer.svg'
            width={640}
            style={{transform: 'rotate(4deg)'}}
          />
            </LayerItem>*/}
    </div>
  );
}
