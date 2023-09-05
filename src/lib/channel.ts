import { PageModel } from "@bloomreach/spa-sdk";
import { ParsedUrlQuery } from "querystring";

export interface ChannelConfig {
  googleMapsApiKey?: string;
}



/**
 *
 * @param page {PageModel}
 * @param query {ParsedUrlQuery=}
 */
export const loadChannelConfig = (page: PageModel, query?: ParsedUrlQuery): ChannelConfig => {
  const channelParams = page.channel?.info.props as ChannelParameters | undefined;
  const commerceConfig: ChannelConfig = {
    googleMapsApiKey: channelParams?.googleMapsApiKey || process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || '',
  };

  return commerceConfig;
}
