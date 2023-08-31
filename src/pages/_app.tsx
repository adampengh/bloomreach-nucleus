import type { AppProps } from 'next/app'

import '@/styles/globals.css'
import '@/styles/fonts.css'

const App = ({ Component, pageProps }: AppProps) => {
  return <Component {...pageProps} />
}

export default App
