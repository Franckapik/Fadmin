// add bootstrap css
import "bootstrap/dist/css/bootstrap.css";
import Head from "next/head";
// own css files here
/* import "../css/customcss.css";
 */
function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <Component {...pageProps} />
    </>
  );
}
export default MyApp;
