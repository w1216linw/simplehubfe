import { menuItem } from "@/lib/types";
import MenuItem from "./MenuItem";

const MenuItems = async () => {
  let menuItems: menuItem[] = [];
  let error: string | null = null;
  try {
    const res = await fetch(process.env.NEXT_PUBLIC_URL + "/api/menu-items");
    if (!res.ok) {
      throw new Error("Error fetching menu items");
    } else {
      const data = await res.json();
      menuItems = data.results;
    }
  } catch (err) {
    if (err instanceof Error) error = err.message;
    else error = "Error fetching menu items";
  }
  return (
    <section>
      {error ? (
        <h3>{error}</h3>
      ) : (
        <div>
          {menuItems.length >= 1 ? (
            menuItems.map((elem) => (
              <MenuItem menuItem={elem} key={elem.title} />
            ))
          ) : (
            <h3>No menu items</h3>
          )}
        </div>
      )}
    </section>
  );
};

export default MenuItems;
