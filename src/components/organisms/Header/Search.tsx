import React, { useState } from 'react'

import { Box, IconButton, Input, TextField } from '@mui/material'
import SearchIcon from '@mui/icons-material/Search';

export const Search = () => {
  const [showSearch, setShowSearch] = useState(false)
  const [value, setValue] = useState('')

  return (
    <>

      <Box
        component="form"
        // sx={{
        //   '& .MuiTextField-root': { m: 1, width: '25ch' },
        // }}
        // noValidate
        // autoComplete="off"
        action='/search'
        sx={{ width: showSearch ? '100%' : '0%', transition: 'width 0.5s ease-in-out' }}
      >
        <Input
          required
          id="outlined-required"
          value={value}
          placeholder='Search'
        />
      </Box>

      <IconButton onClick={() => setShowSearch(!showSearch)}>
        <SearchIcon color="primary" fontSize="small" />
      </IconButton>
    </>
  )
}
