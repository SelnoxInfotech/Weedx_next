import React from 'react';
import Document, { Html, Head, Main, NextScript } from 'next/document';
import { ServerStyleSheets } from '@mui/styles'; // or @mui/material/styles depending on your version
import Script from 'next/script';
export default class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const sheets = new ServerStyleSheets();
    const originalRenderPage = ctx.renderPage;

    ctx.renderPage = () =>
      originalRenderPage({
        enhanceApp: (App) => (props) => sheets.collect(<App {...props} />),
      });

    const initialProps = await Document.getInitialProps(ctx);

    return {
      ...initialProps,
      styles: [...React.Children.toArray(initialProps.styles), sheets.getStyleElement()],
    };
  }

  render() {
    return (
      <Html lang="en">
        <Head >

        <link rel="stylesheet" href="https://unpkg.com/swiper/swiper-bundle.min.css" /> 
        </Head>
        <body>
          <Main />
          <NextScript />
          <Script src="https://unpkg.com/swiper/swiper-bundle.min.js" strategy="afterInteractive" />
        </body>
      </Html>
    );
  }
}
