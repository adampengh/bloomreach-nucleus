import React from 'react'
import { useTheme, Container, Typography } from '@mui/material'

export const PromoBar =() => {
  const theme = useTheme()
  return (
    <Container
      disableGutters
      maxWidth={false}
      sx={{
        backgroundColor: theme.palette.primary.main,
        color: theme.palette.primary.contrastText,
        padding: 1,
        textAlign: 'center',
      }}
    >
      <Typography variant='body1' sx={{ fontWeight: 700 }}>Promo Bar</Typography>
    </Container>
  )
}
