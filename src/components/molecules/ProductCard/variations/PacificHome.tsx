import React from 'react'
import { ItemsByCategory_findItemsByCategory_items } from '@bloomreach/connector-components-react'

// Bloomreach Nucleus
import { ProductPrice } from '../../../index'

// Material UI
import { useTheme, Link } from '@mui/material'

import styles from './PacificHome.module.scss'

export const ProductCardPacificHome = ({
  product,
}: {
  product?: ItemsByCategory_findItemsByCategory_items
}) => {
  const theme = useTheme()
  console.log('theme', theme)
  const onSale = product?.customAttrs?.map((attr) => attr?.values?.[0] === 'true' ? true : false)[0]

  return (
    <>
      <Link href="#" className={`${styles['product-card__link']}`}>
        <div className={`${styles['product-card__image']}`}>
          <span className={`${styles['product-card__image--primary']}`}>
            <img src={product?.imageSet?.original?.link?.href || ''} alt="Product" />
          </span>
          {/* <span className={`${styles['product-card__image--secondary']}`}>
            <img src="/assets/images/placeholders/Image-3x4_alt.jpg" alt="Product" />
          </span> */}
          { onSale &&
            <div className={`${styles['product-card__image-badge']}`} style={{ backgroundColor: theme.palette.secondary.main }}>
              <span>ON SALE</span>
            </div>
          }
        </div>
      </Link>

      <section className={`${styles['product-card__details']}`}>
        <p className={`${styles['product-card__details-badge']}`}>BEST SELLER</p>
        <h3 className={`${styles['product-card__title']}`}>
          {product?.displayName}
        </h3>
        <ProductPrice />
      </section>
    </>
  )
}