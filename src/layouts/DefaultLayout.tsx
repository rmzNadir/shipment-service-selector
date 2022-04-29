import { AppShell, MantineTheme, useMantineTheme } from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { NextSeo } from 'next-seo';
import { ReactNode, useEffect, useState } from 'react';

import { Header, Navbar } from '@/components';

const HEADER_HEIGHT = 70;

interface DefaultLayoutProps {
  children: ReactNode;
  title?: string;
  description?: string;
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
  title = 'Shipment Service Selector',
  description = 'Find the best shipping service for your needs',
  canonical,
}: DefaultLayoutProps) => {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const { breakpoints } = useMantineTheme();
  const isSmallScreen = useMediaQuery(`(max-width: ${breakpoints.sm}px)`);

  useEffect(() => {
    // reset open state on screen size change
    setIsOpen(false);
  }, [isSmallScreen]);

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
        classNames={{
          main: 'overflow-auto',
        }}
        fixed
        header={
          <Header
            height={HEADER_HEIGHT}
            p="xs"
            setIsOpen={setIsOpen}
            isOpen={isOpen}
          />
        }
        styles={getAppShellStyles}
        navbar={
          <Navbar
            visible={!isSmallScreen || isOpen}
            onClose={() => setIsOpen(false)}
          />
        }
      >
        {children}
      </AppShell>
    </>
  );
};
