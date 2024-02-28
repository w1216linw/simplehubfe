import { menuItem } from "@/lib/types";
import MenuItem from "./MenuItem";

export type MenuItemsProps = {
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
    <div className="pl-4 pt-4">
      {error ? (
        <h3>{error}</h3>
      ) : menuItems.length > 1 ? (
        <table className="w-full">
          <thead className="font-semibold border-t border-b">
            <tr>
              <td className="w-1/4 py-2">Title</td>
              <td className="w-1/4 py-2">Category</td>
              <td className="w-1/4 py-2">Price</td>
              <td className="w-1/4 py-2">Actions</td>
            </tr>
          </thead>
          <tbody>
            {menuItems.map((elem) => (
              <MenuItem
                menuItem={elem}
                key={elem.id}
                searchParams={{ query, page: currentPage.toString() }}
                baseUrl={"/manager/menu?"}
              />
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
