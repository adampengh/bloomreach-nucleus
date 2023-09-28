import React, { useContext } from 'react';
import { BrComponentContext, BrManageMenuButton, BrPageContext } from '@bloomreach/react-sdk'
import { Menu as BrMenu, MenuItem, isMenu } from '@bloomreach/spa-sdk'
import { Grid, Link, List, ListItem, Typography } from '@mui/material';

export const FooterMenu = () => {
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
    <Grid container sx={{ position: 'relative' }}>
      <BrManageMenuButton menu={menu} />
      {menu?.getItems().map((item: MenuItem, index: number) => (
        <Grid item xs={6} lg={4} key={index}>
          <List>
            <ListItem>
              <Typography variant="body1" component="h2"><strong>{item.getName()}</strong></Typography>
            </ListItem>
            {item.getChildren().map((subItem: MenuItem, i: number) => (
              <ListItem key={i}>
                <Link href={subItem.getUrl()} underline="hover">{subItem.getName()}</Link>
              </ListItem>
            ))}
          </List>
        </Grid>
      ))}
    </Grid>
  )
}
