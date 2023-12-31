import { ItemsByCategory_findItemsByCategory_items } from '@bloomreach/connector-components-react'
import { ProductCardGrocery, ProductCardPacificHome, ProductCardRetail } from './variations'

import styles from './ProductCard.module.scss'

export const ProductCard = ({
  product,
  variation,
}: {
  product?: ItemsByCategory_findItemsByCategory_items
  variation: string
}) => {
  // console.log('ProductCard', variation)
  // console.log('product', product)

  return (
    <article className={`${styles['product-card']}`}>
      {{
        'grocery': <ProductCardGrocery />,
        'retail': <ProductCardRetail />,
        'pacific-home': <ProductCardPacificHome product={product} />
      }[variation]}
    </article>
  )
}
