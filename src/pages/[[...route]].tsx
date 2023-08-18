import { NextPage } from 'next'
import Head from 'next/head'
import App from '@/components/App'
// import { Montserrat } from 'next/font/google'
// import styles from '@/styles/Home.module.css'

// const montserrat = Montserrat({ subsets: ['latin'] })

const Index: NextPage = (): JSX.Element => {
  return (
    <>
    <Head>
      <title>Bloomreach Nucleus</title>
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <link rel="icon" href="/favicon.png" />
    </Head>
    <main>
      <App />
    </main>
    </>
  )
}

// Index.getInitialProps = async ({
//   // req: request,
//   // res: response,
//   asPath: path,
//   query,
// }) => {
//   console.log("[getServerSideProps]: path=", path);
//   console.log("[getServerSideProps]: query=", query);

//   const props = { };

//   return props;
// };

export default Index
