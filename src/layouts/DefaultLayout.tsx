import { AppShell, MantineTheme } from '@mantine/core';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { NextSeo } from 'next-seo';
import { ReactNode } from 'react';

import { Header } from '@/components';

const HEADER_HEIGHT = 70;

interface DefaultLayoutProps {
  children: ReactNode;
  title: string;
  description: string;
  canonical?: string;
}

const getAppShellStyles = (theme: MantineTheme) => ({
  main: {
    backgroundColor:
      theme.colorScheme === 'dark'
        ? theme.colors.dark[8]
        : theme.colors.gray[0],
    height: `calc(100vh - ${HEADER_HEIGHT}px)`,
  },
});

export const DefaultLayout = ({
  children,
  title,
  description,
  canonical,
}: DefaultLayoutProps) => {
  const router = useRouter();

  return (
    <>
      <Head>
        <meta charSet="UTF-8" key="charset" />
        <meta
          name="viewport"
          content="width=device-width,initial-scale=1"
          key="viewport"
        />
        <link
          rel="apple-touch-icon"
          href={`${router.basePath}/apple-touch-icon.png`}
          key="apple"
        />
        <link
          rel="icon"
          href={`${router.basePath}/favicon.ico`}
          key="favicon"
        />
      </Head>
      <NextSeo
        title={title}
        description={description}
        canonical={canonical}
        openGraph={{
          title,
          description,
          url: canonical,
          locale: 'en',
          site_name: 'Shipment Service Selector',
        }}
      />

      <AppShell
        padding="xl"
        header={<Header height={HEADER_HEIGHT} p="xs" />}
        styles={getAppShellStyles}
      >
        {children}
      </AppShell>
    </>
  );
};
