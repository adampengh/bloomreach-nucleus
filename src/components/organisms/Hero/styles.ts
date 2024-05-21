import { styled } from '@mui/system';
import { Box, Container, alpha } from '@mui/material';

export const StyledHeroContainer = styled(Container)(({ theme }) => ({
  position: 'relative',
}));


export const StyledTextContainer = styled(Box)(({ theme }) => ({
  alignItems: 'flex-start',
  background: alpha(theme.palette.primary.main, 0.9),
  bottom: 0,
  color: theme.palette.common.white,
  display: 'flex',
  flexDirection: 'column',
  height: '100%',
  justifyContent: 'center',
  left: '10%',
  opacity: 1,
  padding: '2rem',
  position: 'absolute',
  top: 0,
  minWidth: '300px',
  width: '30%',
  textShadow: '0 2px 4px rgba(0, 0, 0, 0.90)',
}));
