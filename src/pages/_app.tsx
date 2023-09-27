import App, { AppContext, AppInitialProps } from 'next/app';
import Head from 'next/head';
import { AppTreeType } from 'next/dist/shared/lib/utils';
import { ReactElement } from 'react';

import '@/styles/styles.scss'
import '@/styles/fonts.scss'
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

export default class MyApp extends App {
  static AppTree: AppTreeType;

  static async getInitialProps(appContext: AppContext): Promise<AppInitialProps> {
    // calls page's `getInitialProps` and fills `appProps.pageProps`
    const appProps = await App.getInitialProps(appContext);
    // console.log('[MyApp.getInitialProps]: appProps=', appProps);
    const { AppTree: tree } = appContext;
    MyApp.AppTree = tree;

    return { ...appProps };
  }

  render(): JSX.Element {
    // console.log('[App]: AppProps=', this.props);
    const { Component, pageProps } = this.props;
    const getLayout = Component.getLayout ?? ((page: ReactElement) => page);
    return (
      <>
        <Head>
          <meta charSet="utf-8" />
          <meta key="description" name="description" content="Example NextJS SPA for brX SaaS" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />

          <title key="title">Bloomreach Nucleus</title>
        </Head>
        {/* {getLayout(<Component {...pageProps} />)} */}
        <Component {...pageProps} />
      </>
    )
  }
}
