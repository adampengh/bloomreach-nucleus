import { useMemo } from 'react';
import axios from 'axios';
import { BrComponent, BrPage, BrPageContext } from '@bloomreach/react-sdk';
import { PageModel } from '@bloomreach/spa-sdk';
import { Cookies, CookiesProvider } from 'react-cookie';

// Components
import { Container, CssBaseline } from '@mui/material';
import { Meta } from '../components/Meta';
import {
  Footer,
  Header,
  ScrollToTopButton,
} from '../components';

// Context
import { CommerceApiClientFactory, CommerceConnectorProvider } from '@bloomreach/connector-components-react';
import { CommerceContextProvider } from '../context/CommerceContext';
import ThemeProvider from '../themes/ThemeProvider';

// Layouts
import PageLayout from '../layouts';

// Utils
import { BrxComponentMapping } from '../lib/BrxComponentMapping';
import { CommerceConfig } from '../lib/utils';

interface AppProps {
  configuration: any;
  page: PageModel;
  commerceConfig: CommerceConfig;
  commerceClientFactory?: CommerceApiClientFactory;
  apolloState?: string;
  cookies?: Record<string, string>;
}

const App = ({
  configuration,
  page,
  commerceConfig,
  commerceClientFactory,
  apolloState,
  cookies,
}: AppProps): JSX.Element => {
  const {
    graphqlServiceUrl,
    connector,
    discoveryAccountId,
    discoveryDomainKey,
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
              <BrPageContext.Consumer>
                {(page) => (
                  <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
                    {page && <Meta page={page} /> }
                    <BrComponent path="Header">
                      <Header />
                    </BrComponent>
                    <Container maxWidth={false} disableGutters sx={{ pb: '100px' }}>
                      <PageLayout page={page} />
                    </Container>
                    <BrComponent path="Footer">
                      <Footer />
                    </BrComponent>
                    { !page?.isPreview() && <ScrollToTopButton /> }
                  </div>
                )}
              </BrPageContext.Consumer>
            </BrPage>
          </ThemeProvider>
        </CommerceContextProvider>
      </CommerceConnectorProvider>
    </CookiesProvider>
  )
}

export default App;
