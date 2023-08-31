import { Chip } from './';
import { Avatar, Grid } from '@mui/material';
import FaceIcon from '@mui/icons-material/Face';
import { Meta, StoryObj } from '@storybook/react';

const meta: Meta<typeof Chip> = {
  component: Chip,
  parameters: {},
  tags: ['autodocs'],
  title: 'Material UI/Chip',
  args: {
    color: 'default',
    label: 'Chip',
    size: 'medium',
    variant: 'filled'
  },
}
export default meta;
type Story = StoryObj<typeof Chip>

export const Default: Story = {
  render: ({ ...args }) =>
    <Chip {...args} />
}

export const Colors: Story = {
  render: ({ ...args }) =>
    <Grid container spacing={1}>
      <Grid item>
        <Chip {...args} color="default" />
      </Grid>
      <Grid item>
        <Chip {...args} color="primary" />
      </Grid>
      <Grid item>
        <Chip {...args} color="secondary" />
      </Grid>
      <Grid item>
        <Chip {...args} color="error" />
      </Grid>
      <Grid item>
        <Chip {...args} color="info" />
      </Grid>
      <Grid item>
        <Chip {...args} color="success" />
      </Grid>
      <Grid item>
        <Chip {...args} color="warning" />
      </Grid>
    </Grid>
}

export const Outlined: Story = {
  args: {
    variant: 'outlined'
  },
  render: ({ ...args }) =>
    <Grid container spacing={1}>
      <Grid item>
        <Chip {...args} color="default" />
      </Grid>
      <Grid item>
        <Chip {...args} color="primary" />
      </Grid>
      <Grid item>
        <Chip {...args} color="secondary" />
      </Grid>
      <Grid item>
        <Chip {...args} color="error" />
      </Grid>
      <Grid item>
        <Chip {...args} color="info" />
      </Grid>
      <Grid item>
        <Chip {...args} color="success" />
      </Grid>
      <Grid item>
        <Chip {...args} color="warning" />
      </Grid>
    </Grid>
}

export const WithAvatar: Story = {
  args: {
    avatar: <Avatar alt="Adam Pengh" src="/assets/images/adam-pengh.jpeg" />
  }
}

export const WithIcon: Story = {
  args: {
    icon: <FaceIcon />
  }
}
