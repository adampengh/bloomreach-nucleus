// import { styled } from '@mui/system';
import { styled, Box, Link, Stack } from '@mui/material';

export const StyledShoppableImagePopoverContainer = styled(Box)(({ theme }) => ({
  background: 'none',
  height: '16px',
  position: 'absolute',
  transform: 'translate(-50%, -50%)',
  width: '16px'
}));

export const StyledShoppableImageIndicator = styled(Box)(({ theme }) => ({
  animation: 'pulse 2s infinite',
  background: '#fff',
  borderRadius: '50%',
  content: '""',
  height: '16px',
  position: 'absolute',
  transform: 'translate(-50%, -50%)',
  width: '16px',
  zIndex: 2,
  '&:hover': {
    cursor: 'pointer'
  },
  '@keyframes pulse': {
    '0%': {
      boxShadow: '0 0 0 0 rgba(0, 0, 0, 0.7)',
      transform: 'scale(0.95)'
    },
    '70%': {
      boxShadow: '0 0 0 10px rgba(0, 0, 0, 0)',
      transform: 'scale(1)'
    },
    '100%': {
      boxShadow: '0 0 0 0 rgba(0, 0, 0, 0)',
      transform: 'scale(0.95)'
    }
  }
}));

export const StyledShoppableImageDetails = styled(Box)(({ props, theme}: any) => ({
  background: theme.palette.common.white,
  bottom: 'calc(100% + 12px)',
  boxShadow: '0px 2px 4px 0 rgba(0, 0, 0, 0.3)',
  height: '120px',
  left: '50%',
  position: 'absolute',
  transform: 'translateX(-50%)',
  width: '320px',
  display: props?.showPopover ? 'flex' : 'none',
}));

export const StyledShoppableImageTriangle = styled(Box)(({ theme }) => ({
  color: theme.palette.common.white,
  left: '50%',
  position: 'absolute',
  textShadow: '0 -2px 4px rgba(0, 0, 0, 0.3)',
  top: '100%',
  transform: 'translate(-50%, -25%) rotate(180deg)',
  userSelect: 'none',
}));

export const StyledShoppableImageLink = styled(Link)(({ theme }) => ({
  display: 'flex',
  'a': {
    textDecoration: 'none'
  }
}));

export const StyledShoppableImageDetailsImage = styled(Box)(({ theme }) => ({
  display: 'block',
  width: '45%',
  'img': {
    display: 'block',
    maxWidth: '100%',
  }
}));

export const StyledShoppableImageDetailsContent = styled(Stack)(({ theme }) => ({
  display: 'block',
  padding: '12px 12px 12px 0',
  width:' 55%',
  color: theme.palette.common.black,
  textDecoration: 'none',
}));
