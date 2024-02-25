import Categories from "./category/Categories";
import NewCategory from "./category/NewCategory";

const MenuPage = () => {
  return (
    <section className="px-4 space-y-4 w-full">
      <section className="bg-neutral-50 rounded-md px-8 py-4 h-80 flex flex-col gap-y-4">
        <h1 className="font-semibold">Categories</h1>
        <NewCategory />
        <Categories />
      </section>
      {/* <section className="bg-neutral-50 rounded-md px-8 py-4">
        <h1 className="font-semibold">Menu Items</h1>
        <NewMenuItemForm />
        <MenuItems />
      </section> */}
    </section>
  );
};

export default MenuPage;
