import React, { useContext, useEffect, useRef, useState } from "react"
import { BrComponent, BrPage, BrPageContext } from "@bloomreach/react-sdk"
import { isBrowser } from "../../../lib/utils"
import styles from './Header.module.scss'

// Nucleus Components
import {
  Logo,
  Navigation,
  PromoBar,
} from '../../index'

// Material UI Components
import {
  useTheme,
  Badge,
  Box,
  Container,
  Drawer,
  Grid,
  IconButton,
  Link,
} from "@mui/material"

// Material UI Icons
import CloseIcon from '@mui/icons-material/Close';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import StorefrontIcon from '@mui/icons-material/Storefront';


export const Header = () => {
  const page = useContext(BrPageContext)
  const theme = useTheme();

  const headerRef = useRef<any>(null)

  // State
  const [desktopMenuOpen, setDesktopMenuOpen] = useState<boolean>(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [miniCartOpen, setMiniCartOpen] = useState(false);

  useEffect(() => {
    if (!isBrowser() || page?.isPreview()) return;

    const headerHeight = headerRef.current?.offsetHeight
    console.log(headerHeight)
    document.body.style.paddingTop = `${headerHeight}px`
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

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
          <Grid item className={`${styles['header__nav']}`}>
            <IconButton onClick={() => setMobileMenuOpen(true)}>
              <MenuIcon color="primary" fontSize="small" />
            </IconButton>
          </Grid>
          <Grid item className={`${styles['header__logo']}`}
            sx={{
              maxWidth: '160px',
              [theme.breakpoints.up('sm')]: {
                maxWidth: '320px',
              }
            }}
          >
            <Link href="/" lineHeight={1}>
              <Logo />
            </Link>
          </Grid>
          <Grid item className={`${styles['header__nav']}`}>
            <BrComponent path="menu">
              <Navigation />
            </BrComponent>
          </Grid>
          <Grid item className={`${styles['header__utility-nav']}`}>
            <IconButton
              onClick={() => setMiniCartOpen(true)}>
              <SearchIcon color="primary" fontSize="small" />
            </IconButton>
            <IconButton onClick={() => setMiniCartOpen(true)}>
              <Badge badgeContent={4} color="secondary">
                <ShoppingCartOutlinedIcon color="primary" fontSize="small" />
              </Badge>
            </IconButton>
          </Grid>
        </Grid>
      </Container>

      {/* Mobile Menu */}
      <Drawer
        anchor={'left'}
        ModalProps={{ keepMounted: true }}
        open={mobileMenuOpen}
        onClose={() => setMobileMenuOpen(false)}
      >
        <Box
          sx={{ width: '100vw', maxWidth: 320, padding: '1rem' }}
          role="presentation"
          className={`${styles['qorpak-header__mobile-menu']}`}
        >
          <IconButton
            onClick={() => setMobileMenuOpen(false)}
            sx={{
              position: 'absolute',
              top: 0,
              right: 0,
            }}
          >
            <CloseIcon color="primary" />
          </IconButton>
          <h2>Mobile Menu</h2>
        </Box>
      </Drawer>

      {/* Mini-Cart */}
      <Drawer
        anchor={'right'}
        ModalProps={{ keepMounted: true }}
        open={miniCartOpen}
        onClose={() => setMiniCartOpen(false)}
      >
        <Box
          sx={{ width: '100vw', maxWidth: 320, padding: '1rem' }}
          role="presentation"
          className={`${styles['qorpak-header__mobile-menu']}`}
        >
          <IconButton
            onClick={() => setMiniCartOpen(false)}
            sx={{
              position: 'absolute',
              top: 0,
              right: 0,
            }}
          >
            <CloseIcon color="primary" />
          </IconButton>
          <h2>Cart</h2>
        </Box>
      </Drawer>
    </header>
  )
}
