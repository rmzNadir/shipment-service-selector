import { ColorScheme } from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';
import React from 'react';

import { DarkLogo } from './DarkLogo';
import { LightLogo } from './LightLogo';

interface LogoProps {
  colorScheme: ColorScheme;
}

export const Logo = ({ colorScheme }: LogoProps) => {
  // tailwindcss sm breakpoint
  const isExtraSmallScreen = useMediaQuery(`(max-width: 640px)`, true);

  if (colorScheme === 'dark') {
    return <LightLogo isExtraSmallScreen={isExtraSmallScreen} />;
  }

  return <DarkLogo isExtraSmallScreen={isExtraSmallScreen} />;
};
