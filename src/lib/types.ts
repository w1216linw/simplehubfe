export type session = {
  access: string;
  refresh: string;
  username: string;
  refresh_on: number;
};

export type tokens = {
  access: string;
  refresh: string;
};

export type response<T> = {
  count: number;
  next: string | null;
  previous: string | null;
  results: T[];
};

export type user = {
  id: number;
  username: string;
};

export type category = {
  title: string;
  id: number;
};

export type menuItem = {
  id: number;
  title: string;
  price: number;
  featured: boolean;
  category: number;
  category_name: string;
};

export type cart = {
  id: number;
  menuItem: menuItem;
  unit_price: number;
  quantity: number;
  price: number;
};

export type orderItem = {
  order: number;
  menuitem: menuItem;
  quantity: number;
  price: number;
};

export type order = {
  id: number;
  user: string;
  delivery_crew: number | null;
  status: boolean;
  date: number | Date;
  total: number;
  order_items: orderItem[];
};

export type revenue = {
  value: number;
  label: string;
};
