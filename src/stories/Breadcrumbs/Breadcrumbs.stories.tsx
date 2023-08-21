import type { Meta, StoryObj } from '@storybook/react';
import { Breadcrumbs } from '.';

const meta: Meta<typeof Breadcrumbs> = {
  title: 'Material UI/Breadcrumbs',
  component: Breadcrumbs,
  tags: ['autodocs'],
  args: {
    label: 'Button',
  },
  argTypes: {
    label: {
      control: { type: 'text' },
    },
  }
}

export default meta;
type Story = StoryObj<typeof Breadcrumbs>

export const Default: Story = {
  render: ({
    label='Button',
    ...args
  }) => (
    <Breadcrumbs label={label} {...args} />
  ),
}

