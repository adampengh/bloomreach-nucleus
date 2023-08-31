import { Container, Grid, Typography } from '@mui/material';
import { Breadcrumbs, ProductGrid } from '../../../components'
import { Meta, StoryObj } from '@storybook/react';

const meta: Meta<typeof ProductGrid> = {
  component: ProductGrid,
  parameters: {},
  tags: ['autodocs'],
  title: 'Bloomreach Nucleus/Templates/Product Listing Page',
  argTypes: {},
  args: {},
}
export default meta;
type Story = StoryObj<typeof ProductGrid>


export const Category: Story = {
  render: () =>
    <Container maxWidth='xl'>
      <Grid container spacing={4}>
        <Grid item xs={12}>
          <Breadcrumbs />
        </Grid>
        <Grid item xs={12}>
          <Typography variant="h3" align='center' component='h1'>Category</Typography>
        </Grid>
        <Grid item xs={12}>
          <ProductGrid />
        </Grid>
      </Grid>
    </Container>
};
