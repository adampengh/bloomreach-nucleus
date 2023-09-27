import axios from 'axios'
import React from 'react'
import ThemeProvider from '../../themes/ThemeProvider'
import { CommerceConnectorProvider } from '@bloomreach/connector-components-react'
import { BrComponent, BrPage, BrPageContext } from '@bloomreach/react-sdk'
import { CommerceContextProvider } from '../../context/CommerceContext'
import { CssBaseline} from '@mui/material'
import { CookiesProvider } from 'react-cookie'

import { BrxComponentMapping } from '../../components/BrxComponentMapping'
import { Footer, Header, ScrollToTopButton } from '../../components'
import { BrPixel } from '@/components/BrPixel'


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
}: any) => {
  const {
    discoveryAccountId,
    discoveryDomainKey,
  } = commerceConfig;

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
                {(contextPage) => {
                  return (
                    <>
                      <BrComponent path="Header">
                        <Header />
                      </BrComponent>
                      {children}
                      <BrComponent path="Footer">
                        <Footer />
                      </BrComponent>
                      <ScrollToTopButton />
                      <BrPixel
                        accountId={discoveryAccountId ?? ''}
                        domainKey={discoveryDomainKey ?? ''}
                        page={contextPage!}
                        pageType="search"
                        pageLabels="pacific,nut,bolt,commerce"
                        type="pageview"
                      />
                    </>
                  )
                }}
              </BrPageContext.Consumer>
            </BrPage>
          </ThemeProvider>
        </CommerceContextProvider>
      </CommerceConnectorProvider>
    </CookiesProvider>
  )
}
