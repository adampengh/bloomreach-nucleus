import axios from "axios";
import React from "react";
import ThemeProvider from "@/themes/ThemeProvider";
import { CommerceConnectorProvider, APOLLO_STATE_PROP_NAME, CommerceApiClientFactory } from '@bloomreach/connector-components-react';
import { BrComponent, BrPage, BrPageContext } from "@bloomreach/react-sdk";
import { CommerceContextProvider } from "@/context/CommerceContext";
import { Container, CssBaseline } from "@mui/material";
import { CookiesProvider } from "react-cookie";

import { BrxComponentMapping } from "@/lib/BrxComponentMapping";
import { Footer, Header, ScrollToTopButton } from "@/components";
import { BrPixel } from "@/components/BrPixel";

// Redux
import { Provider } from "react-redux";
import { store } from "@/redux/store";
import { Configuration, Page, PageModel } from "@bloomreach/spa-sdk";
import { CommerceConfig } from "@/lib/utils";

type BaseLayoutProps = {
  configuration: Omit<Configuration, 'httpClient'>;
  page: PageModel;
  commerceConfig: CommerceConfig;
  [APOLLO_STATE_PROP_NAME]?: any;
  apolloState?: any;
  reactCookies?: any;
  graphqlServiceUrl: string;
  connector: string;
  factory: CommerceApiClientFactory;
  query?: any;
  children: any;
}

export const BaseLayout = ({
  configuration,
  page,
  commerceConfig,
  apolloState,
  reactCookies,
  graphqlServiceUrl,
  connector,
  factory,
  children,
}: BaseLayoutProps) => {
  const { discoveryAccountId, discoveryDomainKey } = commerceConfig;

  return (
    <Provider store={store}>
      <CookiesProvider cookies={reactCookies}>
        <CommerceConnectorProvider
          connector={connector}
          graphqlServiceUrl={graphqlServiceUrl}
          commerceClientFactory={factory}
          apolloState={apolloState}
        >
          <CommerceContextProvider
            commerceConfig={commerceConfig}
            commerceClientFactory={factory}
          >
            <BrPage
              configuration={{ ...configuration, httpClient: axios as any }}
              mapping={BrxComponentMapping}
              page={page}
            >
              <BrPageContext.Consumer>
                {(contextPage) => {
                  return (
                    <Container className="app-root" maxWidth={false} disableGutters>
                      <ThemeProvider
                        theme={contextPage?.getChannelParameters()?.theme}
                      >
                        <CssBaseline />
                        <BrComponent path="Header">
                          <Header />
                        </BrComponent>
                        {children}
                        <BrComponent path="Footer">
                          <Footer />
                        </BrComponent>
                        <ScrollToTopButton />
                        <BrPixel
                          accountId={discoveryAccountId ?? ""}
                          domainKey={discoveryDomainKey ?? ""}
                          page={contextPage!}
                          pageType="search"
                          pageLabels="pacific,nut,bolt,commerce"
                          type="pageview"
                        />
                      </ThemeProvider>
                    </Container>
                  );
                }}
              </BrPageContext.Consumer>
            </BrPage>
          </CommerceContextProvider>
        </CommerceConnectorProvider>
      </CookiesProvider>
    </Provider>
  );
};
