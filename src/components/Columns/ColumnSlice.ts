import { createSlice, current } from "@reduxjs/toolkit";

// type ColumnType = { key: string; label: string; selected: boolean };

// export interface ColumnsState {
//   value: ColumnType[];
// }

const initialState = [
  {
    key: "make",
    label: "Make",
    selected: true,
  },
  {
    key: "model",
    label: "Model",
    selected: true,
  },
  {
    key: "price",
    label: "Price",
    selected: true,
  },
  {
    key: "color",
    label: "Color",
    selected: true,
  },
  {
    key: "fuel_type",
    label: "Fuel_type",
    selected: true,
  },
  {
    key: "dom",
    label: "Dom",
    selected: true,
  },
  {
    key: "param_x",
    label: "Param_x",
    selected: true,
  },
  {
    key: "param_y",
    label: "Param_y",
    selected: true,
  },
];
// const initialState2 = {
//   value: 0,
// };
export const columnSlice = createSlice({
  name: "columns",
  initialState,
  reducers: {
    updateCol: (state, action) => {
      const { colid, checked } = action.payload;
      const currState = state;

      const ind = currState.findIndex((el) => el.key === colid);
      currState[ind].selected = checked;
      state = currState;
    },
  },
});

export const { updateCol } = columnSlice.actions;
export default columnSlice.reducer;
