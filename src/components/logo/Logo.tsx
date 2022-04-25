import { ColorScheme } from '@mantine/core';
import React from 'react';

import { DarkLogo } from './DarkLogo';
import { LightLogo } from './LightLogo';

interface LogoProps {
  colorScheme: ColorScheme;
}

export const Logo = ({ colorScheme }: LogoProps) => {
  if (colorScheme === 'dark') {
    return <LightLogo />;
  }

  return <DarkLogo />;
};
