import { Container } from '@mui/material';
import BrxApp from '@/components/BrxApp';
import { buildAppRouterConfiguration } from '@/lib/BrxConfiguration';
import axios from 'axios';
import { initialize } from '@bloomreach/spa-sdk';

export default async function Page({
  params,
  searchParams
}: PageProps) {
  const rest = await params
  let path = `/${rest?.rest?.join('/')}`

  const queryParams = await searchParams
  let queryString = Object.entries(queryParams).map(([key, value]) => {
    return `${key}=${value}`
  }).join('&')

  const configuration = buildAppRouterConfiguration(`${path}?${queryString}`)
  const page = await initialize({ ...configuration, httpClient: axios as any });

  return (
    <Container maxWidth={false} data-page-name='Homepage' disableGutters>
      <BrxApp configuration={configuration} page={page.toJSON()} />
    </Container>
  )
}
