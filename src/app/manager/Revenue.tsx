import { revenue } from "@/lib/types";
import Graph from "./Graph";

const data: revenue[] = [
  { value: 221, label: "2/11" },
  { value: 336, label: "2/12" },
  { value: 253, label: "2/13" },
  { value: 341, label: "2/14" },
  { value: 211, label: "2/15" },
];

const Revenue = () => {
  return (
    <div className="max-h-[25rem] h-full w-[30rem] bg-slate-200 p-4 rounded-lg flex flex-col items-center justify-between">
      <div>
        <h1>Revenue</h1>
      </div>
      {/* a graph shows revenue by select time periods */}
      <Graph data={data} />
      <div className="space-x-3">
        <button className="bg-slate-300 px-4 py-1 rounded-md">Monthly</button>
        <button className="bg-slate-300 px-4 py-1 rounded-md">Weekly</button>
        <button className="bg-slate-300 px-4 py-1 rounded-md">Daily</button>
      </div>
    </div>
  );
};

export default Revenue;
