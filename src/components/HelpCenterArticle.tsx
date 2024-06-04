import { BrProps } from "@bloomreach/react-sdk"
import { Document } from "@bloomreach/spa-sdk"
import { Divider, Typography } from "@mui/material"

export const HelpCenterArticle = ({ component, page }: BrProps) => {
  console.group('HelpCenterArticle')
  console.log('HelpCenterArticle [component]', component?.getModels())

  const document: Document | undefined = page?.getDocument();
  console.log('HelpCenterArticle [document]', document?.getData())

  const {
    title,
    content,
  } = document?.getData<any>() || {}

  console.groupEnd()

  return (
    <div>
      {title && <Typography variant='h3'>{title}</Typography>}
      <Divider />
      {content && <div dangerouslySetInnerHTML={{ __html: content.value }} />}
    </div>
  )
}
