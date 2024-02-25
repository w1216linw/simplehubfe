"use client";

import { useState } from "react";

type SelectProps<T> = {
  options: T[];
  more: () => void;
  hasMore: boolean;
};

const Select = <T extends { title: string; id: string }>({
  options,
  hasMore,
  more,
}: SelectProps<T>) => {
  const [select, setSelect] = useState<T>();
  const [open, setOpen] = useState(false);

  const handleOptionClick = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    option: T | undefined = undefined
  ) => {
    e.preventDefault();
    if (e.currentTarget.dataset.value === "more") {
      more();
    } else {
      setSelect(option);
      setOpen(false);
    }
  };

  const handleSelectClick = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();
    setOpen(!open);
  };

  return (
    <div className="w-max min-w-40 relative flex flex-col">
      <div className="h-8 p-2 flex gap-2 bg-white">
        <input
          type="text"
          name="category"
          value={select?.id}
          className="hidden"
        />
        <p>{select?.title}</p>
        <button className="ml-auto" onClick={handleSelectClick}>
          x
        </button>
      </div>
      <div
        className={`space-y-2 flex flex-col absolute top-9  max-h-80 overflow-y-scroll bg-white transition-all ${
          open ? "h-max" : "h-0"
        }`}
      >
        {options.map((option) => (
          <button
            className="py-1 px-4 hover:bg-slate-100 text-left"
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
            className="p-4 hover:bg-slate-100"
          >
            more...
          </button>
        )}
      </div>
    </div>
  );
};

export default Select;
