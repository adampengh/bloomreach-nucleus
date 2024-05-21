import Document, { Html, Head, Main, NextScript } from 'next/document'

class MyDocument extends Document {
  render() {
    const nextInlineScriptSource = NextScript.getInlineScriptSource;
    NextScript.getInlineScriptSource = (props: any) => {
      let brxmPage = JSON.stringify(props['__NEXT_DATA__'].props.pageProps.page)
      brxmPage = brxmPage.replace(/\/page\//g, 'page/');
      brxmPage = JSON.parse(brxmPage);

      props['__NEXT_DATA__'].props.pageProps.page = brxmPage;
      return nextInlineScriptSource(props);
    };

    return (
      <Html>
        <Head />
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument
