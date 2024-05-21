import React from 'react';
import {
  Button,
  CircularProgress,
  Backdrop as MuiBackdrop,
  BackdropProps as MuiBackdropProps,
} from '@mui/material';

export interface ButtonGroupProps {
  label: string;
}

export const Backdrop = ({...args}: Omit<MuiBackdropProps, 'open'>) => {
  const [open, setOpen] = React.useState(false);
  const handleClose = () => {
    setOpen(false);
  };
  const handleOpen = () => {
    setOpen(true);
  };

  return (
    <>
      <Button onClick={handleOpen}>Show backdrop</Button>
      <MuiBackdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={open}
        onClick={handleClose}
        {...args}
      >
        <CircularProgress color="inherit" />
      </MuiBackdrop>
    </>
  )
}
