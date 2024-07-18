import { Configuration } from '@bloomreach/spa-sdk';
import { ParsedUrlQuery } from 'querystring';
import {
  CONSTANTS,
  NEXT_PUBLIC_BRX_ENDPOINT,
  NEXT_PUBLIC_BRX_MULTI_TENANT_SUPPORT,
  NEXT_PUBLIC_BRX_DEBUG,
} from './constants';

export type BuildConfigurationOptions = {
  endpoint: string | (string | null)[];
  baseUrl: string;
};
export type ConfigurationBuilder = Omit<Configuration & Partial<BuildConfigurationOptions>, 'httpClient'>;

/**
 * Function to build the BrX configuration object
 * @param path {string} the path of the request URL
 * @param query {ParsedUrlQuery} the query string of the request URL
 * @param endpoint {string}
 * @returns {ConfigurationBuilder}
 */
export const buildConfiguration = (
  path: string,
  query: ParsedUrlQuery,
  endpoint: string = NEXT_PUBLIC_BRX_ENDPOINT,
  multiTenantSupport: boolean = Boolean(NEXT_PUBLIC_BRX_MULTI_TENANT_SUPPORT),
  debug: boolean = Boolean(NEXT_PUBLIC_BRX_DEBUG) || false,
) => {
  // console.log('buildCongiguration [path]', path)
  // console.log('buildCongiguration [query]', query)

  const configuration: ConfigurationBuilder = {
    endpoint: endpoint,
    path: path,
    debug,
  }

  const endpointParameter = query[CONSTANTS.PREVIEW_ENDPOINT_PARAM];
  if (multiTenantSupport && endpointParameter) {
    console.log('buildCongiguration [multiTenantSupport endpoint]', endpointParameter)
    configuration.endpoint = endpointParameter;
  }

  return configuration
}

export const buildAppRouterConfiguration = (
  path: string,
  searchParams: { [key: string]: string | string[] | undefined },
  endpoint: string = NEXT_PUBLIC_BRX_ENDPOINT,
  multiTenantSupport: boolean = Boolean(NEXT_PUBLIC_BRX_MULTI_TENANT_SUPPORT),
  debug: boolean = Boolean(NEXT_PUBLIC_BRX_DEBUG) || false,
) => {
  // console.log('buildCongiguration [path]', path)
  // console.log('buildCongiguration [query]', query)

  const {
    token: authorizationToken,
    'server-id': serverId,
    endpoint: endpointQueryParam,
  } = searchParams

  const configuration: any = {
    endpoint: endpointQueryParam ? endpointQueryParam: endpoint,
    path: path,
    ...(authorizationToken ? { authorizationToken } : {}),
    ...(serverId ? { serverId } : {}),
    debug: true,
  }

  return configuration
}
