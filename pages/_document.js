import React from "react";
import Document, { Html, Head, Main, NextScript } from "next/document";

class MyDocument extends Document {
  render() {
    return (
      <Html>
        <Head>
          <link rel="icon" type="image/png" href="/images/favicon-16x16.png" />
          <link rel="icon" type="image/png" href="/images/favicon-32x32.png" />
          <link
            href="https://fonts.googleapis.com/css2?family=M+PLUS+1+Code&display=swap"
            rel="stylesheet"></link>
          <link
            href="https://fonts.googleapis.com/css2?family=Genos&display=swap"
            rel="stylesheet"></link>
        </Head>
        <link
          href="https://fonts.googleapis.com/css2?family=VT323&display=swap"
          rel="stylesheet"
        />
        <body className="bg-sb-norm text-white">
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
