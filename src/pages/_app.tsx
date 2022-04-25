import '../styles/global.css';

import {
  ColorScheme,
  ColorSchemeProvider,
  MantineProvider,
} from '@mantine/core';
import { getCookie, setCookies } from 'cookies-next';
import { GetServerSidePropsContext } from 'next';
import { AppProps } from 'next/app';
import { useState } from 'react';
import { Provider } from 'react-redux';

import { store } from '@/store';

export default function App(props: AppProps & { colorScheme: ColorScheme }) {
  const { Component, pageProps, colorScheme: colorSchemeProp } = props;
  const [colorScheme, setColorScheme] = useState<ColorScheme>(colorSchemeProp);

  const toggleColorScheme = (value?: ColorScheme) => {
    const nextColorScheme =
      value || (colorScheme === 'dark' ? 'light' : 'dark');
    setColorScheme(nextColorScheme);
    setCookies('mantine-color-scheme', nextColorScheme, {
      maxAge: 60 * 60 * 24 * 30,
    });
  };

  return (
    <Provider store={store}>
      <ColorSchemeProvider
        colorScheme={colorScheme}
        toggleColorScheme={toggleColorScheme}
      >
        <MantineProvider
          withGlobalStyles
          withNormalizeCSS
          theme={{ colorScheme }}
        >
          {/* @ts-expect-error */}
          <Component {...pageProps} />
        </MantineProvider>
      </ColorSchemeProvider>
    </Provider>
  );
}

App.getInitialProps = ({ ctx }: { ctx: GetServerSidePropsContext }) => ({
  colorScheme: getCookie('mantine-color-scheme', ctx) || 'light',
});
