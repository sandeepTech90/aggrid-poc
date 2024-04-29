import debounce from "lodash.debounce";
import throttle from "lodash.throttle";

type Props = {
  title: string;
  x: number;
  y: number;
};

const Drag3 = (props: Props) => {
  const { title, x, y } = props;
  const debouncedFn = throttle((e) => {
    console.log(e);
  }, 500);

  return (
    <div
      id={title}
      className="bg-slate-400 h-16 w-16 flex items-center justify-center rounded-lg text-white absolute"
      draggable
      style={{ top: x, left: y }}
      onDrag={debouncedFn}
    >
      {title}
    </div>
  );
};

export default Drag3;
