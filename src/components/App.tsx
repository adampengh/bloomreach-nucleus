import axios from 'axios';
import { BrPage, BrPageContext } from '@bloomreach/react-sdk';
import { PageModel } from '@bloomreach/spa-sdk';

// Components
import { CssBaseline } from '@mui/material';
import { Meta } from '@/components/Meta';
import {
  Footer,
  Header,
  Hero,
  StoreListing,
  StoreLocator,
} from '@/components';

// Context
import { CommerceApiClientFactory, CommerceConnectorProvider } from '@bloomreach/connector-components-react';
import { CommerceContextProvider } from '@/context/CommerceContext';
import ThemeProvider from '@/themes/ThemeProvider';

// Layouts
import PageLayout from '@/layouts';

// Utils
import { CommerceConfig } from '@/lib/utils';
import { useMemo } from 'react';
import { ChannelContextProvider } from '@/context/ChannelContext';
import { ChannelConfig } from '@/lib/channel';

interface AppProps {
  configuration: any;
  page: PageModel;
  commerceConfig: CommerceConfig;
  commerceClientFactory?: CommerceApiClientFactory;
  apolloState?: string;
  channelConfig: ChannelConfig;
}

const App = ({
  configuration,
  page,
  commerceConfig,
  commerceClientFactory,
  apolloState,
  channelConfig,
}: AppProps): JSX.Element => {
  const mapping = {
    Hero,
    StoreListing,
    StoreLocator,
  }

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
      false,
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [graphqlServiceUrl, connector, accountEnvId, defaultRequestHeaders, defaultAnonymousCredentials]);

  return (
    <CommerceConnectorProvider
      connector={connector}
      graphqlServiceUrl={graphqlServiceUrl}
      commerceClientFactory={factory}
      apolloState={apolloState}
    >
      <CommerceContextProvider commerceConfig={commerceConfig} commerceClientFactory={factory}>
        <ChannelContextProvider channelConfig={channelConfig}>
          <ThemeProvider>
            <CssBaseline />
            <BrPage configuration={{ ...configuration, httpClient: axios as any }} mapping={mapping} page={page}>
              <BrPageContext.Consumer>
                {(page) => (
                  <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
                    {page && <Meta page={page} /> }
                    <Header />
                    <PageLayout page={page} />
                    <Footer />
                  </div>
                )}
              </BrPageContext.Consumer>
            </BrPage>
          </ThemeProvider>
        </ChannelContextProvider>
      </CommerceContextProvider>
    </CommerceConnectorProvider>
  )
}

export default App;
