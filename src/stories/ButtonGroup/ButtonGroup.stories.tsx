import type { Meta, StoryObj } from '@storybook/react';
import { ButtonGroup } from '.';

const meta: Meta<typeof ButtonGroup> = {
  title: 'Material UI/Button Group',
  component: ButtonGroup,
  tags: ['autodocs'],
  args: {
    label: 'Button',
    color: 'primary',
    variant: 'outlined',
    disableElevation: true,
  },
  argTypes: {
    label: {
      control: { type: 'text' },
    },
  }
}

export default meta;
type Story = StoryObj<typeof ButtonGroup>

export const Default: Story = {
  render: ({
    label='Button',
    ...args
  }) => (
    <ButtonGroup label={label} {...args} />
  ),
}

export const PrimaryContained: Story = {
  args: {
    variant: 'contained',
  }
}

export const SecondaryContained: Story = {
  args: {
    color: 'secondary',
    variant: 'contained',
  }
}

export const SuccessContained: Story = {
  args: {
    color: 'success',
    variant: 'contained',
  }
}
