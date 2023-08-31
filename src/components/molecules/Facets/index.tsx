import { Checkbox, FormControlLabel, FormGroup, Grid, Typography } from '@mui/material'
import React from 'react'

export const Facets = () => {
  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <FacetGroup />
      </Grid>
      <Grid item xs={12}>
        <FacetGroup />
      </Grid>
      <Grid item xs={12}>
        <FacetGroup />
      </Grid>
      <Grid item xs={12}>
        <FacetGroup />
      </Grid>
    </Grid>
  )
}

const FacetGroup = () => {
  return (
    <FormGroup>
      <Typography variant='caption'>Group</Typography>
      <FormControlLabel control={<Checkbox size='small' defaultChecked />} label="Label (12)" />
      <FormControlLabel control={<Checkbox size='small' />} label="Label (10)" />
      <FormControlLabel control={<Checkbox size='small' />} label="Label (8)" />
    </FormGroup>
  )
}
