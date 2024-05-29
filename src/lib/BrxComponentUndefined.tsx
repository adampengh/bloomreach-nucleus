import { BrProps } from '@bloomreach/react-sdk'
import { Alert } from '@mui/material'

export const BrxComponentUndefined = ({ component, page}: BrProps) => {
  console.group('BrxComponentUndefined')
  console.log('component', component)
  console.groupEnd()

  return page?.isPreview() ? (
    // @ts-ignore
    <Alert severity='warning'>"{component?.getType()}": This component is not configured properly</Alert>
  ) : null
}
