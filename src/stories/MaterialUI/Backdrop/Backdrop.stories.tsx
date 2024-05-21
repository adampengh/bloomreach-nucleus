import type { Meta, StoryObj } from '@storybook/react';
import { Backdrop } from '.';

const meta: Meta<typeof Backdrop> = {
  title: 'Material UI/Backdrop',
  component: Backdrop,
  tags: ['autodocs'],
  args: {},
  argTypes: {},
}

export default meta;
type Story = StoryObj<typeof Backdrop>

export const Basic: Story = {
  args: {},
  render: ({...args}) => (
    <Backdrop {...args} />
  )
}
