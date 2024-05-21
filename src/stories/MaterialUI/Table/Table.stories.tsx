import type { Meta, StoryObj } from '@storybook/react';
import { Table } from '.';
// import { Button } from '@mui/material'

const meta: Meta<typeof Table> = {
  title: 'Material UI/Table',
  component: Table,
  tags: ['autodocs'],
  args: {},
  argTypes: {}
}

export default meta;
type Story = StoryObj<typeof Table>

export const Default: Story = {
  args: {},
  render: ({...args}) => (
    <Table {...args} />
  )
}
