import React from 'react'

import { Box, Button, Drawer, IconButton } from '@mui/material'
import CloseIcon from '@mui/icons-material/Close';

interface MiniCartProps {
  miniCartOpen: boolean;
  setMiniCartOpen: (open: boolean) => void;
}

export const MiniCart = ({
  miniCartOpen,
  setMiniCartOpen,
}: MiniCartProps) => {
  return (
    <Drawer
      anchor={'right'}
      ModalProps={{ keepMounted: true }}
      open={miniCartOpen}
      onClose={() => setMiniCartOpen(false)}
    >
      <Box
        sx={{ width: '100vw', maxWidth: 360, padding: '1rem' }}
        role="presentation"
      >
        <IconButton
          onClick={() => setMiniCartOpen(false)}
          sx={{
            position: 'absolute',
            top: 0,
            right: 0,
          }}
        >
          <CloseIcon color="primary" />
        </IconButton>
        <h2>Cart</h2>

        <div>
          <p>Item</p>
          <p>Item</p>
          <p>Item</p>
          <p>Item</p>
        </div>

        <Box sx={{ position: 'absolute', bottom: '1rem', left: '1rem', right: '1rem' }}>
          <Button
            color='primary'
            fullWidth
            href='/cart'
            variant='contained'
          >View Cart</Button>
        </Box>
      </Box>
    </Drawer>
  )
}
