import "./App.css";
import GridExample from "./components/AgGridTable";
import Columns from "./components/Columns/Columns";
// import { Counter } from "./components/Counter/Counter";

function App() {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "1rem",
        height: "100%",
        width: "100%",
      }}
    >
      {/* <Counter /> */}
      <Columns />
      <GridExample />
    </div>
  );
}

export default App;
