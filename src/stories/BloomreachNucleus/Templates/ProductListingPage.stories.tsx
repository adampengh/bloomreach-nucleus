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


export const Retail: Story = {
  args: {
    itemsPerRowMobile: 1,
    itemsPerRowTablet: 2,
    itemsPerRowDesktop: 3,
    variation: 'retail',
  },
  render: ({ ...args }) =>
    <Container maxWidth='xl'>
      <Grid container spacing={4}>
        <Grid item xs={12}>
          <Breadcrumbs />
        </Grid>
        <Grid item xs={12}>
          <Typography variant="h3" align='center' component='h1'>Retail</Typography>
        </Grid>
        <Grid item xs={12}>
          <ProductGrid {...args} />
        </Grid>
      </Grid>
    </Container>
};

export const Grocery: Story = {
  args: {
    itemsPerRowMobile: 2,
    itemsPerRowTablet: 3,
    itemsPerRowDesktop: 6,
    variation: 'grocery',
  },
  render: ({ ...args }) =>
    <Container maxWidth='xl'>
      <Grid container spacing={4}>
        <Grid item xs={12}>
          <Breadcrumbs />
        </Grid>
        <Grid item xs={12}>
          <Typography variant="h3" align='center' component='h1'>Grocery</Typography>
        </Grid>
        <Grid item xs={12}>
          <ProductGrid {...args} />
        </Grid>
      </Grid>
    </Container>
};
