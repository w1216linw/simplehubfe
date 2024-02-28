import Revenue from "@/app/manager/Revenue";

const ManagerPage = () => {
  return (
    <main className="overflow-y-scroll flex flex-wrap p-20 gap-2 min-h-96">
      <Revenue />
      <Revenue />
      <Revenue />
    </main>
  );
};

export default ManagerPage;
