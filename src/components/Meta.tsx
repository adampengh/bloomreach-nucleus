import Head from 'next/head';
import { Document, ImageSet, Page } from '@bloomreach/spa-sdk';
import { useRouter } from 'next/router';

interface MetaProps {
  page: Page;
}

export function Meta({ page }: MetaProps): JSX.Element {
  const router = useRouter();
  const document = page.getDocument<Document>();
  const { title, description, preventIndexing, ogCompound } = document?.getData<any>() ?? {};
  const { description: ogDescription, locale, type, url, image: imageRef } = ogCompound ?? {};
  const image = imageRef && page.getContent<ImageSet>(imageRef);
  const canonicalUrl = url || router.asPath;

  return (
    <Head>
      {title && (<>
        <title key="title">{title}</title>
        <meta property="og:title" content={title} />
      </>)}
      {description && <meta key="description" name="description" content={description} />}
      {preventIndexing && <meta name="robots" content="noindex, nofollow" />}
      {ogCompound && (<>
        {ogDescription && <meta property="og:description" content={ogDescription} />}
        {locale && <meta property="og:locale" content={locale} />}
        {type && <meta property="og:type" content={type} />}
        {canonicalUrl && <meta property="og:url" content={canonicalUrl} />}
        {image && <meta property="og:image" content={image.getOriginal()?.getUrl()} />}
      </>)}
    </Head>
  );
}
