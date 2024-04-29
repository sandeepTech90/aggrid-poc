import { useEffect, useState } from "react";
import Draggable from "./Draggable";
import MovableItem from "./MovableItem";
type ItemType = {
  x: number;
  y: number;
  id: number;
};
const Playground2 = () => {
  const [items, setItems] = useState<ItemType[]>([]);
  const [selected, setSelected] = useState<number | null>(null);
  const [over, setOver] = useState<number | null>(null);
  const [isOverlapping, setIsOverlapping] = useState<boolean>(false);

  useEffect(() => {
    if (over !== selected) {
      setIsOverlapping(true);
    } else setIsOverlapping(false);
  }, [over]);

  const onDropItem = (e: React.DragEvent<HTMLDivElement>) => {
    setItems((prev) => {
      const thisel = prev.find((i) => i.id === selected);

      if (thisel == undefined) {
        return [...prev, { x: e.clientX, y: e.clientY, id: +new Date() }];
      } else {
        // return prev.map((el) => {
        //   if (el.id === selected) {
        //     const elCoord = e.target.getBoundingClientRect();
        //     console.log(elCoord);
        //     return { ...el, x: elCoord.x, y: elCoord.y };
        //   }
        //   return el;
        // });
      }
      return prev;
    });
    setSelected(null);
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="flex gap-4">
        <Draggable text="Item 1" />
        <Draggable text="Item 2" />
        <Draggable text="Item 3" />
      </div>
      <div className="border border-dashed border-black pb-14">
        <div
          className="w-full h-[15rem] "
          onDragOver={(e) => {
            e.preventDefault();
          }}
          onDrop={(e) => onDropItem(e)}
        >
          {items.map((i) => (
            <MovableItem
              id={i.id}
              key={i.id}
              x={i.x}
              y={i.y}
              onSelect={(id) => setSelected(id)}
              onEnd={(x, y, id) => {
                setItems((prev) =>
                  prev.map((el) => {
                    if (el.id === id) {
                      console.log(x, y);

                      return { ...el, x, y };
                    }
                    return el;
                  })
                );
              }}
              danger={isOverlapping && over === i.id}
            ></MovableItem>
          ))}
        </div>
      </div>
      {isOverlapping ? "OVER" : "NOT OVER"}
    </div>
  );
};

export default Playground2;
