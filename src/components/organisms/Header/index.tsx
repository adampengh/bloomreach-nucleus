import React from "react"
import { BrComponent } from "@bloomreach/react-sdk"
import { Container, Grid, Link } from "@mui/material"

// Molecules
import {
  Logo,
  Navigation,
} from '../../index'

import styles from './Header.module.scss'


export const Header = () => {
  return (
    <header className={styles.header}>
      <Container
        maxWidth="xl"
        className={styles['header__container']}
        // sx={{
        //   background: {
        //     xs: 'red',
        //     sm: 'green',
        //     md: 'blue',
        //     lg: 'yellow',
        //     xl: 'orange',
        //   }
        // }}
      >
        <Grid
          container
          alignContent='center'
          alignItems='center'
          justifyContent='flex-start'
        >
          <Grid item className={`${styles['header__logo']}`}>
            <Link href="/" lineHeight={1}>
              <Logo />
            </Link>
          </Grid>
          <Grid item className={`${styles['header__nav']}`}>
            <BrComponent path="menu">
              <Navigation />
            </BrComponent>
          </Grid>
          <Grid
            item
            sx={{ marginLeft: 'auto' }}
            className={`${styles['header__utility-nav']}`}>
            Utility Nav
          </Grid>
        </Grid>

      </Container>
    </header>
  )
}
