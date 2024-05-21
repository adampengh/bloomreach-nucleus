import { ProductCard } from '@/components';
import { Meta, StoryObj } from '@storybook/react';

const meta: Meta<typeof ProductCard> = {
  component: ProductCard,
  parameters: {
    layout: 'centered'
  },
  tags: ['autodocs'],
  title: 'Bloomreach Nucleus/Molecules/Product Card',
  argTypes: {
    variation: {
      control: 'radio',
      options: ['retail', 'grocery']
    }
  },
  args: {},
}
export default meta;
type Story = StoryObj<typeof ProductCard>


export const Retail: Story = {
  args: {
    variation: 'retail',
  },
  render: ({ ...args }) =>
    <div style={{ maxWidth: '364px' }}>
      <ProductCard {...args} />
    </div>
};

export const Grocery: Story = {
  args: {
    variation: 'grocery',
  },
  render: ({ ...args }) =>
    <div style={{ maxWidth: '240px' }}>
      <ProductCard { ...args } />
    </div>
}
