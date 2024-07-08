import { BrxApp } from "@/components/BrxApp"
import { BrPage } from "@bloomreach/react-sdk"
import { Configuration, initialize } from "@bloomreach/spa-sdk"
import axios from 'axios'
import { buildConfiguration } from '@/lib/BrxConfiguration';
import { NEXT_PUBLIC_BRX_ENDPOINT } from '@/lib/constants';


type BuildConfigurationOptions = {
  endpoint: string | (string | null)[];
  baseUrl: string;
};
type ConfigurationBuilder = Omit<Configuration & Partial<BuildConfigurationOptions>, 'httpClient'>;

// `app/dashboard/page.tsx` is the UI for the `/dashboard` URL
export default async function AppRouter({
  params,
  searchParams
}: {
  params: any,
  searchParams: { [key: string]: string | string[] | undefined }
}) {
  console.log('AppRouter')
  console.log('params', params)
  console.log('searchParams', searchParams)

  const configuration: ConfigurationBuilder = {
    endpoint: NEXT_PUBLIC_BRX_ENDPOINT,
    path: '/',
    debug: false,
  }

  const page = await initialize({...configuration, httpClient: axios });

  return (
    <BrxApp configuration={configuration} page={page.toJSON()} />
  )
}

