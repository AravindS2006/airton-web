'use client';

import { ThemeProvider } from '@mui/material/styles';
import { NextUIProvider } from '@nextui-org/react';
import theme from '@/styles/muiTheme';

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <NextUIProvider>
      <ThemeProvider theme={theme}>{children}</ThemeProvider>
    </NextUIProvider>
  );
}