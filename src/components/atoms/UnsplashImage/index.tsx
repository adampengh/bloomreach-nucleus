export const UnsplashImage = ({
  unsplashImage
}: {
  unsplashImage: string
}) => {
  console.group('UnsplashImage Component')

  console.log('unsplashImage', JSON.parse(unsplashImage))
  const {
    alt_description,
    height,
    urls: {
      full,
      raw,
      regular,
      small,
      thumb,
    },
    width,
  } = JSON.parse(unsplashImage)

  console.groupEnd()
  return (
    <>
      <picture>
        <source srcSet={full} media="(min-width: 1200px)" />
        <source srcSet={regular} media="(min-width: 320px)" />
        <img src={full} alt={alt_description || ''} />
      </picture>
    </>
  )
}
