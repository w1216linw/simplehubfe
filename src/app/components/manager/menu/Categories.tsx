type category = {
  title: string;
};

type categories = [category];

const Categories = async () => {
  let data: { result: categories } = { result: [{ title: "a" }] };
  const delay = await new Promise((resolve) => setTimeout(resolve, 2000));
  try {
    const res = await fetch("http://127.0.0.1:8000/api/categories");
    data = await res.json();
  } catch (error) {}

  return (
    <div>
      {data.result.length >= 1 ? (
        data.result.map((elem) => <div key={elem.title}>{elem.title}</div>)
      ) : (
        <h3>No categories</h3>
      )}
    </div>
  );
};

export default Categories;
