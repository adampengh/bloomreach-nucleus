import { default as NextImage } from 'next/image'

import styles from './Image.module.scss'

export const Image = ({ src, alt, width, height, srcSecondary }: {
  src: string;
  alt: string;
  width: number;
  height: number;
  srcSecondary?: string;
}) => {
  return (
    <div className={`${styles['brx-image']}`}>
      <span className={`${styles['brx-image__primary']}`}>
        <img src={src} alt={alt} />
        <NextImage
          src={src}
          alt={alt}
          width={width}
          height={height}
        />
      </span>
      { srcSecondary &&
        <span className={`${styles['brx-image__secondary']}`}>
          <img src={srcSecondary} alt={alt} />
        </span>
      }
    </div>
  )
}
