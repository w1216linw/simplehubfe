"use client";
import FormBtn from "@/components/FormBtn";
import { editMenuItem } from "@/lib/actions";
import { useFetch } from "@/lib/hooks";
import { category, menuItem } from "@/lib/types";
import { useSearchParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { useFormState } from "react-dom";
import Select from "./Select";

const MenuItemDetail = () => {
  const searchParams = useSearchParams();
  const id = searchParams.get("id");
  const [detail, setDetail] = useState<menuItem>();
  const formRef = useRef<HTMLFormElement>(null);

  const [categories, error, hasMore, moreItems] =
    useFetch<category>("/api/categories");

  const [select, setSelect] = useState<category>();
  const [showError, setShowError] = useState(false);
  const [state, formAction] = useFormState(editMenuItem, {
    title: detail?.title || "",
    price: detail?.price.toString() || "",
    errors: {
      text: undefined,
    },
  });

  useEffect(() => {
    if (!id) return;

    fetch(process.env.NEXT_PUBLIC_URL + `/api/menu-items/${id}`)
      .then((res) => res.json())
      .then((data: menuItem) => {
        setDetail(data);
        setSelect({
          id: data.category,
          title: data.category_name,
        });
      });
  }, [id]);

  useEffect(() => {
    if (state.errors.text) setShowError(true);
    let timer = setInterval(() => {
      setShowError(false);
    }, 2000);

    return () => {
      clearInterval(timer);
    };
  }, [state.errors.text]);

  const handleClear = () => {
    if (formRef.current) {
      setSelect(undefined);
      formRef.current.reset();
    }
  };
  return (
    <div>
      {error ? (
        <div>{error}</div>
      ) : (
        <div className="h-max">
          <form
            ref={formRef}
            action={formAction}
            className="flex flex-col py-4 gap-3 w-96"
          >
            <input
              type="text"
              className="hidden"
              value={id || detail?.id}
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
                defaultValue={detail?.title}
              />
            </div>
            <div className="flex flex-col">
              <label htmlFor="price">Price</label>
              <input
                className="bg-gray-100 rounded-lg"
                type="text"
                name="price"
                id="price"
                defaultValue={detail?.price}
              />
            </div>
            <div className="flex flex-col">
              <label htmlFor="category">Category</label>
              <Select
                options={categories}
                more={moreItems}
                hasMore={hasMore}
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
                defaultChecked={detail?.featured}
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
      )}
    </div>
  );
};

export default MenuItemDetail;
