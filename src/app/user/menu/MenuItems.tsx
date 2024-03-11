import { menuItem } from "@/lib/types";

const MenuItems = async ({ sort, page }: { sort: string; page: string }) => {
  let res = null;
  if (sort === "all") {
    res = await fetch(
      process.env.NEXT_PUBLIC_URL + `/api/menu-items?page=${page}`
    ).then((res) => res.json());
  } else {
    res = await fetch(
      process.env.NEXT_PUBLIC_URL +
        `/api/menu-items?search=${sort}&page=${page}`
    ).then((res) => res.json());
  }
  const items: menuItem[] = res.results;
  return (
    <section className="grid grid-cols-8 h-[32rem] place-content-start">
      {items.map((item) => (
        <div
          className="col-start-4 col-end-6 text-left p-1 w-full flex justify-between"
          key={item.id}
        >
          <div className="flex flex-col">
            <h1>{item.title}</h1>
            <p className="text-sm text-gray-500">{item.description}</p>
          </div>
          <p>{item.price}</p>
        </div>
      ))}
    </section>
  );
};

export default MenuItems;
