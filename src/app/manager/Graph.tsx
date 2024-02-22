import { revenue } from "@/lib/types";
import { pickColor } from "@/lib/utils";

type GraphProps = {
  data: revenue[];
};

const Graph = ({ data }: GraphProps) => {
  const maxValue = Math.max(...data.map((elem) => elem.value));
  return (
    <div className="flex justify-center gap-2 h-3/4 w-full space-x-5">
      {data.map((elem, index) => (
        <div key={index} className="bar flex flex-col items-center justify-end">
          <div>
            <p>${elem.value}</p>
          </div>
          <div
            style={{
              height: `${(elem.value / maxValue) * 100}%`,
              width: `4rem`,
              backgroundColor: `${pickColor(index)}`,
            }}
          />
          <div>
            <p>{elem.label}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Graph;
