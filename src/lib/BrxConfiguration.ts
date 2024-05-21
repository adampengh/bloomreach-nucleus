import { Configuration } from '@bloomreach/spa-sdk';
import { ParsedUrlQuery } from 'querystring';
import {
  CONSTANTS,
  NEXT_PUBLIC_BRXM_ENDPOINT,
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
  endpoint: string = NEXT_PUBLIC_BRXM_ENDPOINT,
) => {
  // console.log('buildCongiguration [path]', path)
  // console.log('buildCongiguration [query]', query)

  // Read a token and server id from the query string
  const endpointParameter = query[CONSTANTS.PREVIEW_ENDPOINT_PARAM];
  console.log('buildCongiguration [endpointParameter]', endpointParameter)

  const configuration: ConfigurationBuilder = {
    endpoint: endpoint,
    path: path,
    // debug: Boolean(NEXT_PUBLIC_DEBUG_MODE),
  }

  if (endpointParameter) {
    configuration.endpoint = endpointParameter;
  }

  return configuration
}
