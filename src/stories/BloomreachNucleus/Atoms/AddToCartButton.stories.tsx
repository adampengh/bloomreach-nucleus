import { AddToCartButton } from '../../../components'
import { Meta, StoryObj } from '@storybook/react';

const meta: Meta<typeof AddToCartButton> = {
  component: AddToCartButton,
  parameters: {},
  tags: ['autodocs'],
  title: 'Bloomreach Nucleus/Atoms/Add To Cart Button',
  argTypes: {},
  args: {},
}
export default meta;
type Story = StoryObj<typeof AddToCartButton>

export const Default: Story = {
  render: () =>
    <AddToCartButton />
};
