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
        <Link href="/" passHref aria-label="homepage">
          <Anchor>
            <span className="!absolute m-0 h-[1px] w-[1px] overflow-hidden whitespace-nowrap border-0 p-0">
              Homepage
            </span>
            <Logo colorScheme={colorScheme} />
          </Anchor>
        </Link>
        <ActionIcon
          variant="default"
          onClick={() => toggleColorScheme()}
          aria-label={`set ${colorScheme === 'dark' ? 'light' : 'dark'} theme`}
        >
          {colorScheme === 'dark' ? <Sun size={16} /> : <MoonStars size={16} />}
        </ActionIcon>
      </div>
    </MantineHeader>
  );
};
