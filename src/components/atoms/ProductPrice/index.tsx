import React from 'react'

import styles from './ProductPrice.module.scss'

export const ProductPrice = ({
  listPrice,
  purchasePrice,
}: {
  listPrice?: number | null | undefined;
  purchasePrice?: number | null | undefined;
}) => {
  if (listPrice && purchasePrice && (listPrice === purchasePrice)) {
    return (
      <div className={`${styles['product-price']}`}>
        <span className={`${styles['product-price__regular']}`}>${purchasePrice}</span>
      </div>
    )
  }

  const discount = listPrice && purchasePrice ? Math.round((1 - (purchasePrice / listPrice)) * 100) : 0
  return (
    <div className={`${styles['product-price']}`}>
      <span className={`${styles['product-price__discount']}`}>({discount}% off)</span>
      <span className={`${styles['product-price__sale']}`}>${purchasePrice}</span>
      <span className={`${styles['product-price__regular']}`}>${listPrice}</span>
    </div>
  )
}
