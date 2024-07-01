import { BrxComponentWrapperProps } from '@/lib/BrxComponentWrapper'
import { Container, Typography } from '@mui/material'

export const Content = ({ document }: BrxComponentWrapperProps) => {
  const {
    content,
    title,
  } = document?.getData<any>();

  return (
    <Container maxWidth={'xl'} disableGutters sx={{ mb: 3 }}>
      {title && <Typography variant='h3' component='h3'>{title}</Typography>}
      {content && <Typography variant='body1' dangerouslySetInnerHTML={{ __html: content.value }} />}
    </Container>
  );
}
