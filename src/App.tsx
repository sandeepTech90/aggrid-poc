import "./App.css";
import GridExample from "./components/AgGridTable";
import Columns from "./components/Columns/Columns";

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
      <Columns />
      <GridExample />
    </div>
  );
}

export default App;
