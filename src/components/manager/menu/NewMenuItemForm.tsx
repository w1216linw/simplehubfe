import FormBtn from "@/components/reuse/FormBtn";
import { newMenuItem } from "@/lib/actions";
import { useFetch } from "@/lib/hooks";
import { category } from "@/lib/types";

const NewMenuItemForm = () => {
  const [categories, error] = useFetch<category>("/api/category");
  return (
    <div>
      {error ? (
        <div>{error}</div>
      ) : (
        <form action={newMenuItem} className="flex">
          <input type="text" name="title" />
          <input type="text" name="price" />
          <select name="category" id="category">
            {categories.length >= 1 &&
              categories.map((elem) => (
                <option key={elem.id} value={elem.id}>
                  {elem.title}
                </option>
              ))}
          </select>
          <FormBtn click="Save" loading="Loading..." />
        </form>
      )}
    </div>
  );
};

export default NewMenuItemForm;
