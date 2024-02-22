import Categories from "@/app/manager/menu/category/Categories";
import NewCategory from "@/app/manager/menu/category/NewCategory";

const CategoryPage = () => {
  return (
    <main className="relative section-wrapper space-y-5">
      <NewCategory />
      <Categories />
    </main>
  );
};

// const CategoriesMemoized = React.memo(Categories);

export default CategoryPage;
