import React from 'react'

import styles from './ProductPrice.module.scss'

export const ProductPrice = () => {
  return (
    <div className={`${styles['product-price']}`}>
      <span className={`${styles['product-price__discount']}`}>(50% off)</span>
      <span className={`${styles['product-price__sale']}`}>$49.99</span>
      <span className={`${styles['product-price__regular']}`}>$99.00</span>
    </div>
  )
}
