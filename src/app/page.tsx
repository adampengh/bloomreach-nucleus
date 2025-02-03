import { Metadata } from 'next';
import axios from 'axios';
import { initialize } from '@bloomreach/spa-sdk';
import { Container } from '@mui/material';
import BrxApp from '@/components/BrxApp';
import { buildAppRouterConfiguration } from '@/lib/BrxConfiguration';

export const metadata: Metadata = {
  title: 'Homepage',
};


export default async function Homepage({ searchParams }: PageProps) {
  const queryParams = await searchParams
  let queryString = Object.entries(queryParams).map(([key, value]) => `${key}=${value}`).join('&')

  const path = queryString ? `/?${queryString}` : '/'
  const configuration = buildAppRouterConfiguration(path)
  const page = await initialize({ ...configuration, httpClient: axios as any });

  return (
    <Container maxWidth={false} data-page-name='Homepage' disableGutters>
      <BrxApp configuration={configuration} page={page.toJSON()} />
    </Container>
  )
}
