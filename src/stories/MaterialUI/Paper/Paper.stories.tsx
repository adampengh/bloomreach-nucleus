import type { Meta, StoryObj } from '@storybook/react';
import { Paper } from '.';

const meta: Meta<typeof Paper> = {
  title: 'Material UI/Paper',
  component: Paper,
  tags: ['autodocs'],
  args: {},
  argTypes: {}
}

export default meta;
type Story = StoryObj<typeof Paper>

export const Basic: Story = {
  args: {
    elevation: 3,
  },
  render: ({...args}) => (
    <Paper {...args} />
  )
}
