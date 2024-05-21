'use client'

import { BrPage } from "@bloomreach/react-sdk"
import { initialize } from "@bloomreach/spa-sdk"
import axios from 'axios'

const getPage = async () => {
  const configuration = {
    endpoint: 'https://profserv02.bloomreach.io/delivery/site/v1/channels/reference-spa/pages',
    path: '/',
    httpClient: axios
  }

  const page = await initialize(configuration)

  return { configuration, page }
}

// `app/dashboard/page.tsx` is the UI for the `/dashboard` URL
const Dashboard = async () => {
  const { configuration } = await getPage()

  return (
    <BrPage configuration={configuration} mapping={{}}>
      <div className="dashboard-page">
        <h1>Hello, Dashboard Page!</h1>
      </div>
    </BrPage>
  )
}

export default Dashboard;
