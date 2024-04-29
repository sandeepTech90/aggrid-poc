import { ReactNode } from "react";

type MovableItemProps = {
  id: number;
  x: number;
  y: number;
  content?: ReactNode;
  onSelect: (id: number) => void;
  onEnd: (x: number, y: number, id: number) => void;
  danger: boolean;
};

const MovableItem = (props: MovableItemProps) => {
  const { x, y, content, id, onSelect, onEnd, danger } = props;
  return (
    <div
      id={id.toString()}
      className={`absolute h-14 w-14 rounded-lg ${
        danger ? "bg-red-400" : "bg-green-400"
      }`}
      style={{ left: `${x}px`, top: `${y}px` }}
      draggable
      onDragStart={(e) => {
        onSelect(id);
      }}
      // onDrag={(e) => {
      //   const el1 = e.target.getBoundingClientRect();
      //   // console.log("el=", el1, "X=", e.clientX, "Y=", e.clientY, "id=", id);
      // }}
      onDrop={(e) => {
        const el1 = e.target.getBoundingClientRect();
        console.log(el1.x, el1.y);

        onEnd(el1.x, el1.y, id);
      }}
      // onDragOver={(e) => {
      //   onOver(id);
      //   const divCoords = e.target.getBoundingClientRect();
      //   console.log(
      //     "left=",
      //     divCoords.left,
      //     "X=",
      //     e.clientX,
      //     "Y=",
      //     e.clientY,
      //     "id=",
      //     id
      //   );
      // }}
    >
      {content}
    </div>
  );
};

export default MovableItem;
