import { useEffect, useState } from "react";
import Drag3 from "./Drag3";

const Playground3 = () => {
  const [isOverlapped, setOverlapped] = useState<boolean>(false);
  const isCollide = (a, b) => {
    return !(
      a.y + a.height < b.y ||
      a.y > b.y + b.height ||
      a.x + a.width < b.x ||
      a.x > b.x + b.width
    );
  };

  useEffect(() => {}, []);

  return (
    <div className="flex gap-4">
      <Drag3 title="ABC" x={0} y={0} />
      <Drag3 title="XYZ" x={0} y={65} />
      <div className="absolute bottom-20">
        {isOverlapped ? "CRASH!!!" : "GOOD"}
      </div>
    </div>
  );
};

export default Playground3;
