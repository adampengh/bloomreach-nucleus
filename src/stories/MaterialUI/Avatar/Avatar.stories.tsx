import { Avatar, AvatarGroup, Badge, styled } from '@mui/material';
import { Meta, StoryObj } from '@storybook/react';

const meta: Meta<typeof Avatar> = {
  component: Avatar,
  parameters: {},
  tags: ['autodocs'],
  title: 'Material UI/Avatar',
  argTypes: {},
}
export default meta;
type Story = StoryObj<typeof Avatar>

const StyledBadge = styled(Badge)(({ theme }) => ({
  '& .MuiBadge-badge': {
    backgroundColor: '#44b700',
    color: '#44b700',
    boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
    '&::after': {
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      borderRadius: '50%',
      // animation: 'ripple 1.6s infinite ease-in-out',
      border: '1px solid currentColor',
      content: '""',
    },
  },
  '@keyframes ripple': {
    '0%': {
      transform: 'scale(.8)',
      opacity: 1,
    },
    '100%': {
      transform: 'scale(2.4)',
      opacity: 0,
    },
  },
}));

export const Default: Story = {
  render: () =>
    <Avatar alt="Adam Pengh" src="/assets/images/adam-pengh.jpeg" />,
};

export const Grouped: Story = {
  render: () =>
    <AvatarGroup max={6} total={24}>
      <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
      <Avatar alt="Travis Howard" src="/static/images/avatar/2.jpg" />
      <Avatar alt="Agnes Walker" src="/static/images/avatar/4.jpg" />
      <Avatar alt="Trevor Henderson" src="/static/images/avatar/5.jpg" />
      <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
      <Avatar alt="Travis Howard" src="/static/images/avatar/2.jpg" />
      <Avatar alt="Agnes Walker" src="/static/images/avatar/4.jpg" />
      <Avatar alt="Trevor Henderson" src="/static/images/avatar/5.jpg" />
    </AvatarGroup>
}

export const Badged: Story = {
  render: () =>
    <StyledBadge
      overlap="circular"
      anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      variant="dot"
    >
      <Avatar alt="Adam Pengh" src="/assets/images/adam-pengh.jpeg" />
    </StyledBadge>
}

export const BadgedGrouped: Story = {
  render: () =>
    <AvatarGroup max={6} total={24}>
      <StyledBadge
        overlap="circular"
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        variant="dot"
      >
        <Avatar alt="Adam Pengh" src="/assets/images/adam-pengh.jpeg" />
      </StyledBadge>
      <StyledBadge
        overlap="circular"
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        variant="dot"
      >
        <Avatar alt="Adam Pengh" src="/broken-image.jpeg" sx={{ bgcolor: 'red' }} />
      </StyledBadge>
      <StyledBadge
        overlap="circular"
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        variant="dot"
      >
        <Avatar alt="Adam Pengh" src="/assets/images/adam-pengh.jpeg" />
      </StyledBadge>
    </AvatarGroup>
}
