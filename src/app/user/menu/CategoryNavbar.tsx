import { category } from "@/lib/types";
import Link from "next/link";

const CategoryNavbar = async () => {
  const res = await fetch(process.env.NEXT_PUBLIC_URL + "/api/categories").then(
    (res) => res.json()
  );
  const categories: category[] = res.results;

  const makeUrl = (title: string) => {
    return title.replace(" ", "-");
  };

  return (
    <nav className="py-4 font-bold flex justify-center">
      <ul className="flex divide-x divide-solid divide-gray-900">
        <Link className="px-5" href={`menu/?sort=all`}>
          All
        </Link>
        {categories.map((elem) => (
          <Link
            href={`menu/?sort=${makeUrl(elem.title)}`}
            key={elem.id}
            className="px-5"
          >
            {elem.title}
          </Link>
        ))}
      </ul>
    </nav>
  );
};

export default CategoryNavbar;
