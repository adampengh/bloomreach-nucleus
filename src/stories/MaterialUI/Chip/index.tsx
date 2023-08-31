import React from 'react'
import {
  Chip as MuiChip,
  ChipProps as MuiChipProps,
} from '@mui/material'

type ChipProps = Pick<MuiChipProps, 'avatar' | 'color' | 'icon' | 'label' | 'size' | 'variant' >

export const Chip = ({
  ...rest
}: ChipProps) =>
  <MuiChip {...rest} />
