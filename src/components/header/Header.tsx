import {
  ActionIcon,
  Header as MantineHeader,
  HeaderProps,
  useMantineColorScheme,
} from '@mantine/core';
import React from 'react';
import { MoonStars, Sun } from 'tabler-icons-react';

import { Logo } from '../logo';

export const Header = (props: Omit<HeaderProps, 'children'>) => {
  const { colorScheme, toggleColorScheme } = useMantineColorScheme();

  return (
    <MantineHeader {...props}>
      <div className="flex h-full items-center justify-between px-5">
        <a
          href="https://www.skydropx.com/"
          target="_blank"
          rel="noreferrer"
          className="flex items-center"
        >
          <Logo colorScheme={colorScheme} />
        </a>
        <ActionIcon variant="default" onClick={() => toggleColorScheme()}>
          {colorScheme === 'dark' ? <Sun size={16} /> : <MoonStars size={16} />}
        </ActionIcon>
      </div>
    </MantineHeader>
  );
};
