import Link from "next/link";

export const Medias = ({ medias }) => {
  console.log("med", medias);
  return (
    <ul>
      {medias && medias.length
        ? medias.map((a, i) => {
            return (
              <li key={i}>
                <Link
                  href={{
                    pathname: "/medias/[media]",
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
