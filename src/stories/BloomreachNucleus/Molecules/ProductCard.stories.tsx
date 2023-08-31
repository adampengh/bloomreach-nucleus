import { ProductCard } from '../../../components'
import { Meta, StoryObj } from '@storybook/react';

const meta: Meta<typeof ProductCard> = {
  component: ProductCard,
  parameters: {},
  tags: ['autodocs'],
  title: 'Bloomreach Nucleus/Molecules/Product Card',
  argTypes: {},
  args: {
    isStoryBook: true,
  },
}
export default meta;
type Story = StoryObj<typeof ProductCard>


export const Default: Story = {
  render: () =>
    <ProductCard />,
};
