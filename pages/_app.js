// add bootstrap css

import "bootstrap/dist/css/bootstrap.css";
import "../public/styles/qualyn.css";

import Head from "next/head";
// own css files here

import { Provider } from "next-auth/client";

export default function App({ Component, pageProps }) {
  return (
    <Provider session={pageProps.session}>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <Component {...pageProps} />
    </Provider>
  );
}
