import Link from "next/link";

export const Medias = ({ mediasFiles, db_medias }) => {
  console.log("med", db_medias, mediasFiles);
  let pathname = "";
  if (typeof window !== "undefined") {
    pathname = window.location.pathname;
  }

  return (
    <ul>
      {db_medias && db_medias.length
        ? db_medias.map((a, i) => {
            return (
              <li key={i}>
                <Link
                  href={{
                    pathname: pathname,
                    query: { media: a.media_id },
                  }}
                >
                  <a>{a.media_title}</a>
                </Link>
              </li>
            );
          })
        : null}{" "}
    </ul>
  );
};
