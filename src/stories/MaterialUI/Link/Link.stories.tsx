import type { Meta, StoryObj } from '@storybook/react';
import { Link } from '.';

const meta: Meta<typeof Link> = {
  title: 'Material UI/Link',
  component: Link,
  tags: ['autodocs'],
  args: {
    label: 'Link',
  },
  argTypes: {
    label: {
      control: { type: 'text' },
    },
    onClick: { action: 'clicked' },
  }
}

export default meta;
type Story = StoryObj<typeof Link>

export const Default: Story = {
  render: ({
    label='Link',
    ...args
  }) => (
    <Link label={label} {...args} />
  ),
}
