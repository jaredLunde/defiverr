import * as React from 'react';
import {column} from '@/styles/layout';

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
