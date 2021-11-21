import Head from "next/head";
import { useRouter } from "next/router";
import Link from "next/link";
import { Main } from "../components/categories";
import useSWR from "swr";
const fetcher = (...args) => fetch(...args).then((res) => res.json());

export default function Home() {
  const router = useRouter();

  const { data, error } = useSWR("/api/authors/", fetcher);
  if (error) return <div>An error occured.</div>;
  if (!data) return <div>Loading ...</div>;
  data && console.log(data);

  return (
    <div className="container">
      <Head>
        <title>Qualyn</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <header>
        <div className="row d-flex justify-content-center">
          <div className="col-md-6 text-center" style={{ fontSize: "15px" }}>
            {" "}
            <ul>
              {data && data.length
                ? data.map((a, i) => {
                    return (
                      <li key={i}>
                        <Link href="/authors/eyal">
                          <a>{a.author_name}</a>
                        </Link>
                      </li>
                    );
                  })
                : null}
            </ul>
          </div>
        </div>
      </header>
      <main>
        <Main categories={[1, 2]}></Main>
      </main>

      <footer>Qualyn Footer</footer>
    </div>
  );
}
