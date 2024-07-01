import { useMemo } from 'react';
import Head from 'next/head'
import { NextPage } from 'next'
import axios, { AxiosError } from 'axios'
import cookie from 'cookie';
import { Cookies } from 'react-cookie';

// Utils
import { APOLLO_STATE_PROP_NAME, CommerceApiClientFactory } from '@bloomreach/connector-components-react';
import { initialize } from '@bloomreach/spa-sdk'
import { deleteUndefined, loadCommerceConfig } from '@/lib/utils'
import { buildConfiguration } from '@/lib/BrxConfiguration';
import { BaseLayout } from '@/layouts/abstract/base';
import { ProductListingAbstractLayout } from '@/layouts/abstract/ProductListingAbstractLayout';
import { ProductListingLayout } from '@/layouts/pages/ProductListingLayout';


let commerceClientFactory: CommerceApiClientFactory;

const ProductListingPage: NextPage<any> = ({
  configuration,
  page,
  commerceConfig,
  [APOLLO_STATE_PROP_NAME]: apolloState,
  cookies,
  query,
}): JSX.Element => {
  const {
    graphqlServiceUrl,
    connector,
    brAccountName: accountEnvId,
  } = commerceConfig;
  const defaultRequestHeaders = undefined;
  const defaultAnonymousCredentials = undefined;

  const factory = useMemo(() => {
    return commerceClientFactory ?? new CommerceApiClientFactory(
      graphqlServiceUrl,
      connector,
      defaultRequestHeaders,
      defaultAnonymousCredentials,
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [graphqlServiceUrl, connector, accountEnvId, defaultRequestHeaders, defaultAnonymousCredentials]);

  const reactCookies = cookies ? new Cookies(cookies) : undefined;

  return (
    <>
      <Head>
        <title>PLP | Bloomreach Nucleus</title>
      </Head>

      <BaseLayout
        configuration={configuration}
        page={page}
        commerceConfig={commerceConfig}
        apolloState={apolloState}
        reactCookies={reactCookies}
        graphqlServiceUrl={graphqlServiceUrl}
        connector={connector}
        factory={factory}
        query={query}
      >
        <ProductListingAbstractLayout>
          <ProductListingLayout
            query={query}
          />
        </ProductListingAbstractLayout>
      </BaseLayout>
    </>
  )
}


ProductListingPage.getInitialProps = async ({
  req: request,
  res: response,
  asPath: path,
  query,
}) => {
  // console.log("[getServerSideProps]: path=", path);
  // console.log("[getServerSideProps]: query=", query);

  const configuration = buildConfiguration(path ?? '/', query)
  let page: any = {};
  let pageJson = {};
  configuration.debug = true;
  const props: ProductListingPageProps = {
    configuration,
    query,
  }

  try {
    page = await initialize({ ...configuration, request, httpClient: axios as any });
    pageJson = page.toJSON();
  } catch(err) {
    if ((err as AxiosError).isAxiosError) {
      const axiosError = err as AxiosError;
      configuration.path = '/404'
      const fallbackPage = await initialize({ ...configuration, request, httpClient: axios as any });
      pageJson = fallbackPage.toJSON();
    } else {
      console.error('err', err)
    }
  } finally {
    props.page = pageJson
  }

  const commerceConfig = loadCommerceConfig(props.page, query);
  props.commerceConfig = commerceConfig

  if (!request || !response) {
    return props;
  }

  const cookies = cookie.parse(request.headers.cookie ?? '');
  props.cookies = cookies;

  const { graphqlServiceUrl, connector, brAccountName: accountEnvId } = commerceConfig;
  const defaultRequestHeaders = undefined;
  const defaultAnonymousCredentials = undefined;

  // For SSG and SSR always create a new Apollo Client
  commerceClientFactory = new CommerceApiClientFactory(
    graphqlServiceUrl,
    connector,
    defaultRequestHeaders,
    defaultAnonymousCredentials,
  );

  // Apollo client will go thru all components on the page and perform queries necessary.
  // The results will be stored in the cache for client-side rendering.
  // const pageProps = { pageProps: { ...props } };
  // const apolloData = await commerceClientFactory.getDataFromTree(<MyApp.AppTree {...pageProps} />);
  // console.log('[getServerSideProps]: apolloData=', apolloData);
  // props = { ...props, ...apolloData.stateProp };

  // eslint-disable-next-line max-len
  // Hack needed to avoid JSON-Serialization validation error from Next.js https://github.com/zeit/next.js/discussions/11209
  // >>> Reason: `undefined` cannot be serialized as JSON. Please use `null` or omit this value all together.
  if (process.env.NODE_ENV !== 'production') {
    deleteUndefined(props);
  }

  return props;
};

export default ProductListingPage
