import MenuItems from "@/app/manager/menu/menu-item/MenuItems";
import NewMenuItemForm from "@/app/manager/menu/menu-item/NewMenuItemForm";

const MenuItemPage = () => {
  return (
    <main>
      <NewMenuItemForm />
      <MenuItems />
    </main>
  );
};

export default MenuItemPage;
