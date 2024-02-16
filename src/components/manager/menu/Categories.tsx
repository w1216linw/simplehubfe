import { useFetch } from "@/lib/hooks";
import { category } from "@/lib/types";

const Categories = () => {
  const [categories, error] = useFetch<category>("/api/categories");
  return (
    <section>
      {error ? (
        <h3>{error}</h3>
      ) : categories.length >= 1 ? (
        categories.map((elem) => (
          <div key={elem.title}>
            <h1>{elem.title}</h1>
          </div>
        ))
      ) : (
        <h3>No categories</h3>
      )}
    </section>
  );
};

export default Categories;
