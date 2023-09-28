// Constants
export const CONSTANTS = {
  PREVIEW_TOKEN_KEY: 'token',
  PREVIEW_SERVER_ID_KEY: 'server-id',
  PREVIEW_ENDPOINT: 'endpoint',
}

// PLP
export const PLP_SORT_OPTIONS = [
  {
    "label": "Relevance",
    "value": "relevance"
  },
  {
    "label": "Price (High to Low)",
    "value": "-price"
  },
  {
    "label": "Price (Low to High)",
    "value": "price"
  },
  {
    "label": "Name (A to Z)",
    "value": "displayName"
  },
  {
    "label": "Name (Z to A)",
    "value": "-displayName"
  }
]

// Environment Variables
export const NEXT_PUBLIC_GOOGLE_MAPS_API_KEY = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY ?? '';
export const NEXT_PUBLIC_DEBUG_MODE = process.env.NEXT_PUBLIC_DEBUG_MODE ?? 'false';
export const NEXT_PUBLIC_BRXM_ENDPOINT = process.env.NEXT_PUBLIC_BRXM_ENDPOINT ?? '';
export const NEXT_PUBLIC_BR_MULTI_TENANT_SUPPORT = process.env.NEXT_PUBLIC_BR_MULTI_TENANT_SUPPORT === 'true';
export const NEXT_PUBLIC_PERSONALIZATION_PROJECT_TOKEN = process.env.NEXT_PUBLIC_PERSONALIZATION_PROJECT_TOKEN ?? '';
export const NEXT_PUBLIC_PERSONALIZATION_API_URL = process.env.NEXT_PUBLIC_PERSONALIZATION_API_URL ?? '';
