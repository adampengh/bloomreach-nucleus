// Environment Variables
export const NEXT_PUBLIC_GOOGLE_MAPS_API_KEY = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY ?? '';

export const NEXT_PUBLIC_BRX_ENDPOINT = process.env.NEXT_PUBLIC_BRX_ENDPOINT ?? '';
export const NEXT_PUBLIC_BRX_PREVIEW_TOKEN = process.env.NEXT_PUBLIC_BRX_PREVIEW_TOKEN ?? '';
export const NEXT_PUBLIC_BRX_MULTI_TENANT_SUPPORT = process.env.NEXT_PUBLIC_BRX_MULTI_TENANT_SUPPORT ?? false;
export const NEXT_PUBLIC_BRX_DEBUG = process.env.NEXT_PUBLIC_BRX_DEBUG ?? false;

export const NEXT_PUBLIC_PERSONALIZATION_PROJECT_TOKEN = process.env.NEXT_PUBLIC_PERSONALIZATION_PROJECT_TOKEN ?? '';
export const NEXT_PUBLIC_PERSONALIZATION_API_URL = process.env.NEXT_PUBLIC_PERSONALIZATION_API_URL ?? '';

// Constants
export const CONSTANTS = {
  PREVIEW_TOKEN_PARAM: 'token',
  PREVIEW_SERVER_ID_PARAM: 'server-id',
  PREVIEW_ENDPOINT_PARAM: 'endpoint',
}

// PLP
export const PLP_SORT_OPTIONS = [
  {
    'label': 'Relevance',
    'value': 'relevance'
  },
  {
    'label': 'Price (High to Low)',
    'value': '-price'
  },
  {
    'label': 'Price (Low to High)',
    'value': 'price'
  },
  {
    'label': 'Name (A to Z)',
    'value': 'displayName'
  },
  {
    'label': 'Name (Z to A)',
    'value': '-displayName'
  }
]


