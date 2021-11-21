import Link from "next/link";

export const Header = ({ authors }) => {
  return (
    <header>
      <div className="row d-flex justify-content-center">
        <div className="col-md-6 text-center" style={{ fontSize: "15px" }}>
          {" "}
          <ul>
            {authors && authors.length
              ? authors.map((a, i) => {
                  return (
                    <li key={i}>
                      <Link href={`/authors/${a.author_id}`}>
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
  );
};
