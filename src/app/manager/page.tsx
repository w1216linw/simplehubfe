import Revenue from "@/app/manager/Revenue";

const ManagerPage = () => {
  return (
    <main className="overflow-y-scroll w-full flex flex-wrap p-20 bg-gray-100 gap-2">
      <Revenue />
      <Revenue />
      <Revenue />
    </main>
  );
};

export default ManagerPage;
