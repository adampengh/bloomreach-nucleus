import axios from 'axios'
import cookie from 'cookie';
import { NextPage } from 'next'
import { useMemo } from 'react';
import { Cookies } from 'react-cookie';
import { APOLLO_STATE_PROP_NAME, CommerceApiClientFactory } from '@bloomreach/connector-components-react';
import { Configuration, PageModel, initialize } from '@bloomreach/spa-sdk'
import { CommerceConfig, deleteUndefined, loadCommerceConfig } from '@/lib/utils'
import { buildConfiguration } from '@/lib/BrxConfiguration';
import { BaseLayout } from '@/layouts/abstract/base';
import PageLayout from '@/layouts';
import { BrPageContext } from '@bloomreach/react-sdk';

let commerceClientFactory: CommerceApiClientFactory;

interface IndexPageProps {
  configuration: Omit<Configuration, 'httpClient'>;
  page: PageModel;
  commerceConfig: CommerceConfig;
  [APOLLO_STATE_PROP_NAME]?: any;
  cookies?: Record<string, string>;
  query?: any;
}


const Index: NextPage<IndexPageProps> = ({
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
      {/* <Counter /> */}
      <BrPageContext.Consumer>
        {(pageContext) => (
          <PageLayout page={pageContext} />
        )}
      </BrPageContext.Consumer>
    </BaseLayout>
  )
}

Index.getInitialProps = async ({ req: request, res: response, asPath: path, query }) => {
  // console.log("[...route] getInitialProps: path=", path);
  // console.log("[getInitialProps]: query=", query);

  const configuration = buildConfiguration(path ?? '/', query)
  const page = await initialize({ ...configuration, request, httpClient: axios as any });
  const pageJson = page.toJSON();
  const commerceConfig = loadCommerceConfig(pageJson, query);
  const props: IndexPageProps = {
    configuration,
    commerceConfig,
    page: pageJson,
    query,
  };

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
    accountEnvId,
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
