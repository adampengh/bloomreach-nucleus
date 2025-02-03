'use client';

import { Montserrat as SansSerif } from 'next/font/google';

import { AppRouterCacheProvider } from '@mui/material-nextjs/v15-appRouter';
import ThemeProvider from '@/themes/ThemeProvider';
import { Container, CssBaseline } from '@mui/material';

const sansSerif = SansSerif({
  subsets: ['latin'],
  weight: ['400', '500', '700'],
  display: 'swap',
  variable: '--font-sans-serif',
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='en'>
      <body>
        <Container
          id='appRoot'
          className={`app-root ${sansSerif.className}`}
          maxWidth={false}
          disableGutters
        >
          <AppRouterCacheProvider>
            <ThemeProvider theme='BloomreachNucleusLight'>
              <CssBaseline />
              {children}
            </ThemeProvider>
          </AppRouterCacheProvider>
        </Container>
      </body>
    </html>
  );
}
