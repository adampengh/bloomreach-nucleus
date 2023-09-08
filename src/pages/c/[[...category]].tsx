import { useContext, useMemo } from 'react';
import Head from 'next/head'
import { NextPage } from 'next'
import axios, { AxiosError } from 'axios'
import cookie from 'cookie';
import { Cookies, CookiesProvider } from 'react-cookie';

// Components
import { Breadcrumbs, Footer, Header, ProductGrid } from '@/components';
import { Container, CssBaseline, Grid, Typography } from '@mui/material';

// Context
import { CommerceContext, CommerceContextProvider } from '@/context/CommerceContext';

// Utils
import { APOLLO_STATE_PROP_NAME, CommerceApiClientFactory, CommerceConnectorProvider, useProductGridCategory } from '@bloomreach/connector-components-react';
import { initialize } from '@bloomreach/spa-sdk'
import { BrComponent, BrPage } from '@bloomreach/react-sdk';
import { BrxComponentMapping } from '@/components/BrxComponentMapping';
import { buildConfiguration, deleteUndefined, loadCommerceConfig } from '@/lib/utils'
import ThemeProvider from '@/themes/ThemeProvider';


let commerceClientFactory: CommerceApiClientFactory;


const ProductListingPage:NextPage<any> = ({
  configuration,
  page,
  commerceConfig,
  [APOLLO_STATE_PROP_NAME]: apolloState,
  cookies,
  query,
}): JSX.Element => {
  console.log('ProductListingPage')
  // console.log('configuration', configuration)
  // console.log('page', page)
  console.log('commerceConfig', commerceConfig)
  // console.log('query', query)

  const { category } = query
  const categoryId = category?.[0]
  console.log('categoryId', categoryId)

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
      false,
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [graphqlServiceUrl, connector, accountEnvId, defaultRequestHeaders, defaultAnonymousCredentials]);

  const reactCookies = cookies ? new Cookies(cookies) : undefined;



  return (
    <>
      <Head>
        <title>PLP | Bloomreach Nucleus</title>
      </Head>

      <CookiesProvider cookies={reactCookies}>
        <CommerceConnectorProvider
          connector={connector}
          graphqlServiceUrl={graphqlServiceUrl}
          commerceClientFactory={factory}
          apolloState={apolloState}
        >
          <CommerceContextProvider commerceConfig={commerceConfig} commerceClientFactory={factory}>
            <ThemeProvider>
              <CssBaseline />
              <BrPage configuration={{ ...configuration, httpClient: axios as any }} mapping={BrxComponentMapping} page={page}>
                <BrComponent path="Header">
                  <Header />
                </BrComponent>

                <Container maxWidth={false} disableGutters>
                  <BrComponent path="top" />
                </Container>
                <Container maxWidth='xl' sx={{ py: 4 }}>
                  <Grid container spacing={4}>
                    <Grid item xs={12}>
                      <Breadcrumbs />
                    </Grid>
                    <Grid item xs={12}>
                      <BrComponent path="main" />
                    </Grid>
                    <Grid item xs={12}>
                      <Typography variant="h2" align='center' component='h1'>Category</Typography>
                    </Grid>
                    <Grid item xs={12}>
                      <ProductGrid
                        variation='retail'
                        categoryId={categoryId}
                        query={query}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <BrComponent path="bottom" />
                    </Grid>
                  </Grid>
                </Container>

                <BrComponent path="Footer">
                  <Footer />
                </BrComponent>
              </BrPage>
            </ThemeProvider>
          </CommerceContextProvider>
        </CommerceConnectorProvider>
      </CookiesProvider>
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
  console.log("[getServerSideProps]: query=", query);

  const configuration = buildConfiguration(path ?? '/', query)
  let page: any = {};
  let pageJson = {};
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
      // console.error('axiosError')
      configuration.path = '/404'
      // console.log('configuration', configuration)
      const fallbackPage = await initialize({ ...configuration, request, httpClient: axios as any });
      pageJson = fallbackPage.toJSON();
      // console.log('page', page)
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
    true,
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
