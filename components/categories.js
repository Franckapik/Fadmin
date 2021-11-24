import Link from "next/link";
import { useRouter } from "next/router";

export const Categories = ({ categories }) => {
  let pathname = "";
  if (typeof window !== "undefined") {
    pathname = window.location.pathname;
  }

  const router = useRouter();

  const addQuery = (key, value) => {
    router.query[key] = value;
    router.push(router);
  };

  return (
    <ul>
      {categories && categories.length
        ? categories.map((a, i) => {
            return (
              <li key={i}>
                <a onClick={() => addQuery("categ", a.category_id)}>
                  {a.category_name}
                </a>
              </li>
            );
          })
        : null}{" "}
    </ul>
  );
};
