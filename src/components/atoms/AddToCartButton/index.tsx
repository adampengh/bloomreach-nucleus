import React, { useState } from 'react'

// Material UI Components
import { Button, ButtonGroup, Input, useTheme } from '@mui/material'

// Material UI Icons
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';

export const AddToCartButton = () => {
  const theme = useTheme()
  const [quantity, setQuantity] = useState(0)
  return (
    <>
      { quantity === 0 ?
        <Button
          size='small'
          variant='contained'
          onClick={() => setQuantity(1)}
          sx={{ width: '137px', height: '34.5px', borderRadius: '50px' }}
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
            disableUnderline
            sx={{
              width: 'auto',
              textAlign: 'center',
              maxWidth: '48px',
              fontSize: '16px',
              fontWeight: 'bold',
              justifyContent: 'center',
              borderTop: `1px solid ${theme.palette.primary.main}`,
              borderBottom: `1px solid ${theme.palette.primary.main}`,
              '& input': {
                textAlign: 'center',
              }
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
