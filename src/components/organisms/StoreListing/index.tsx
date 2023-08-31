import { BrProps } from '@bloomreach/react-sdk'
import { Reference } from '@bloomreach/spa-sdk'
import { Button, Container, Divider, Grid, Typography } from '@mui/material'
import React from 'react'
const _ = require('lodash')

interface LocationProps {
  address: any;
  title?: string;
  googleMapsLink?: string;
}

export const StoreListing = ({ component, page }: BrProps) => {
  if (!component || !page) return null

  const { pagination: paginationRef } = component.getModels()
  const pagination = paginationRef && page.getContent(paginationRef)

  const items = pagination?.getItems()
  let documents = items?.map((itemRef: Reference) => page?.getContent(itemRef))
  documents = documents?.map((document: any) => document.getData())
  console.log('documents', documents)

  // Group locations by state
  let groupByState = documents && _.groupBy(documents, 'address.state.selectionValues[0].label')
  console.log('groupByState', groupByState)

  Object.entries(groupByState).map(([key, value]) => {
    console.log('key', key)
    console.log('value', value)
  })


  // Sort alphabetically by address/state
  // documents = documents?.sort((a: LocationProps, b: LocationProps) => {
  //   console.log('a:b', a.address?.state.localeCompare(b.address?.state))
  //   return a.address?.state.localeCompare(b.address?.state)
  // })

  return (
    <Container maxWidth={'xl'}>
      <Typography variant='h3' component='h1' sx={{ my: 3}}>Store Listing</Typography>

      <Grid container spacing={6}>
      {Object.entries(groupByState).map(([key, value]: any) => {
        return (
          <Grid item xs={12} key={key}>
            <Typography variant='h4' component='h3' sx={{ marginBottom: 2}}>{key}</Typography>
            <Divider />
            <Grid container spacing={2}>
              {value?.map((document: any, index: number) => {
                const { title, address, googleMapsLink } = document
                return (
                  <Grid key={index} item xs={6} lg={3}>
                    { title && <Typography variant="h5">{title}</Typography> }
                    { address &&
                      <div>
                        <Typography variant="body2">{address?.address1}</Typography>
                        <Typography variant="body2">{address?.address2}</Typography>
                        <Typography variant="body2">
                          {address?.city && <span>{address?.city}</span>}
                          , {address?.state?.selectionValues?.[0]?.key}
                          {address?.postalCode && <span> {address.postalCode}</span>}
                        </Typography>
                      </div>
                    }
                    { googleMapsLink &&
                      <Button
                        color='primary'
                        href={googleMapsLink}
                        size='small'
                        sx={{ marginTop: 3}}
                        target='_blank'
                        variant='outlined'
                      >Get Directions</Button> }
                  </Grid>
                )}
              )}
            </Grid>
          </Grid>
        )
      })}
      </Grid>
    </Container>
  )
}
