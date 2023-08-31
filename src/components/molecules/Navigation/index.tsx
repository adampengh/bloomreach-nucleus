import { BrComponentContext, BrManageMenuButton, BrPageContext } from '@bloomreach/react-sdk'
import { Menu as BrMenu, Reference, isMenu } from '@bloomreach/spa-sdk'
import React, { useContext } from 'react'

import styles from './Navigation.module.scss'

export const Navigation = () => {
  const component = useContext(BrComponentContext)
  const page = useContext(BrPageContext)
  if (!component || !page) {
    return null;
  }

  const { menu: menuRef } = component?.getModels<MenuModels>()
  const menu = menuRef && page?.getContent<BrMenu>(menuRef)
  console.log('menu', menu)

  if (!menu || !isMenu(menu)) {
    return null;
  }

  return (
    <nav className={`${styles['navigation']}`}>
      <ul className={`${styles['navigation__list']}`}>
        <BrManageMenuButton menu={menu} />
        { menu.getItems().map((item) => (
          <li
            key={item.getName()}
            className={`${styles['navigation__list-item']}`}
          >
            {item.getName()}
          </li>
        ))}
      </ul>
    </nav>
  )
}
