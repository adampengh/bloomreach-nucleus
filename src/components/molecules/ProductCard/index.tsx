import React from 'react'

// Bloomreach Nucleus
import { ProductPrice, Swatches } from '../../index'

// Material UI
import { Link } from '@mui/material'


import styles from './ProductCard.module.scss'

export const ProductCard = () => {
  return (
    <article className={`${styles['product-card']}`}>
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
        <Swatches />
      </section>
    </article>
  )
}
