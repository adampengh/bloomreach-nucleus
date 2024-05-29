import { useState, useEffect } from 'react';
import { useRouter } from 'next/router'

// Bloomreach SDKs
import { BrProps } from '@bloomreach/react-sdk'
import { Pagination } from '@bloomreach/spa-sdk'

// Material UI
import {
  Grid,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Pagination as MuiPagination,
  Typography,
} from '@mui/material'

// Material UI Icons
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';


export const HelpCenterSearchResults = ({ component, page }: BrProps) => {
  console.group('HelpCenterSearchResults')
  console.log('component.getId()', component?.getId())
  const [currentPage, setCurrentPage] = useState(1)

  // Get the search term from the query string
  const { asPath, query, push } = useRouter()
  const pageKey = component?.getId() + ':page'

  const {
    q: searchTerm,
    [pageKey]: pageNumber,
  } = query

  useEffect(() => {
    setCurrentPage(Number(pageNumber) || 1)
  }, [])

  const handlePageChange = (event: any, newPage: number) => {
    setCurrentPage(newPage);

    // Add the parameter for page number to the query string
    const params = {...query, [pageKey]: newPage};
    const queryParams = Object.entries(params).map(([key, value]) => {
      return key !== 'route' ? `${key}=${value}` : ''
    })
      .filter((param) => param !== '')
      .join('&')

    push(`${asPath.split('?')[0]}?${queryParams}`);
  };

  // Get the pagination model from the component
  const { pagination: paginationModel } = component?.getModels() || {}
  const pagination = paginationModel && page?.getContent<Pagination>(paginationModel)
  console.log('pagination', pagination)

  console.groupEnd()

  return (
    <div>
      <Typography variant='h3'>Search Results</Typography>
      <Typography variant='subtitle2' sx={{ fontWeight: 600 }}>{pagination?.getTotal()} Results for: "{searchTerm}"</Typography>
      <List>
        {pagination?.getItems().map((item: any, index: number) => {
          const document = page?.getContent(item)
          return (
            <ListItem key={index} disablePadding
              secondaryAction={
                <ArrowForwardIosIcon fontSize='small' color='disabled' />
              }
              sx={{
                border: '1px solid #ccc',
                '&:not(:last-child)': {
                  borderBottom: 'none'
                },
                '.MuiListItemSecondaryAction-root': {
                  lineHeight: '0',
                }
              }}
            >
              <ListItemButton component='a' href={document?.getUrl()}>
                <ListItemText
                  primary={document?.getData()?.title || document?.getData()?.displayName}
                />
              </ListItemButton>
            </ListItem>
          )
        })}
      </List>

      <Grid container spacing={2} justifyContent='center' marginTop={1}>
        <Grid item>
          <MuiPagination
            count={pagination?.getPages().length}
            page={currentPage}
            onChange={handlePageChange}
          />
        </Grid>
      </Grid>
    </div>
  )
}
