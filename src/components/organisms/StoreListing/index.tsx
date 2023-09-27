import React from 'react'
import { BrProps } from '@bloomreach/react-sdk'
import { Reference } from '@bloomreach/spa-sdk'
import { Button, Container, Divider, Grid, Typography } from '@mui/material'
import _ from 'lodash'

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

  // Sort alphabetically by Country
  documents = documents?.sort((a: LocationProps, b: LocationProps) => {
    // console.log('a:b', a.address?.state?.selectionValues?.[0]?.key?.localeCompare(b.address?.state?.selectionValues?.[0]?.key))
    return a.address?.country?.selectionValues?.[0]?.label?.localeCompare(b.address?.country?.selectionValues?.[0]?.label)
  })

  // Sort alphabetically by State
  documents = documents?.sort((a: LocationProps, b: LocationProps) => {
    // console.log('a:b', a.address?.state?.selectionValues?.[0]?.key?.localeCompare(b.address?.state?.selectionValues?.[0]?.key))
    return a.address?.state?.selectionValues?.[0]?.key?.localeCompare(b.address?.state?.selectionValues?.[0]?.key)
  })


  // Group locations by Country
  let groupByCountry = documents && _.groupBy(documents, 'address.country.selectionValues[0].label')

  // console.log('groupByCountry', groupByCountry)
  // let groupByState = documents && _.groupBy(documents, 'address.state.selectionValues[0].label')

  return (
    <Container maxWidth={'lg'}>
      <Typography variant='h2' component='h1' sx={{ my: 3}}>Store Listing</Typography>
      <Grid container spacing={6}>
        {Object.entries(groupByCountry).map(([key, value]: any) => {
          return (
            <Grid item xs={12} key={key}>
              <Typography variant='h3' component='h3' sx={{ marginBottom: 2}}>{key}</Typography>
              <Divider />
              <Grid container spacing={2}>
                {value?.map((document: any, index: number) => {
                  const { title, address, googleMapsLink } = document
                  return (
                    <Grid key={index} item xs={6} lg={3}>
                      { title && <Typography variant="h5">{title}</Typography> }
                      { address &&
                        <div>
                          <Typography variant="body1">{address?.address1}</Typography>
                          <Typography variant="body1">{address?.address2}</Typography>
                          <Typography variant="body1">
                            {address?.city && <span>{address?.city}</span>}
                            , {address?.state?.selectionValues?.[0]?.key}
                            {address?.postalCode && <span> {address.postalCode}</span>}
                          </Typography>
                          <Typography variant="body1">{address?.country?.selectionValues?.[0].label}</Typography>
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
          )}
        )}
      </Grid>
    </Container>
  )
}
