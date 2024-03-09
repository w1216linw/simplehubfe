import { menuItem } from "@/lib/types";

const MenuItems = async ({ sort, page }: { sort: string; page: string }) => {
  let res = null;
  if (sort === "all") {
    res = await fetch(process.env.NEXT_PUBLIC_URL + `/api/menu-items`).then(
      (res) => res.json()
    );
  } else {
    res = await fetch(
      process.env.NEXT_PUBLIC_URL + `/api/menu-items?search=${sort}`
    ).then((res) => res.json());
  }
  const items: menuItem[] = res.results;
  return (
    <section>
      {items.map((item) => (
        <div key={item.id}>{item.title}</div>
      ))}
    </section>
  );
};

export default MenuItems;
