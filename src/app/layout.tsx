'use client'

import ThemeProvider from "@/themes/ThemeProvider"
import { Container, CssBaseline } from "@mui/material"

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <Container id='appRoot' className="app-root" maxWidth={false} disableGutters>
          <ThemeProvider theme='BloomreachNucleusLight'>
            <CssBaseline />
            {children}
          </ThemeProvider>
        </Container>
      </body>
    </html>
  )
}
