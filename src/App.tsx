import "./App.css";
import GridExample from "./components/AgGridTable";
import Columns from "./components/Columns/Columns";
import Playground from "./components/dnd/Playground";
import Playground2 from "./components/dnd/Playground2";
import Playground3 from "./components/dnd/drag3/Playground3";

function App() {
  return (
    <div className="flex flex-col gap-4 h-full w-full">
      {/* <Playground /> */}
      <Playground2 />
      {/* <Playground3 /> */}
      {/* <Columns />
      <GridExample /> */}
    </div>
  );
}

export default App;
