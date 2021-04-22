import * as React from 'react';
import Document from 'next/document';
import type {DocumentContext} from 'next/document';
import {Style} from '@dash-ui/react/server';
import {styles} from '@/styles';

export default class MyDocument extends Document {
  static async getInitialProps(ctx: DocumentContext) {
    const initialProps = await Document.getInitialProps(ctx);

    return Object.assign(initialProps, {
      styles: (
        <React.Fragment>
          <Style html={initialProps.html} styles={styles} />
        </React.Fragment>
      ),
    });
  }
}
