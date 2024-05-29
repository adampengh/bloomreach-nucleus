import { useState } from 'react';
import { useRouter } from 'next/router'
import { Menu as BrMenu, isMenu } from '@bloomreach/spa-sdk';
import { BrManageMenuButton, BrProps } from '@bloomreach/react-sdk';

// Material UI Components
import {
  Box,
  FormControl,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  InputLabel,
  OutlinedInput,
  Typography,
} from '@mui/material';

// Material UI Icons
import SearchIcon from '@mui/icons-material/Search';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';


export const HelpCenterMenu = ({ component, page }: BrProps) => {
  console.group('HelpCenterMenu')

  // Get the search term from the query string
  const router = useRouter()
  const { q: searchTerm } = router.query
  const [ term, setTerm ] = useState(searchTerm)

  // const component = useContext(BrComponentContext);
  // const page = useContext(BrPageContext);
  console.log('HelpCenterMenu [component]', component)
  console.log('HelpCenterMenu [page]', page?.getTitle())

  if (!component || !page) {
    console.groupEnd()
    return null;
  }

  const { menu: menuRef } = component.getModels<MenuModels>();
  const menu = menuRef && page.getContent<BrMenu>(menuRef);


  if (!isMenu(menu)) {
    console.groupEnd()
    return null;
  }

  console.groupEnd()

  return (
    <section className='help-center-menu'>
      <List sx={{ position: 'relative', paddingTop: 0 }}>
        {/* @ts-ignore */}
        <BrManageMenuButton menu={menu} />
        {/* Loop through the Menu Items */}
        {menu?.getItems().map((menuItem, index) => {
          // console.log('menuItem', menuItem)
          return (
            <ListItem
              key={index}
              disablePadding
              secondaryAction={<ArrowForwardIosIcon fontSize='small' color='disabled' />}
              sx={{
                boxShadow: (menuItem.isSelected() || menuItem.isExpanded()) || (page.getTitle() === 'Help Center' && index === 0) ? 'inset 8px 0 #e0004d' : '',
                border: '1px solid #ccc',
                '&:not(:last-child)': {
                  borderBottom: 'none'
                }
              }}
            >
              <ListItemButton component='a' href={menuItem?.getUrl()}>
                <ListItemText primary={
                  <Typography variant='h6' sx={{ fontWeight: 'bold' }}>
                    {menuItem.getName()}
                  </Typography>
                }/>
              </ListItemButton>
            </ListItem>
          )
        })}
      </List>
    </section>
  )
}
