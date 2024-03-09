import CategoryNavbar from "./CategoryNavbar";
import MenuItems from "./MenuItems";

const MenuPage = ({
  searchParams,
}: {
  searchParams?: { sort?: string; page?: string };
}) => {
  const sort = searchParams?.sort || "all";
  const pageNum = searchParams?.page || "1";
  return (
    <div className="">
      <CategoryNavbar />
      <MenuItems sort={sort} page={pageNum} />
    </div>
  );
};

export default MenuPage;
