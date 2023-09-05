import React, { useState } from 'react'

// Material UI Components
import { Button, ButtonGroup, Input } from '@mui/material'

// Material UI Icons
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';

export const AddToCartButton = () => {
  const [quantity, setQuantity] = useState(0)
  return (
    <>
      { quantity === 0 ?
        <Button
          size='small'
          variant='contained'
          onClick={() => setQuantity(1)}
          sx={{ width: '137px', height: '32px', borderRadius: '50px' }}
        >Add To Cart</Button>
      :
        <ButtonGroup
          disableElevation
          variant="contained"
          size='small'
          aria-label="Disabled elevation buttons"
          sx={{ borderRadius: '50px' }}
        >
          <Button
            onClick={() => setQuantity(quantity - 1)}
            sx={{ borderRadius: '50px' }}
          >
            <RemoveIcon fontSize="small" />
          </Button>
          <Input
            onChange={(e) => setQuantity(parseInt(e.target.value))}
            value={quantity}
            sx={{
              padding: '0 10px',
              width: 'auto',
              textAlign: 'center',
              maxWidth: '48px',
              fontSize: '16px',
              fontWeight: 'bold',
            }} />
          <Button
            onClick={() => setQuantity(quantity + 1)}
            sx={{ borderRadius: '50px' }}
          >
            <AddIcon fontSize="small" />
          </Button>
        </ButtonGroup>
      }
    </>
  )
}
