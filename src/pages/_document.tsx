import Document, { Html, Head, Main, NextScript } from 'next/document'

class MyDocument extends Document {
  render() {
    const nextInlineScriptSource = NextScript.getInlineScriptSource;
    NextScript.getInlineScriptSource = (props: any) => {
      let brxPage = JSON.stringify(props['__NEXT_DATA__'].props.pageProps.page)
      brxPage = brxPage.replace(/\/page\//g, 'page/');
      brxPage = JSON.parse(brxPage);

      props['__NEXT_DATA__'].props.pageProps.page = brxPage;
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
