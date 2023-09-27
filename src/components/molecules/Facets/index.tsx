import React from 'react'
import { Checkbox, FormControlLabel, FormGroup, Grid, Link, Typography } from '@mui/material'

export const Facets = ({ facetResult }: any) => {
  // console.log('Facets', facetResult)
  return (
    <Grid container spacing={3}>
      {facetResult?.fields?.map((facet: any, index: number) => (
        <Grid key={index} item xs={12}>
          <FacetGroup facet={facet} />
        </Grid>
      ))}
    </Grid>
  )
}

const FacetGroup = ({ facet }: any) => {
  if (!facet) return null
  // console.log('facet', facet)

  const {
    id,
    name,
    values
  } = facet

  return (
    <FormGroup>
      <Typography variant='caption' sx={{ fontWeight: 700 }}>{name}</Typography>
      {values?.
        filter((value: any, index: number) => index < 6)
        .map((value: any, index: number) => (
          <FormControlLabel key={index} control={<Checkbox size='small' />} label={`${value.name} (${value.count})`} />
        ))}

      <Link>More</Link>
    </FormGroup>
  )
}
