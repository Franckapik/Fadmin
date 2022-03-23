// add bootstrap css

import "bootstrap/dist/css/bootstrap.css";
import "../public/styles/main.css";
import "../public/styles/all.min.css"; //font awesome pro

import Head from "next/head";
import { SSRProvider } from "react-bootstrap";
// own css files here
import {
  ClerkProvider,
  SignedIn,
  SignedOut,
  RedirectToSignIn,
} from "@clerk/nextjs";
import { useRouter } from "next/router";

const privatePage = ["admin"];

export default function App({ Component, pageProps }) {
  const { pathname } = useRouter();

  const isPrivate = pathname.includes(privatePage);

  return (
    <SSRProvider>
      <Head>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0"
        />
      </Head>
      <ClerkProvider>
        {!isPrivate ? (
          <Component {...pageProps} />
        ) : (
          <>
            <SignedIn>
              <Component {...pageProps} />
            </SignedIn>
            <SignedOut>
              <RedirectToSignIn />
            </SignedOut>
          </>
        )}
      </ClerkProvider>
    </SSRProvider>
  );
}
