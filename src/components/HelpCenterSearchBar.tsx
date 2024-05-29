import { useState } from 'react';
import { useRouter } from 'next/router'

// Material UI Components
import {
  Box,
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
} from '@mui/material';

// Material UI Icons
import SearchIcon from '@mui/icons-material/Search';
import { BrProps } from '@bloomreach/react-sdk';


export const HelpCenterSearchBar = ({ component }: BrProps) => {
  console.group('HelpCenterSearchBar')

  // Get the search term from the query string
  const router = useRouter()
  const { q: searchTerm } = router.query
  const [ term, setTerm ] = useState(searchTerm)

  // Component Parameters
  console.log('HelpCenterSearchBar [component parameters]', component?.getParameters())
  const {
    label = 'Search',
    placeholder = 'Enter search term...'
  } = component?.getParameters() || {}
  console.groupEnd()

  return (
    <section className='help-center-search-bar'>
      <Box
        component='form'
        action='/help/search'
        sx={{ display: 'flex', alignItems: 'center' }}
      >
        <FormControl variant='outlined' sx={{ width: '100%' }}>
          <InputLabel>{label}</InputLabel>
          <OutlinedInput
            endAdornment={
              <InputAdornment position='end'>
                <IconButton type='submit'>
                  <SearchIcon />
                </IconButton>
              </InputAdornment>
            }
            label={label}
            name='q'
            placeholder={placeholder}
            type='text'
            value={term || ''}
            onChange={(e) => setTerm(e.target.value)}
            sx={{ borderRadius: '0' }}
          />
        </FormControl>
      </Box>
    </section>
  )
}
