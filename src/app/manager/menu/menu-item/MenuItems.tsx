import { menuItem } from "@/lib/types";
import MenuItem from "./MenuItem";

type MenuItemsProps = {
  query: string;
  currentPage: number;
};

const MenuItems = async ({ query, currentPage }: MenuItemsProps) => {
  let menuItems: menuItem[] = [];
  let error = undefined;

  // handle errors
  const res = await fetch(
    process.env.NEXT_PUBLIC_URL + `/api/menu-items?page=${currentPage}`
  ).then((res) => res.json());
  if (res) menuItems = res.results;

  return (
    <div className="w-full h-96 pl-4 pt-4">
      {error ? (
        <h3>{error}</h3>
      ) : menuItems.length > 1 ? (
        <table className="w-full">
          <thead>
            <tr>
              <td>Title</td>
              <td>Category</td>
              <td>Price</td>
            </tr>
          </thead>
          <tbody>
            {menuItems.map((elem) => (
              <MenuItem menuItem={elem} key={elem.id} />
            ))}
          </tbody>
        </table>
      ) : (
        <h3>No items found</h3>
      )}
    </div>
  );
};

export default MenuItems;
