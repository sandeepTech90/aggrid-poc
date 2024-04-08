type ButtonProps = {
  text: string;
  onClick: () => void;
  className?: string;
};

const Button = (props: ButtonProps) => {
  const { text, onClick, className } = props;
  return (
    <button
      className={`px-3 py-0.5 text-sm bg-blue-500 rounded-sm text-white w-fit cursor-pointer ${
        className ? className : ""
      }`}
      onClick={onClick}
    >
      {text}
    </button>
  );
};

export default Button;
