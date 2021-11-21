import Link from "next/link";

export const Medias = ({ medias }) => {
  console.log("med", medias);
  return (
    <ul>
      {medias && medias.length
        ? medias.map((a, i) => {
            return <li key={i}>{a.media_title}</li>;
          })
        : null}{" "}
    </ul>
  );
};
