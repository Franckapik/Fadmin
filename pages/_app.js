// add bootstrap css

import "bootstrap/dist/css/bootstrap.css";
import "../public/styles/qualyn.css";

import Head from "next/head";
import { SSRProvider } from "react-bootstrap";
// own css files here

export default function App({ Component, pageProps }) {
  return (
    <SSRProvider>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <Component {...pageProps} />
    </SSRProvider>
  );
}
