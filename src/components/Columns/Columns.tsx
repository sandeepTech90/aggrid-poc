import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store";
import { updateCol } from "./ColumnSlice";
import Dropdown from "../ui/Dropdown";
import { useState } from "react";

const Columns = () => {
  const allCols = useSelector((state: RootState) => state.column);
  const dispatch = useDispatch();
  const [thisCols, setThisCols] = useState(allCols);

  const filterCols = (e: any) => {
    const query = e.target.value;
    setThisCols(() => {
      if (query !== "") {
        return allCols.filter((c) =>
          c.label.toLocaleLowerCase().includes(query.toLocaleLowerCase())
        );
      }
      return allCols;
    });
  };

  return (
    <Dropdown placeholder="Filter Columns">
      <input type="text" placeholder="Search column" onChange={filterCols} />
      <div>
        {thisCols.map((col) => (
          <div
            className="flex gap-1 items-center hover:bg-slate-300 px-2 py-1 cursor-pointer"
            key={col.key}
          >
            <input
              type="checkbox"
              value={col.key}
              checked={col.selected}
              onChange={(state) => {
                dispatch(
                  updateCol({ colid: col.key, checked: state.target.checked })
                );
                setThisCols((prev) =>
                  prev.map((c) => {
                    if (c.key === col.key) {
                      return { ...c, selected: state.target.checked };
                    }
                    return c;
                  })
                );
              }}
            />
            <p className="text-xs font-medium">{col.label}</p>
          </div>
        ))}
      </div>
      {/* <Button
        text="Apply"
        onClick={() => dispatch(updateCols({ cols: thisCols }))}
        className="w-full mt-3"
      /> */}
    </Dropdown>
  );
};

export default Columns;
