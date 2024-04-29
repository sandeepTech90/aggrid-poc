import { useState } from "react";

const Playground = () => {
  const [items, setItems] = useState<number[]>([1, 2, 3, 4, 5, 6, 7, 8, 9, 0]);
  const [allItems, setAllItems] = useState<number[]>([]);
  const [selected, setSelected] = useState<number | null>();

  const dragStart = (e: React.DragEvent<HTMLDivElement>, id: number) => {
    e.dataTransfer.setData("id", id.toString());
    setSelected(+id);
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-wrap gap-2">
        {items.map((i) => (
          <div
            key={i}
            className={`text-white font-bold h-[3rem] w-[3rem] bg-red-400 rounded-md text-xs flex justify-center items-center ${
              selected === i ? "bg-slate-300" : ""
            }`}
            draggable
            onDragStart={(e) => dragStart(e, i)}
            onDragEnd={() => setSelected(null)}
          >
            {i}
          </div>
        ))}
      </div>

      <div
        className="min-h-[5.1rem] relative w-full border border-slate-400 border-dashed rounded-md flex justify-start items-center gap-2 p-4"
        onDragOver={(e) => {
          e.preventDefault();
        }}
        onDrop={(e) => {
          const thisId = +e.dataTransfer.getData("id");
          setAllItems((prev) => [...prev, thisId]);
        }}
      >
        {allItems.map((i, index) => (
          <div
            key={index}
            className="relative text-white font-bold h-[3rem] w-[3rem] bg-green-400 border border-green-500 rounded-md text-xs flex justify-center items-center"
            // draggable
            // onDragStart={(e) => dragStart(e, i.toString())}
          >
            <span>{i}</span>
            <span
              onClick={() =>
                setAllItems((prev) => [
                  ...prev.slice(0, index),
                  ...prev.slice(index + 1, prev.length),
                ])
              }
              className="rounded-tr-md bg-white absolute top-0 right-0 text-red-500 w-4 h-4"
            >
              X
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Playground;
