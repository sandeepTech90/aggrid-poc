import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store";
import { updateCol } from "./ColumnSlice";

const Columns = () => {
  const allCols = useSelector((state: RootState) => state.column);
  const dispatch = useDispatch();

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "start",
        border: "1px dashed gray",
        borderRadius: "5px",
        padding: "1rem",
      }}
    >
      <p
        style={{
          fontWeight: "500",
          marginBottom: "1rem",
          color: "gray",
        }}
      >
        Filter Columns
      </p>
      <div style={{ display: "flex", gap: "1rem" }}>
        {allCols.map((col, index) => (
          <div
            key={col.key}
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "0.2rem",
            }}
          >
            <input
              type="checkbox"
              checked={col.selected}
              style={{ padding: "2px" }}
              onChange={(state) =>
                dispatch(
                  updateCol({ colid: col.key, checked: state.target.checked })
                )
              }
            />
            <p style={{ fontSize: "12px", fontWeight: "500" }}>{col.label}</p>
          </div>
        ))}
      </div>
      {/* <button
        style={{
          backgroundColor: "cornflowerblue",
          color: "white",
          alignSelf: "flex-end",
          fontWeight: "500",
          letterSpacing: "1px",
        }}
      >
        Apply
      </button> */}
    </div>
  );
};

export default Columns;
