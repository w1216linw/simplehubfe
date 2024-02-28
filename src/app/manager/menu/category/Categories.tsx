import { category } from "@/lib/types";
import SingleCategory from "./SingleCategory";

const Categories = async () => {
  let categories: category[] = [];
  let error = undefined;

  // handle errors
  const res = await fetch(process.env.NEXT_PUBLIC_URL + `/api/categories`).then(
    (res) => res.json()
  );

  if (res) categories = res.results;

  return (
    <div className="flex flex-col h-full pl-4 pt-4">
      {error ? (
        <h3>{error}</h3>
      ) : categories && categories.length >= 1 ? (
        <div className="flex ">
          {categories.map((elem, i) => (
            <div key={elem.title} className="flex">
              <SingleCategory data={elem} />
              {i < categories.length - 1 && (
                <span className="mx-2 font-bold md:block hidden">
                  {"\u00b7"}
                </span>
              )}
            </div>
          ))}
        </div>
      ) : (
        <h3>No categories</h3>
      )}
    </div>
  );
};

export default Categories;
