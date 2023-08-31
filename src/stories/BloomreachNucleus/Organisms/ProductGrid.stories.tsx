import { ProductGrid } from '../../../components'
import { Meta, StoryObj } from '@storybook/react';

const meta: Meta<typeof ProductGrid> = {
  component: ProductGrid,
  parameters: {},
  tags: ['autodocs'],
  title: 'Bloomreach Nucleus/Organisms/Product Grid',
  argTypes: {},
  args: {},
}
export default meta;
type Story = StoryObj<typeof ProductGrid>


export const Default: Story = {
  render: () =>
    <ProductGrid />,
};
