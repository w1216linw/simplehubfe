const MenuItem = async () => {
  let data = { result: [{ title: "a" }] };
  const delay = await new Promise((resolve) => setTimeout(resolve, 2000));
  try {
    const res = await fetch("http://127.0.0.1:8000/api/menu-items");
    data = await res.json();
  } catch (error) {}

  return (
    <div>
      {data.result.length >= 1 ? (
        data.result.map((elem) => <div key={elem.title}>{elem.title}</div>)
      ) : (
        <h3>No MenuItem</h3>
      )}
    </div>
  );
};

export default MenuItem;
