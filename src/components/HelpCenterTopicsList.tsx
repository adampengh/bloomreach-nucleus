import { BrProps } from "@bloomreach/react-sdk"
import {
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Typography
} from '@mui/material'
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';


export const HelpCenterTopicsList = ({ component, page }: BrProps) => {
  console.group('HelpCenterDocumentList')
  console.log('HelpCenterDocumentList [component]:', component);

  const document: any = page?.getDocument()
  console.log('HelpCenterDocumentList [document]:', document?.getData())

  const {
    documents,
    heading,
  } = document?.getData() || {}

  console.groupEnd()

  return (
    <div>
      {heading && <Typography variant='h3'>{heading}</Typography>}
      <List>
        {documents?.map((item: any, index: number) => {
          const document = page?.getContent(item)
          console.log('HelpCenterDocumentList [document];', document?.getData())
          return (
            <ListItem
              key={index}
              disablePadding
              secondaryAction={
                <ArrowForwardIosIcon fontSize='small' color="disabled" />
              }
              sx={{
                border: '1px solid #ccc',
                '&:not(:last-child)': {
                  borderBottom: 'none'
                },
              }}
            >
              <ListItemButton component='a' href={document?.getUrl()}>
                <ListItemText
                  primary={document?.getData()?.title || document?.getData()?.displayName}
                  secondary={document?.getData()?.subHeading}
                />
              </ListItemButton>
            </ListItem>
          )
        })}
      </List>
    </div>
  )
}
