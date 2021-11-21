import Link from "next/link";

export const Categories = ({ categories }) => {
  console.log("cat", categories);

  return (
    <ul>
      {categories && categories.length
        ? categories.map((a, i) => {
            return (
              <li key={i}>
                <Link
                  href={{
                    pathname: window.location.pathname,
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
