import { Badge, styled } from '@mui/material';
import { Meta, StoryObj } from '@storybook/react';

import MailIcon from '@mui/icons-material/Mail';

const meta: Meta<typeof Badge> = {
  component: Badge,
  parameters: {},
  tags: ['autodocs'],
  title: 'Material UI/Badge',
  argTypes: {},
}
export default meta;
type Story = StoryObj<typeof Badge>

export const Default: Story = {
  render: () =>
    <Badge color="secondary" badgeContent={99}>
      <MailIcon />
    </Badge>
}
