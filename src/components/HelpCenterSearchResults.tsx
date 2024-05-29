import { useRouter } from 'next/router'
import { BrProps } from '@bloomreach/react-sdk'
import { Pagination } from '@bloomreach/spa-sdk'
import {
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Typography
} from '@mui/material'
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

export const HelpCenterSearchResults = ({ component, page }: BrProps) => {
  // Get the search term from the query string
  const router = useRouter()
  const { q: searchTerm } = router.query

  // Get the pagination model from the component
  const { pagination: paginationModel } = component?.getModels() || {}
  const pagination = paginationModel && page?.getContent<Pagination>(paginationModel)

  return (
    <div>
      <Typography variant='h3'>Search Results</Typography>
      <Typography variant='subtitle2' sx={{ fontWeight: 600 }}>Results for: "{searchTerm}"</Typography>
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
                <ListItemText primary={document?.getData()?.title || document?.getData()?.displayName} />
              </ListItemButton>
            </ListItem>
          )
        })}
      </List>
    </div>
  )
}
