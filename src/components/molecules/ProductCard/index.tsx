// export * from './Grocery'
// export * from './Retail'

import { ProductCardGrocery, ProductCardRetail } from './variations'
import styles from './ProductCard.module.scss'

export const ProductCard = ({
  variation
}: {
  variation: string
}) => {
  console.log('variation', variation)
  let ProductCardVariant
  switch (variation) {
    case 'grocery':
      ProductCardVariant = ProductCardGrocery
    case 'retail':
      ProductCardVariant = ProductCardRetail
    default:
      ProductCardVariant = ProductCardRetail
  }

  console.log('ProductCardVariant', ProductCardVariant)

  return (
    <article className={`${styles['product-card']}`}>
      {
        {
          'grocery': <ProductCardGrocery />,
          'retail': <ProductCardRetail />
        }[variation]
      }
    </article>
  )
}
