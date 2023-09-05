import React, { useEffect, useState } from 'react'
import { Typography } from '@mui/material'

import styles from './Swatches.module.scss'

export const Swatches = ({
  swatches,
  maxItems = 5,
}: {
  swatches: any;
  maxItems?: number;
}) => {
  const [swatchesToShow, setSwatchesToShow] = useState<any>(null)
  const [swatchesToHide, setSwatchesToHide] = useState<any>(null)

  useEffect(() => {
    if (swatches?.length) {
      setSwatchesToShow(swatches?.slice(0, maxItems))
      setSwatchesToHide(swatches?.slice(maxItems))
    }
  }, [maxItems, swatches])

  if (!swatches?.length) return null

  const handleMoreClick = (e: any) => {
    e.preventDefault()
    setSwatchesToShow(swatches)
    setSwatchesToHide(null)
  }

  return (
    <div className={`${styles['swatches']}`}>
      <p>{swatches?.length} colors</p>
      <ul className={`${styles['swatches__list']}`}>
        {swatchesToShow?.map((swatch: any, index: number) => {
          return (
            <li key={index} className={`${styles['swatches__list-item']}`}>
              <span style={{ background: `${swatch.color}` }} />
            </li>
          )}
        )}
        { swatchesToHide && <li className={`${styles['swatches__list-item']}`}>
          <button onClick={handleMoreClick}>
            <Typography variant='body2'>+{swatchesToHide?.length}</Typography>
          </button>
        </li> }
      </ul>
    </div>
  )
}
