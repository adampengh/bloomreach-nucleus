import { useContext, useState } from 'react'
import { getCustomAttributeByName } from '@/lib/utils/Discovery'

import {
  Box,
  Container,
  Grid,
  Tabs,
  Tab,
  Typography,
} from '@mui/material'
import { ProductPrice, TabPanel } from '@/components'
import { BrComponent, BrPageContext } from '@bloomreach/react-sdk'

const ProductDetailModule = ({ item, productId }: any) => {
  const page = useContext(BrPageContext);
  const [value, setValue] = useState<number>(0);

  const handleTabChange = (event: any, newValue: number) => {
    setValue(newValue);
    page?.sync()
  };

  return (
    <Container maxWidth='xl' sx={{ my: 6, border: '1px solid red' }}>
      <Typography variant='h2' component='h1' marginBottom={4}>Product Detail</Typography>
      <Grid container spacing={6}>
        {/* Product Image */}
        <Grid item xs={12} md={6}>
          <img
            src={item?.imageSet?.original?.link?.href || ''}
            alt={item?.displayName || ''}
            style={{width: "100%"}}
          />
        </Grid>

        {/* Product Details */}
        <Grid item xs={12} md={6}>
          {getCustomAttributeByName(item, 'brand') &&
            <Typography variant="h6" component="h2" color="textSecondary">{getCustomAttributeByName(item, 'brand')}</Typography>
          }
          <Typography variant="h3" component="h1" marginBottom={2}>{item?.displayName}</Typography>
          <ProductPrice
            listPrice={item?.listPrice?.moneyAmounts?.[0]?.amount}
            purchasePrice={item?.purchasePrice?.moneyAmounts?.[0]?.amount}
          />
          <Typography variant="body1" marginTop={2}>{item?.description}</Typography>
          <Typography variant="body1" marginTop={2}>Product ID: {productId}</Typography>
        </Grid>

        {/* Product Tabs */}
        <Grid item xs={12}>
          <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <Tabs value={value} onChange={handleTabChange}>
              <Tab label='Details' />
              <Tab label='Shipping' />
              <Tab label='Reviews' />
            </Tabs>
          </Box>
          <TabPanel value={value} index={0}>
            <Typography variant="body1" marginTop={2}>{item?.description}</Typography>
            <BrComponent path="details">
              <Grid item xs={12}>
                <BrComponent />
              </Grid>
            </BrComponent>
          </TabPanel>
          <TabPanel value={value} index={1}>
            <BrComponent path="shipping-tab">
              <Grid item xs={12}>
                <BrComponent />
              </Grid>
            </BrComponent>
          </TabPanel>
          <TabPanel value={value} index={2}>
            <Typography variant='h3'>Reviews</Typography>
          </TabPanel>
        </Grid>
      </Grid>
    </Container>
  )
}

export default ProductDetailModule;
