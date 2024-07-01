import { Configuration } from '@bloomreach/spa-sdk';
import { ParsedUrlQuery } from 'querystring';
import { parseBrxEndpoint } from '@/lib/utils/Content';
import {
  CONSTANTS,
  NEXT_PUBLIC_BRX_ENDPOINT,
  NEXT_PUBLIC_BRX_PREVIEW_TOKEN,
  NEXT_PUBLIC_DEBUG_MODE,
} from './constants';

type BuildConfigurationOptions = {
  endpoint: string | (string | null)[];
  baseUrl: string;
};
type ConfigurationBuilder = Omit<Configuration & Partial<BuildConfigurationOptions>, 'httpClient'>;

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
) => {
  // console.log('buildCongiguration [path]', path)
  // console.log('buildCongiguration [query]', query)

  const configuration: ConfigurationBuilder = {
    endpoint: endpoint,
    path: path,
    debug: false,
  }

  // const endpointParameter = query[CONSTANTS.PREVIEW_ENDPOINT_PARAM];
  // if (endpointParameter) {
  //   console.log('buildCongiguration [endpointParameter]', endpointParameter)
  //   configuration.endpoint = endpointParameter;
  // }

  // console.log('NEXT_PUBLIC_BRX_PREVIEW_TOKEN', NEXT_PUBLIC_BRX_PREVIEW_TOKEN)
  // if (NEXT_PUBLIC_BRX_PREVIEW_TOKEN) {
  //   configuration.authorizationToken = NEXT_PUBLIC_BRX_PREVIEW_TOKEN;
  // }
  // if (NEXT_PUBLIC_DEBUG_MODE) {
  //   configuration.debug = Boolean(NEXT_PUBLIC_DEBUG_MODE);
  // }

  return configuration
}
