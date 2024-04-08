import "./App.css";
import GridExample from "./components/AgGridTable";
import Columns from "./components/Columns/Columns";

function App() {
  return (
    <div className="flex flex-col gap-4 h-full w-full">
      <Columns />
      <GridExample />
    </div>
  );
}

export default App;
