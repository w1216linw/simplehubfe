import { category } from "@/lib/types";
import SingleCategory from "./SingleCategory";
const Categories = async () => {
  let categories: category[] = [];
  let error: string | null = null;
  try {
    const res = await fetch(process.env.NEXT_PUBLIC_URL + "/api/categories");
    if (!res.ok) {
      throw new Error("Error fetching categories");
    } else {
      const data = await res.json();
      categories = data.results;
    }
  } catch (err) {
    if (err instanceof Error) error = err.message;
    else error = "Error fetching categories";
  }
  return (
    <section>
      {error ? (
        <h3>{error}</h3>
      ) : categories.length >= 1 ? (
        <div className="flex flex-wrap gap-x-6 gap-y-4">
          {categories.map((elem) => (
            <SingleCategory data={elem} key={elem.title} />
          ))}
        </div>
      ) : (
        <h3>No categories</h3>
      )}
    </section>
  );
};

export default Categories;
