import type { Meta, StoryObj } from '@storybook/react';
import { Button } from './';
// import { Button } from '@mui/material'

const meta: Meta<typeof Button> = {
  title: 'Material UI/Button',
  component: Button,
  tags: ['autodocs'],
  args: {
    variant: 'contained',
    disableElevation: true,
  },
  argTypes: {}
}

export default meta;
type Story = StoryObj<typeof Button>

export const Primary: Story = {
  args: {
    children: 'Primary',
    color: 'primary',
  },
  render: ({...args}) => (
    <Button {...args}>{args.children}</Button>
  ),
}

export const Secondary: Story = {
  args: {
    children: 'Secondary',
    color: 'secondary',
  },
  render: ({...args}) => (
    <Button {...args}>{args.children}</Button>
  ),
}
