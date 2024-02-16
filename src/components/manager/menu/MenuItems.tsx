import { useFetch } from "@/lib/hooks";
import { menuItem } from "@/lib/types";
import MenuItem from "./MenuItem";
import NewMenuItemForm from "./NewMenuItemForm";

const MenuItems = () => {
  const [data, error] = useFetch<menuItem>("/api/menu-items");
  return (
    <section>
      {error ? (
        <h3>{error}</h3>
      ) : (
        <div>
          <NewMenuItemForm />
          {data.length >= 1 ? (
            data.map((elem) => <MenuItem menuItem={elem} key={elem.title} />)
          ) : (
            <h3>No menu items</h3>
          )}
        </div>
      )}
    </section>
  );
};

export default MenuItems;
