import React, { useContext, useState } from 'react'
import { BrComponentContext, BrManageMenuButton, BrPageContext } from '@bloomreach/react-sdk'
import { Menu as BrMenu, MenuItem, isMenu } from '@bloomreach/spa-sdk'
import { Box, ClickAwayListener, Grid, Link, List, ListItem, Typography } from '@mui/material';

import styles from './Navigation.module.scss'

export const Navigation = ({ top }: any) => {
  const [showMegaMenu, setShowMegaMenu] = useState<boolean>(false);
  const [activeMenu, setActiveMenu] = useState<number>(-1);
  const handleActiveMenu = (event: any, menu: any) => {
    event.preventDefault();
    if (menu === activeMenu) {
      setActiveMenu(-1);
      setShowMegaMenu(false);
      return;
    }
    setShowMegaMenu(true);
    setActiveMenu(menu);
  };


  const component = useContext(BrComponentContext)
  const page = useContext(BrPageContext)
  if (!component || !page) {
    return null;
  }

  const { menu: menuRef } = component?.getModels<MenuModels>()
  const menu: BrMenu = menuRef && page?.getContent<BrMenu>(menuRef)

  if (!menu || !isMenu(menu)) {
    return null;
  }

  return (
    <ClickAwayListener onClickAway={() => {
      setActiveMenu(-1);
      setShowMegaMenu(false);
    }}>
      <nav className={`${styles['nav']}`}>
        <BrManageMenuButton menu={menu} />
        <ul className={`${styles['nav__list']}`}>
          {menu?.getItems().map((item: MenuItem, index: number) =>
            <li key={index} className={`${styles['nav__list-item']}`}>
              <Link
                onClick={(event) => item.getChildren().length > 0 ? handleActiveMenu(event, index) : null}
                href={item.getUrl()}
                data-menu="women"
              >{item.getName()}</Link>

              {item.getChildren().length > 0 && (
                <Box
                  className={`${styles['nav__mega-menu-wrapper']}`}
                  data-menu-status={activeMenu === index ? 'show' : 'hide'}
                >
                  <Box className={`${styles['nav__mega-menu-inner']}`}>
                    {item.getChildren().map((column: MenuItem, idx: number) => (
                      <Box key={idx} className={`${styles['nav__mega-menu-column']}`}>
                        {column?.getChildren().map((subItem: MenuItem, i: number) => (
                          <List key={i}>
                            <ListItem>
                              <Typography variant='h3'>{subItem.getName()}</Typography>
                            </ListItem>
                            {subItem.getChildren().map((subSubItem: MenuItem, j: number) => (
                              <ListItem key={j}>
                                <Link href={subSubItem?.getUrl()}>{subSubItem.getName()}</Link>
                              </ListItem>
                            ))}
                          </List>
                        ))}
                      </Box>
                    ))}

                    {/* Mega Menu Banners */}
                    <Box  className={`${styles['nav__mega-menu-promos']}`}>
                      {item.getName()}
                      {{
                        'Furniture': <FurniturePromos />,
                        'Décor & Pillows': <DecorPromos />
                      }[item.getName()]}
                    </Box>
                  </Box>
                </Box>
              )}

            </li>
          )}
        </ul>

        <div
          className={`${styles['nav__mega-menu']}`}
          data-menu-status={showMegaMenu ? 'show' : 'hide'}
        />
      </nav>
    </ClickAwayListener>
  )
}

const FurniturePromos = () => {
  return (
    <>
      <Typography variant='h3'>Furniture Trends</Typography>
      <Grid container spacing={1} sx={{ mt: 1 }}>
        <Grid item xs={6}>
          <Box>
            <Link href="/collections/men/shirts">
              <img src="https://via.placeholder.com/240x360" alt="" />
            </Link>
          </Box>
        </Grid>
        <Grid item xs={6}>
          <Box>
            <Link href="/collections/men/shirts">
              <img src="https://via.placeholder.com/240x360" alt="" />
            </Link>
          </Box>
        </Grid>
      </Grid>
    </>
  )
}

const DecorPromos = () => {
  return (
    <>
      <Typography variant='h3'>Décor Ideas for Your Home</Typography>
      <Grid container spacing={1} sx={{ mt: 1 }}>
        <Grid item xs={6}>
          <Box>
            <Link href="/collections/men/shirts">
              <img src="https://via.placeholder.com/240x120" alt="" />
            </Link>
          </Box>
        </Grid>
        <Grid item xs={6}>
          <Box>
            <Link href="/collections/men/shirts">
              <img src="https://via.placeholder.com/240x120" alt="" />
            </Link>
          </Box>
        </Grid>
        <Grid item xs={4}>
          <Box>
            <Link href="/collections/men/shirts">
              <img src="https://via.placeholder.com/160x120" alt="" />
            </Link>
          </Box>
        </Grid>
        <Grid item xs={4}>
          <Box>
            <Link href="/collections/men/shirts">
              <img src="https://via.placeholder.com/160x120" alt="" />
            </Link>
          </Box>
        </Grid>
        <Grid item xs={4}>
          <Box>
            <Link href="/collections/men/shirts">
              <img src="https://via.placeholder.com/160x120" alt="" />
            </Link>
          </Box>
        </Grid>
      </Grid>
    </>
  )
}
