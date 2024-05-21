import { BrProps } from '@bloomreach/react-sdk'
import { Alert } from '@mui/material'

export const BrxComponentUndefined = ({ component, page}: BrProps) => {

  return page?.isPreview() ? (
    // @ts-ignore
    <Alert severity='warning'>"{component?.getLabel()}": This component is not configured properly</Alert>
  ) : null

}
