import {
  Dispatch,
  ReactNode,
  SetStateAction,
  useEffect,
  useState,
} from "react";
import Button from "./Button";
import { useOutsideClick } from "../../hooks/useClick";

type DropdownProps = {
  placeholder: string;
  children: ReactNode;
  open?: boolean;
};
const Dropdown = (props: DropdownProps) => {
  const { placeholder, children, open } = props;
  const [openDropdown, setOpenDropdown] = useState<boolean>(open ?? false);
  const ref = useOutsideClick(() => setOpenDropdown(false));

  // useEffect(() => {
  //   const onClick = () => {
  //     setOpenDropdown(false);
  //   };

  //   window.addEventListener("click", onClick);
  //   return () => {
  //     removeEventListener("click", onClick);
  //   };
  // });

  return (
    <div className="">
      <div
        onClick={() => setOpenDropdown(false)}
        className={`w-full h-full fixed top-0 left-0 z-[9999] ${
          openDropdown ? "block" : "hidden"
        }`}
      ></div>
      <div className="w-fit">
        <Button
          onClick={() => setOpenDropdown((prev) => !prev)}
          text={placeholder}
          className="!bg-white !text-black border-slate-400 border"
        />
        <div
          className={`absolute h-[15rem] overflow-y-auto mt-0.5 bg-white z-[9999] border-slate-400 border p-2 rounded-md  min-w-[10rem] ${
            openDropdown ? "block" : "hidden"
          }`}
        >
          {children}
        </div>
      </div>
    </div>
  );
};

export default Dropdown;
