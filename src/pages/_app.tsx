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

// opts us out of atomatic static optimization (SSG default is replaced by SSR)
// which impacts performance a little bit but allows proper color scheme to load
// without flashing https://stackoverflow.com/questions/71400494/flash-of-unstyled-content-fouc-for-nextjs-using-mantine
AppWithRedux.getInitialProps = ({
  ctx,
}: {
  ctx: GetServerSidePropsContext;
}) => ({
  colorScheme: getCookie('mantine-color-scheme', ctx) || 'dark',
});

export default AppWithRedux;
