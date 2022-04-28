import {
  Navbar as MantineNavbar,
  Text,
  ThemeIcon,
  Transition,
  UnstyledButton,
} from '@mantine/core';
import Link from 'next/link';
import React, { ReactNode } from 'react';
import { Plus } from 'tabler-icons-react';

import { useHorizontalSwipe } from '@/hooks/useHorizontalSwipe';

const LINKS = [
  {
    icon: <Plus size={16} />,
    color: 'blue',
    label: 'Create shipment',
    href: '/',
  },
];

export interface NavbarProps {
  visible: boolean;
  onClose(): void;
}

export const Navbar = ({ visible, onClose }: NavbarProps) => {
  const touchProps = useHorizontalSwipe(onClose);

  return (
    <Transition
      mounted={visible}
      transition="slide-right"
      duration={200}
      timingFunction="ease"
    >
      {(styles) => (
        <MantineNavbar
          {...touchProps}
          style={styles}
          className="p-4"
          width={{ sm: 250, lg: 300 }}
        >
          <MantineNavbar.Section grow>
            {LINKS.map((link) => (
              <NavbarLink {...link} key={link.label} onClick={onClose} />
            ))}
          </MantineNavbar.Section>
        </MantineNavbar>
      )}
    </Transition>
  );
};

export interface NavbarLinkProps {
  icon: ReactNode;
  color: string;
  label: string;
  href: string;
  onClick(): void;
}

const NavbarLink = ({ icon, color, label, href, onClick }: NavbarLinkProps) => {
  return (
    <Link href={href} passHref>
      <UnstyledButton
        onClick={onClick}
        component="a"
        aria-label={label}
        sx={(theme) => ({
          display: 'block',
          width: '100%',
          padding: theme.spacing.sm,
          borderRadius: theme.radius.sm,
          color:
            theme.colorScheme === 'dark' ? theme.colors.dark[0] : theme.black,
          '&:hover': {
            backgroundColor:
              theme.colorScheme === 'dark'
                ? theme.colors.dark[6]
                : theme.colors.gray[0],
          },
        })}
      >
        <div className="flex items-center gap-4">
          <ThemeIcon color={color} variant="light">
            {icon}
          </ThemeIcon>

          <Text size="sm">{label}</Text>
        </div>
      </UnstyledButton>
    </Link>
  );
};
