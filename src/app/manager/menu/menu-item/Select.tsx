"use client";
import { useEffect, useState } from "react";
import { MdArrowDropDown } from "react-icons/md";

type SelectProps<T> = {
  options: T[];
  more: () => void;
  hasMore: boolean;
  select: T | undefined;
  setSelect: React.Dispatch<React.SetStateAction<T | undefined>>;
};

const Select = <T extends { id: number; title: string }>({
  options,
  hasMore,
  more,
  select,
  setSelect,
}: SelectProps<T>) => {
  const [open, setOpen] = useState(false);

  const handleOptionClick = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    option: T | undefined = undefined
  ) => {
    e.preventDefault();
    if (e.currentTarget.dataset.value === "more") {
      more();
    } else {
      if (option) setSelect(option);
      setOpen(false);
    }
  };

  const handleSelectClick = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();
    setOpen(!open);
  };

  useEffect(() => {
    setOpen(false);
  }, []);

  return (
    <div className=" relative flex flex-col">
      <div className="flex gap-2 bg-white">
        <input
          type="text"
          name="category"
          value={select?.id}
          className="hidden"
        />
        <p className="bg-gray-100 rounded-lg w-full input h-8">
          {select?.title}
        </p>
        <button className="ml-auto" onClick={handleSelectClick}>
          <MdArrowDropDown />
        </button>
      </div>
      <div
        className={`space-y-2 flex flex-col absolute top-9 w-[95%] rounded-lg overflow-y-scroll bg-gray-50 transition-all ${
          open ? "h-28" : "h-0"
        }`}
      >
        {options.map((option) => (
          <button
            className="py-1 px-4 hover:bg-neutral-100 text-left"
            key={option.id}
            onClick={(e) => handleOptionClick(e, option)}
            data-value={option.title}
          >
            {option.title}
          </button>
        ))}
        {hasMore && (
          <button
            onClick={(e) => handleOptionClick(e)}
            data-value="more"
            className="p-4 hover:bg-neutral-100"
          >
            more...
          </button>
        )}
      </div>
    </div>
  );
};

export default Select;
