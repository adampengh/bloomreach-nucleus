import React from 'react'

// Bloomreach Nucleus
import { AddToCartButton, ProductPrice } from '@/components'

// Material UI
import { Chip, Grid, Link, Typography } from '@mui/material'

import styles from './Grocery.module.scss'

export const ProductCardGrocery = () => {
  return (
    <>
      <Link href="#" className={`${styles['product-card__link']}`}>
        <div>
          <span>
            <img src="/assets/images/placeholders/Image-1x1.jpg" alt="Product" />
          </span>
        </div>
      </Link>

      <Grid container spacing={1}>
        <Grid item xs={12}>
          <Grid container columnSpacing={0.5}>
            <Grid item>
              <Chip label="Pickup" size="small" variant="outlined" color="primary" />
            </Grid>
            <Grid item>
              <Chip label="Delivery" size="small" variant="outlined" color="primary" />
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12}>
          <Typography variant='body2'>
            Great Value Mini Pretzel Twists, 16 oz
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <ProductPrice />
        </Grid>

        <Grid item xs={12}>
          <AddToCartButton />
        </Grid>
      </Grid>
    </>
  )
}
