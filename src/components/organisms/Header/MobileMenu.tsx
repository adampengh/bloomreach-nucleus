import React, { Fragment, useContext, useMemo, useState } from 'react'
import { BrComponentContext, BrPageContext } from '@bloomreach/react-sdk'
import { Menu as BrMenu, MenuItem, isMenu } from '@bloomreach/spa-sdk'

// Material UI Components
import { Accordion, AccordionDetails, AccordionSummary, Box, Drawer, IconButton, Link } from '@mui/material'

// Material UI Icons
import CloseIcon from '@mui/icons-material/Close';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

import styles from './MobileMenu.module.scss'
interface MobileMenuProps {
  mobileMenuOpen: boolean;
  setMobileMenuOpen: (open: boolean) => void;
}

export const MobileMenu = ({
  mobileMenuOpen,
  setMobileMenuOpen,
}: MobileMenuProps) => {
  const [menu, setMenu] = useState({})
  const component = useContext(BrComponentContext)
  const page = useContext(BrPageContext)

  useMemo(() => {
    const { menu: menuRef } = component && component?.getModels<MenuModels>() || {}
    const menu: BrMenu = menuRef && page?.getContent<BrMenu>(menuRef)
    menu && setMenu(menu)
  }, [component, page])

  if (!component || !page) {
    return null;
  }

  if (!menu || !isMenu(menu)) {
    return null;
  }

  // console.log('menu', menu)
  return (
    <Drawer
      anchor={'left'}
      ModalProps={{ keepMounted: false }}
      open={mobileMenuOpen}
      onClose={() => setMobileMenuOpen(false)}
      id='MobileMenu'
      className={`${styles['mobile-menu']}`}
    >
      <Box
        display='flex'
        flexDirection='column'
        role="presentation"
        sx={{
          width: '100vw',
          height: '100vh',
          maxWidth: 320,
          paddingTop: 5,
          overflow: 'hidden',
        }}
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

        <Box
          display='flex'
          flexDirection='column'
          role="presentation"
          sx={{
            width: '100%',
            height: '100%',
            overflow: 'auto',
          }}
        >
        <ul style={{ paddingBottom: '56px' }}>
        {menu?.getItems().map((item: MenuItem, index: number) =>
          <Fragment key={index}>
            {/* <li key={index}><strong>{item.getName()}</strong></li> */}
            <Accordion>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1a-content"
                id="panel1a-header"
              >{item.getName()}</AccordionSummary>
              <AccordionDetails>
              {item?.getChildren()?.map((column: MenuItem, i: number) =>
              <Fragment key={`${column.getName()}-${i}`}>
                {column?.getChildren()?.length > 0 &&
                  <ul style={{ paddingLeft: '1rem'}} >
                    {column?.getChildren()?.map((thirdLevelItem: MenuItem, j: number) =>
                      <Fragment key={`${thirdLevelItem.getName()}-${j}`}>
                        <li id={`${thirdLevelItem.getName()}-${j}`}>
                          <Link href={thirdLevelItem.getUrl()} underline='none'>{thirdLevelItem.getName()}</Link>
                        </li>
                        {thirdLevelItem?.getChildren()?.length > 0 &&
                          <ul style={{ paddingLeft: '1rem'}}>
                            {thirdLevelItem?.getChildren()?.map((fourthLevelItem: MenuItem, k: number) =>
                              <li key={`${fourthLevelItem.getName()}-${k}`}>
                                <Link href={fourthLevelItem.getUrl()} underline='none'>{fourthLevelItem.getName()}</Link>
                              </li>
                            )}
                          </ul>
                        }
                      </Fragment>
                    )}
                  </ul>
                }
              </Fragment>
            )}
              </AccordionDetails>
            </Accordion>
          </Fragment>
        )}
        </ul>
        </Box>
      </Box>
    </Drawer>
  )
}
