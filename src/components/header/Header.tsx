import {
  ActionIcon,
  Anchor,
  Header as MantineHeader,
  HeaderProps,
  useMantineColorScheme,
} from '@mantine/core';
import Link from 'next/link';
import React from 'react';
import { MoonStars, Sun } from 'tabler-icons-react';

import { Logo } from '../logo';

export const Header = (props: Omit<HeaderProps, 'children'>) => {
  const { colorScheme, toggleColorScheme } = useMantineColorScheme();

  return (
    <MantineHeader {...props}>
      <div className="flex h-full items-center justify-between px-5">
        <Link href="/" passHref>
          <Anchor>
            <Logo colorScheme={colorScheme} />
          </Anchor>
        </Link>
        <ActionIcon variant="default" onClick={() => toggleColorScheme()}>
          {colorScheme === 'dark' ? <Sun size={16} /> : <MoonStars size={16} />}
        </ActionIcon>
      </div>
    </MantineHeader>
  );
};
