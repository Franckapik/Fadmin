import Link from "next/link";

export const Categories = ({ categories }) => {
  console.log("cat", categories);
  let pathname = "";
  if (typeof window !== "undefined") {
    pathname = window.location.pathname;
  }

  return (
    <ul>
      {categories && categories.length
        ? categories.map((a, i) => {
            return (
              <li key={i}>
                <Link
                  href={{
                    pathname: pathname,
                    query: { categ: a.category_id },
                  }}
                >
                  <a>{a.category_name}</a>
                </Link>
              </li>
            );
          })
        : null}{" "}
    </ul>
  );
};
