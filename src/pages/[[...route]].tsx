import { NextPage } from 'next'
import Head from 'next/head'
import App from '@/components/App'
import { Configuration, PageModel, initialize } from '@bloomreach/spa-sdk'
import axios from 'axios'
import { APOLLO_STATE_PROP_NAME, CommerceApiClientFactory } from '@bloomreach/connector-components-react';
import { buildConfiguration, CommerceConfig, deleteUndefined, loadCommerceConfig } from '@/lib/utils'
// import { Montserrat } from 'next/font/google'
// import styles from '@/styles/Home.module.css'

// const montserrat = Montserrat({ subsets: ['latin'] })

let commerceClientFactory: CommerceApiClientFactory;

interface IndexPageProps {
  configuration: Omit<Configuration, 'httpClient'>;
  page: PageModel;
  commerceConfig: CommerceConfig;
  [APOLLO_STATE_PROP_NAME]?: any;
  // cookies?: Record<string, string>;
}

const Index: NextPage<any> = ({
  configuration,
  page,
  commerceConfig,
  [APOLLO_STATE_PROP_NAME]: apolloState,
}): JSX.Element => {
  return <App
    configuration={configuration}
    page={page}
    commerceConfig={commerceConfig}
    apolloState={apolloState}
    commerceClientFactory={commerceClientFactory}
  />
}

Index.getInitialProps = async ({
  req: request,
  res: response,
  asPath: path,
  query,
}) => {
  // console.log("[getServerSideProps]: path=", path);
  // console.log("[getServerSideProps]: query=", query);

  const configuration = buildConfiguration(path ?? '/', query)
  const page = await initialize({ ...configuration, request, httpClient: axios as any });
  const pageJson = page.toJSON();

  const commerceConfig = loadCommerceConfig(pageJson, query);

  const props: IndexPageProps = {
    configuration,
    commerceConfig,
    page: pageJson,
  };

  if (!request || !response) {
    return props;
  }

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

export default Index
