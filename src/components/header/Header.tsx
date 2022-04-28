import {
  ActionIcon,
  Anchor,
  Burger,
  Header as MantineHeader,
  HeaderProps as MantineHeaderProps,
  MediaQuery,
  useMantineColorScheme,
  useMantineTheme,
} from '@mantine/core';
import Link from 'next/link';
import React, { Dispatch, SetStateAction } from 'react';
import { MoonStars, Sun } from 'tabler-icons-react';

import { Logo } from '../logo';

interface HeaderProps extends Omit<MantineHeaderProps, 'children'> {
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  isOpen: boolean;
}

export const Header = ({ setIsOpen, isOpen, ...props }: HeaderProps) => {
  const { colorScheme, toggleColorScheme } = useMantineColorScheme();
  const { colors } = useMantineTheme();

  return (
    <MantineHeader {...props}>
      <div className="flex h-full items-center justify-between gap-4 px-4">
        <MediaQuery largerThan="sm" styles={{ display: 'none' }}>
          <Burger
            opened={isOpen}
            onClick={() => setIsOpen((o) => !o)}
            size="sm"
            color={colors.gray[6]}
          />
        </MediaQuery>
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
