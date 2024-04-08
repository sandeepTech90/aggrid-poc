import { createSlice, current } from "@reduxjs/toolkit";

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
    updateCols: (state, action) => {
      const { cols } = action.payload;
      console.log(current(state)[0]);
      state = cols;
      console.log(state[0]);
    },
  },
});

export const { updateCol, updateCols } = columnSlice.actions;
export default columnSlice.reducer;
