import '../styles/global.css';

import {
  ColorScheme,
  ColorSchemeProvider,
  MantineProvider,
} from '@mantine/core';
import { NotificationsProvider } from '@mantine/notifications';
import { getCookie, setCookies } from 'cookies-next';
import { GetServerSidePropsContext } from 'next';
import { AppProps } from 'next/app';
import { useState } from 'react';

import { wrapper } from '@/store';

export function App(props: AppProps & { colorScheme: ColorScheme }) {
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
    <ColorSchemeProvider
      colorScheme={colorScheme}
      toggleColorScheme={toggleColorScheme}
    >
      <MantineProvider
        withGlobalStyles
        withNormalizeCSS
        theme={{ colorScheme }}
      >
        <NotificationsProvider position="top-center">
          {/* @ts-expect-error */}
          <Component {...pageProps} />
        </NotificationsProvider>
      </MantineProvider>
    </ColorSchemeProvider>
  );
}

const AppWithRedux = wrapper.withRedux(App);

AppWithRedux.getInitialProps = ({
  ctx,
}: {
  ctx: GetServerSidePropsContext;
}) => ({
  colorScheme: getCookie('mantine-color-scheme', ctx) || 'dark',
});

export default AppWithRedux;
