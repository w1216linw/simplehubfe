"use client";
import FormBtn from "@/components/FormBtn";
import { editMenuItem } from "@/lib/actions";
import { category, menuItem } from "@/lib/types";
import { useEffect, useRef, useState } from "react";
import { useFormState } from "react-dom";
import Select from "./Select";

const MenuItemDetail = ({
  item,
  categories,
}: {
  item: menuItem;
  categories: category[];
}) => {
  const formRef = useRef<HTMLFormElement>(null);

  const [select, setSelect] = useState<{ id: number; title: string }>();
  const [showError, setShowError] = useState(false);

  const [state, formAction] = useFormState(editMenuItem, {
    title: item.title || "",
    price: item.price.toString() || "",
    errors: {
      text: undefined,
    },
  });

  useEffect(() => {
    if (state.errors.text) setShowError(true);
    let timer = setInterval(() => {
      setShowError(false);
    }, 2000);

    return () => {
      clearInterval(timer);
    };
  }, [state.errors.text]);

  useEffect(() => {
    setSelect({
      id: item.category,
      title: item.category_name,
    });
  }, []);

  const handleClear = () => {
    if (formRef.current) {
      setSelect({
        id: item.category,
        title: item.category_name,
      });
      formRef.current.reset();
    }
  };

  return (
    <div className="h-max">
      <form
        ref={formRef}
        action={formAction}
        className="flex flex-col py-4 gap-3"
      >
        <input
          type="text"
          className="hidden"
          value={item.id}
          name="id"
          readOnly
        />
        <div className="flex flex-col">
          <label htmlFor="title">Title</label>
          <input
            type="text"
            name="title"
            id="title"
            className="bg-gray-100 rounded-lg"
            defaultValue={item.title}
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="description">Description</label>
          <textarea
            name="description"
            id="description"
            className="bg-gray-100 rounded-lg"
            defaultValue={item.description}
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="price">Price</label>
          <input
            className="bg-gray-100 rounded-lg"
            type="text"
            name="price"
            id="price"
            defaultValue={item.price}
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="category">Category</label>
          <Select
            options={categories}
            more={() => {}}
            hasMore={false}
            select={select}
            setSelect={setSelect}
          />
        </div>
        <div className="space-x-4 flex items-center">
          <label htmlFor="featured">Featured</label>
          <input
            type="checkbox"
            name="featured"
            id="featured"
            defaultChecked={item.featured}
          />
        </div>
        <div>
          <button
            className=""
            onClick={(e) => {
              e.preventDefault();
              handleClear();
            }}
          >
            Clear Entry
          </button>
        </div>
        <FormBtn
          click="Save"
          loading="Loading..."
          style="bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors mt-8"
        />
      </form>
      <p className="text-center text-red-400">
        {showError && state.errors.text}
      </p>
    </div>
  );
};

export default MenuItemDetail;
