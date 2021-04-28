import * as React from 'react';
import {column, layer} from '@/styles/layout';

export function Hero({children}: {children: React.ReactNode}) {
  return (
    <section
      className={column({
        pad: {min: ['xl', 'lg'], sm: 'xl'},
        distribute: 'center',
        align: 'center',
      })}
    >
      <div className={column({width: '100%', align: 'center'})}>{children}</div>
    </section>
  );
}

const colored = (
  <React.Fragment>
    <div
      className={layer({
        bg: 'indigo100',
        radius: 'full',
        placement: 'bottomLeft',
        width: '67%',
        height: '70%',
        offset: -64,
        z: 'min',
      })}
      style={{filter: 'blur(56px)'}}
    />
    <div
      className={layer({
        bg: 'lightBlue100',
        radius: 'full',
        placement: 'bottomRight',
        width: '40%',
        height: '80%',
        offset: -128,
        z: 'min',
      })}
      style={{filter: 'blur(56px)'}}
    />

    <div
      className={layer({
        bg: 'lightBlue100',
        radius: 'full',
        placement: 'center',
        width: '50%',
        height: '80%',
        z: 'min',
      })}
      style={{filter: 'blur(56px)'}}
    />
  </React.Fragment>
);
