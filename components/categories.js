export const Main = ({ categories }) => {
  console.log("cat", categories);
  return (
    <ul>
      {categories && categories.length
        ? categories.map((a, i) => {
            return <li key={i}>{a.category_name}</li>;
          })
        : null}{" "}
    </ul>
  );
};
