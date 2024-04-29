const Draggable = ({ text }: { text: string }) => {
  return (
    <div
      id={text}
      draggable
      className="h-14 w-14 rounded-lg bg-green-400 flex items-center justify-center text-white"
    >
      {text}
    </div>
  );
};

export default Draggable;
