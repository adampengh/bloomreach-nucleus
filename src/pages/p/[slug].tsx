import Head from 'next/head'
import { Montserrat } from 'next/font/google'

const montserrat = Montserrat({ subsets: ['latin'] })

export default function ProductDetailPage() {
  return (
    <>
      <Head>
        <title>Bloomreach Nucleus</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={`${montserrat.className}`}>
        PDP
      </main>
    </>
  )
}
