import type { Meta, StoryObj } from '@storybook/react';
import { Button } from './';

const meta: Meta<typeof Button> = {
  title: 'Material UI/Button',
  component: Button,
  tags: ['autodocs'],
  args: {
    label: 'Button',
    color: 'primary',
    variant: 'contained',
    disableElevation: true,
  },
  argTypes: {
    label: {
      control: { type: 'text' },
    },
  }
}

export default meta;
type Story = StoryObj<typeof Button>

export const Default: Story = {
  render: ({
    label='Button',
    ...args
  }) => (
    <Button label={label} {...args} />
  ),
}
