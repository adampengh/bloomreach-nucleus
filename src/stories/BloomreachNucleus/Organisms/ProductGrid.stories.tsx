import { ProductGrid } from '../../../components'
import { Meta, StoryObj } from '@storybook/react';

const meta: Meta<typeof ProductGrid> = {
  component: ProductGrid,
  parameters: {},
  tags: ['autodocs'],
  title: 'Bloomreach Nucleus/Organisms/Product Grid',
  argTypes: {
    itemsPerRowMobile: {
      control: 'radio',
      options: [1, 2]
    },
    itemsPerRowTablet: {
      control: 'radio',
      options: [2, 3, 4]
    },
    itemsPerRowDesktop: {
      control: 'radio',
      options: [3, 4, 6]
    },
    variation: {
      control: 'radio',
      options: ['retail', 'grocery']
    }
  },
  args: {},
}
export default meta;
type Story = StoryObj<typeof ProductGrid>


export const Default: Story = {
  render: ({ ...args }) => {
    return (
      <ProductGrid {...args} />
    )
  }
};

export const Grocery: Story = {
  args: {
    itemsPerRowMobile: 2,
    itemsPerRowTablet: 3,
    itemsPerRowDesktop: 6,
    variation: 'grocery'
  },
  render: ({ ...args }) =>
    <ProductGrid {...args} />,
};

export const Retail: Story = {
  args: {
    itemsPerRowMobile: 1,
    itemsPerRowTablet: 2,
    itemsPerRowDesktop: 4,
    variation: 'retail'
  },
  render: ({ ...args }) =>
    <ProductGrid {...args} />,
};
