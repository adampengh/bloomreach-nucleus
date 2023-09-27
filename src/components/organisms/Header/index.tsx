import React, { useContext, useEffect, useRef, useState } from "react"
import { BrComponent, BrPageContext } from "@bloomreach/react-sdk"
import styles from './Header.module.scss'

// Nucleus Components
import {
  Logo,
  MiniCart,
  Navigation,
  PromoBar,
} from '../../index'
import { MobileMenu } from "./MobileMenu"

// Material UI Components
import {
  useTheme,
  Badge,
  Container,
  Grid,
  IconButton,
  Link,
} from "@mui/material"

// Material UI Icons
import MenuIcon from '@mui/icons-material/Menu';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import StorefrontIcon from '@mui/icons-material/Storefront';
import { Search } from "./Search"


export const Header = () => {
  const page = useContext(BrPageContext)
  const theme = useTheme();

  const headerRef = useRef<any>(null)

  // State
  const [isClient, setIsClient] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [miniCartOpen, setMiniCartOpen] = useState(false);


  useEffect(() => {
    setIsClient(true)
  }, [])

  useEffect(() => {
    if (!isClient || page?.isPreview()) return;

    const headerHeight = headerRef.current?.offsetHeight
    document.body.style.paddingTop = `${headerHeight}px`
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isClient])

  return (
    <header
      className={styles.header}
      ref={headerRef}
      style={ page?.isPreview() ? {position: 'relative'} : {position: 'fixed'}}
    >
      <PromoBar  />
      <Container maxWidth="xl" className={styles['header__container']}
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
        <Grid container className={`${styles['header__inner']}`}>
          <Grid item className={`${styles['header__mobile-trigger']}`}>
            <IconButton onClick={() => setMobileMenuOpen(true)}>
              <MenuIcon color="primary" fontSize="small" />
            </IconButton>
          </Grid>

          {/* Logo */}
          <Grid item className={`${styles['header__logo']}`}
            sx={{
              minWidth: '100px',
              maxWidth: '160px',
              [theme.breakpoints.up('sm')]: {
                maxWidth: '320px',
              }
            }}
          >
            <BrComponent path="logo" />
          </Grid>

          {/* Navigation */}
          <Grid item className={`${styles['header__nav']}`}>
            <BrComponent path="menu">
              <Navigation />
            </BrComponent>
          </Grid>

          {/* Utility Nav */}
          <Grid item className={`${styles['header__utility-nav']}`}>
            <Search />
            <IconButton onClick={() => setMiniCartOpen(true)}>
              <Badge badgeContent={4} color="primary">
                <ShoppingCartOutlinedIcon color="primary" fontSize="small" />
              </Badge>
            </IconButton>
          </Grid>
        </Grid>
      </Container>

      {/* Mobile Menu */}
      <BrComponent path="menu">
        <MobileMenu
          mobileMenuOpen={mobileMenuOpen}
          setMobileMenuOpen={setMobileMenuOpen} />
      </BrComponent>

      {/* Mini-Cart */}
      <MiniCart
        miniCartOpen={miniCartOpen}
        setMiniCartOpen={setMiniCartOpen} />

    </header>
  )
}
