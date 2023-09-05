import React from 'react'

// Bloomreach Nucleus
import { ProductPrice, Swatches } from '../../../index'

// Material UI
import { Link } from '@mui/material'


import styles from './Retail.module.scss'

const swatches = [
  { color: '#AA4323' },
  { color: '#671269' },
  { color: '#5C7A1D' },
  { color: '#43494F' },
  { color: '#007571' },
  { color: '#1D5259' },
  { color: '#FF0000' },
  { color: '#FFA500' },
  { color: '#FFFF00' },
  { color: '#008000' },
  { color: '#0000FF' },
  { color: '#4B0082' },
  { color: '#EE82EE' },
  { color: '#000000' },
  { color: '#808080' },
  { color: '#C0C0C0' },
  { color: '#FFFFFF' },
]

export const ProductCardRetail = () => {
  return (
    <>
      <Link href="#" className={`${styles['product-card__link']}`}>
        <div className={`${styles['product-card__image']}`}>
          <span className={`${styles['product-card__image--primary']}`}>
            <img src="/assets/images/placeholders/Image-3x4.jpg" alt="Product" />
          </span>
          <span className={`${styles['product-card__image--secondary']}`}>
            <img src="/assets/images/placeholders/Image-3x4_alt.jpg" alt="Product" />
          </span>
          <div className={`${styles['product-card__image-badge']}`}>
            <span>NEW</span>
          </div>
        </div>
      </Link>

      <section className={`${styles['product-card__details']}`}>
        <p className={`${styles['product-card__details-badge']}`}>BEST SELLER</p>
        <h3 className={`${styles['product-card__title']}`}>
          Stretch Secret Wash shirt in small dot organic cotton
        </h3>
        <ProductPrice />
        <div className={`${styles['product-card__promotions']}`}>
          <p>Extra 10% Off Sales Styles with Code 10OFF</p>
        </div>
        <p>Petite, Regular, Tall</p>
        { swatches && <Swatches swatches={swatches} /> }
      </section>
    </>
  )
}
