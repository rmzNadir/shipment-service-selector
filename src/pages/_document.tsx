import { createGetInitialProps } from '@mantine/next';
// @ts-expect-error
import { abortableFetch } from 'abortcontroller-polyfill/dist/cjs-ponyfill';
import Document, { Head, Html, Main, NextScript } from 'next/document';
import fetch from 'node-fetch';

global.fetch = abortableFetch(fetch).fetch;
const getInitialProps = createGetInitialProps();

// Need to create a custom _document because i18n support is not compatible with `next export`.

// eslint-disable-next-line @typescript-eslint/naming-convention
export default class _Document extends Document {
  static getInitialProps = getInitialProps;

  // eslint-disable-next-line class-methods-use-this
  render() {
    return (
      <Html lang="en">
        <Head />
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
