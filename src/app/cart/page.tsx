import axios from 'axios'
import { initialize } from '@bloomreach/spa-sdk'
import { buildAppRouterConfiguration } from '@/lib/BrxConfiguration'
import BrxApp from '@/components/BrxApp'

// `app/dashboard/page.tsx` is the UI for the `/dashboard` URL
const Cart = async ({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined }
}) => {
  console.group('Cart Page')

  const configuration: any = buildAppRouterConfiguration('/cart', searchParams)
  console.log('configuration', configuration)

  const page = await initialize({ ...configuration, httpClient: axios as any });

  console.groupEnd()
  return (
    <>
      <BrxApp configuration={configuration} page={page.toJSON()} />
    </>
  )
}

export default Cart;
