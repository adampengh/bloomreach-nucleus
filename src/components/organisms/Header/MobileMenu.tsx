import React, { Fragment, useContext, useMemo, useState } from 'react'
import { BrComponentContext, BrPageContext } from '@bloomreach/react-sdk'
import { Menu as BrMenu, MenuItem, isMenu } from '@bloomreach/spa-sdk'

import { Box, Drawer, IconButton } from '@mui/material'

import CloseIcon from '@mui/icons-material/Close';

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
      >
        <Box
          display='flex'
          flexDirection='column'
          sx={{
            width: '100vw',
            height: '100vh',
            maxWidth: 320,
            paddingTop: 3
          }}
          role="presentation"
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

          <ul style={{ paddingBottom: '56px' }}>
          {menu?.getItems().map((item: MenuItem, index: number) =>
            <Fragment key={index}>
              <li key={index}><strong>{item.getName()}</strong></li>
              {item?.getChildren()?.map((column: MenuItem, i: number) =>
                <Fragment key={`${column.getName()}-${i}`}>
                  {column?.getChildren()?.length > 0 &&
                    <ul>
                      {column?.getChildren()?.map((thirdLevelItem: MenuItem, j: number) =>
                        <Fragment key={`${thirdLevelItem.getName()}-${j}`}>
                          <li>{thirdLevelItem.getName()}</li>
                          {thirdLevelItem?.getChildren()?.length > 0 &&
                            <ul>
                              {thirdLevelItem?.getChildren()?.map((fourthLevelItem: MenuItem, k: number) =>
                                <li key={`${fourthLevelItem.getName()}-${k}`}>{fourthLevelItem.getName()}</li>
                              )}
                            </ul>
                          }
                        </Fragment>
                      )}
                    </ul>
                  }
                </Fragment>
              )}
            </Fragment>
          )}
          </ul>
        </Box>
      </Drawer>
  )
}
