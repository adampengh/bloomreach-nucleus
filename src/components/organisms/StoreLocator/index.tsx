import React, { useContext, useState } from 'react'
import { BrProps } from '@bloomreach/react-sdk';
import { Reference } from '@bloomreach/spa-sdk';
import { GoogleMap, InfoWindowF, MarkerF, useLoadScript } from '@react-google-maps/api';
import { Button, Link, Typography } from '@mui/material';
import _ from 'lodash'

import styles from './StoreLocator.module.scss'

interface LocationProps {
  address: any;
  title?: string;
  googleMapsLink?: string;
  website?: string;
  phone?: string;
  latitude?: number;
  longitude?: number;
}

export const StoreLocator = ({ component, page }: BrProps) => {
  // Component State
  const [activeMarker, setActiveMarker] = useState(-1);

  // BrX Component Parameters
  // console.log('parameters', component?.getParameters())
  const {
    mapHeight = '90vh',
    mapWidth = '100%',
    googleMapsApiKey = ''
  } = component?.getParameters() || {}

  // Initialize Google Maps
  const { isLoaded } = useLoadScript({
    id: 'google-map-script',
    googleMapsApiKey: googleMapsApiKey
  })

  // BrX Query Component Model
  const { pagination: paginationRef } = component?.getModels() || {}
  const pagination = paginationRef && page?.getContent(paginationRef)
  const items = pagination?.getItems()
  let locations = items?.map((itemRef: Reference) => page?.getContent(itemRef))
  locations = locations?.map((document: any) => document.getData())

  // Sort locations alphabetically by address/state
  locations = locations?.sort((a: LocationProps, b: LocationProps) => {
    return a.address?.state?.selectionValues?.[0]?.key?.localeCompare(b.address?.state?.selectionValues?.[0]?.key)
  })

  const handleActiveMarker = (marker: any) => {
    if (marker === activeMarker) {
      return;
    }
    setActiveMarker(marker);
  };

  const handleOnLoad = (map: any) => {
    const bounds = new google.maps.LatLngBounds();
    locations.forEach((location: any) => {
      const { latitude: lat, longitude: lng } = location?.geolocation
      if (!lat && !lng) return null
      bounds.extend({ lat, lng });
    })
    map.fitBounds(bounds);
  };

  const containerStyle = {
    height: mapHeight,
    width: mapWidth,
    margin: '0 auto'
  };

  return (
    <div>
      { isLoaded && (
        <GoogleMap
          mapContainerStyle={containerStyle}
          onClick={() => setActiveMarker(-1)}
          onLoad={handleOnLoad}
        >
          {locations?.map((location: any, id: number) => {
            const { latitude: lat, longitude: lng } = location?.geolocation
            if (!lat && !lng) return null
            return (
              <MarkerF
                key={id}
                position={{ lat, lng }}
                zIndex={999}
                onClick={() => handleActiveMarker(id)}
              >
                {activeMarker === id && (
                  <InfoWindowF onCloseClick={() => setActiveMarker(-1)}>
                    <MarkerDetails location={location} />
                  </InfoWindowF>
                )}
              </MarkerF>
            )
          })}
        </GoogleMap>
      )}
    </div>
  )
}

const MarkerDetails = ({location}: any) => {
  const { title, address, googleMapsLink, website } = location
  return (
    <div className={`${styles['info-window']}`}>
      <Typography variant='h4' sx={{ marginBottom: 1 }}>{title}</Typography>
      { address &&
        <div>
          <Typography variant="body1">{address?.address1}</Typography>
          <Typography variant="body1">{address?.address2}</Typography>
          <Typography variant="body1">
            {address?.city && <span>{address?.city}</span>}
            , {address?.state?.selectionValues?.[0]?.key}
            {address?.postalCode && <span> {address.postalCode}</span>}
          </Typography>
        </div>
      }
      { website && (
        <div style={{ marginTop: '1rem' }}>
          <Typography variant="h5">Website</Typography>
          <Link
            href={website}
            underline='hover'
            // sx={{ color: '#fff' }}
          >
            <Typography variant="body1">{website}</Typography>
          </Link>
        </div>
      )}
      { address?.phone && (
        <div style={{ marginTop: '1rem' }}>
          <Typography variant="h5">Telephone</Typography>
          <Link
            href={`tel:${address?.phone}`}
            underline='hover'
            // sx={{ color: '#fff' }}
          >
            <Typography variant="body1" >{address.phone}</Typography>
          </Link>
        </div>
      )}
      { googleMapsLink &&
        <Button
          // color='inherit'
          href={googleMapsLink}
          size='small'
          sx={{ marginTop: 3}}
          target='_blank'
          variant='outlined'
        >Get Directions</Button>
      }
    </div>
  )
}
