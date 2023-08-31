import React from 'react'

import styles from './Swatches.module.scss'

export const Swatches = () => {
  return (
    <div className={`${styles['swatches']}`}>
      {/* <p>6 colors</p> */}
      <ul>
        <li>
          <span style={{ background: '#AA4323' }} />
        </li>
        <li>
          <span style={{ background: '#671269' }} />
        </li>
        <li>
          <span style={{ background: '#5C7A1D' }} />
        </li>
        <li>
          <span style={{ background: '#43494F' }} />
        </li>
        <li>
          <span style={{ background: '#007571' }} />
        </li>
        <li>
          <span style={{ background: '#1D5259' }} />
        </li>
      </ul>
    </div>
  )
}
