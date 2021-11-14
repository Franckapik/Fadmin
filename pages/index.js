import Head from "next/head";

export default function Home() {
  return (
    <div className="container">
      <Head>
        <title>Qualyn</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <div className="row d-flex justify-content-center">
          <div className="col-md-6 text-center" style={{ fontSize: "15px" }}>
            {" "}
            Artists Eyal SH Sound{" "}
          </div>
        </div>
      </main>

      <footer>Qualyn Footer</footer>
    </div>
  );
}
