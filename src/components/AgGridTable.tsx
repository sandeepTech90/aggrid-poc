import { Fragment, useEffect, useMemo, useState } from "react";
import { AgGridReact } from "ag-grid-react"; // React Grid Logic
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-quartz.css";
import { CarObj, generateDummyData } from "../utils/randomNumber";
import CustomFilter from "./CustomFilter";
import { ColDef, GroupCellRenderer } from "@ag-grid-community/core";
import CustomHeader from "./CustomHeader";
import { useSelector } from "react-redux";
import { RootState } from "../store";
import PopupTable from './PopupTable';

const SHOW_COUNT = 5;

// Create new GridExample component
const GridExample = () => {
  const allCols = useSelector((state: RootState) => state.column);

  // Row Data: The data to be displayed.
  const defs = [
    {  headerName:"More Data",field: "model", cellRenderer:()=>{return <span onClick={() => {
      openPopup();
;}}>View More</span>} },
    {
      field: "make",
      colSpan: (params: { data: { make: string } }) => {
        if (params.data.make === "more_items") return 7;
        return 1;
      },
      cellRenderer: (params: { data: { make: string } }) =>
        params.data.make === "more_items" ? (
          <div
            onClick={() => {
              
              (false);
            }}
            style={{
              height: "fit",
              color: "red",
              background: "#e1dede",
              fontWeight: "bolder",
              cursor: "pointer",
            }}
          >{`+ ${allData.length - rowData.length + 1} more rows`}</div>
        ) : (
          params.data.make
        ),
    },

    {
      field: "model",
      suppressHeaderMenuButton: true,
      headerComponentParams: { menuIcon: "fa-external-link-alt" },
    },
   
    { field: "price", filter: "agNumberColumnFilter" },
    { field: "color", filter: "agTextColumnFilter" },
    { field: "fuel_type", headerName: "Fuel", filter: CustomFilter },
    { field: "dom", headerName: "DOM", filter: "agDateColumnFilter" },
    {
      field: "param_x",
      headerName: "Test Col 1",
    },
    {
      field: "param_y",
      headerName: "Test Col 2",
    },
  ];

  // const tempData
  const [hidden, setHidden] = useState(false);
  const [allData, setAllData] = useState<CarObj[]>([]);
  const [rowData, setRowData] = useState<CarObj[]>([]);
  const [colDefs, setColDefs] = useState(defs);




  useEffect(() => {
    const data = generateDummyData();
    setAllData(data);
  }, []);

  useEffect(() => {
    if (hidden) {
      setRowData([
        ...allData.slice(0, SHOW_COUNT),
        { make: "more_items" },
        ...allData.slice(allData.length - SHOW_COUNT, allData.length),
      ]);
    } else setRowData(allData);
    setColDefs(defs);
  }, [hidden, allData]);

  useEffect(() => {
    setColDefs(defs);
  }, [rowData]);

  useEffect(() => {
    const colMap: any = {};
    allCols.forEach((c) => {
      colMap[c.key] = c;
    });
    setColDefs((prev) =>
      prev.map((col) => ({ ...col, hide: !colMap[col.field].selected }))
    );
  }, [allCols]);

  const components = useMemo<{
    [p: string]: any;
  }>(() => {
    return {
      agColumnHeader: CustomHeader,
    };
  }, []);

  const defaultColDef = useMemo<ColDef>(() => {
    return {
      editable: true,
      flex: 1,
      minWidth: 180,
      filter: true,
      headerComponentParams: {
        menuIcon: "fa-bars",
        onPinChange: (colid: string) =>
          setColDefs((prev) =>
            prev.map((col) => {
              if (col.field === colid) {
                return { ...col, pinned: col.pinned ? !col.pinned : true };
              }
              return col;
            })
          ),
      },
    };
  }, []);
  // Container: Defines the grid's theme & dimensions.


  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const openPopup = () => {
    console.log('open popup');
    setIsPopupOpen(true);
  };

  const closePopup = () => {
    setIsPopupOpen(false);
  };
  return (
    <Fragment>
    <div
      className={"ag-theme-quartz"}
      style={{ width: "100%", height: "100%" }}
    >
      <AgGridReact
        rowData={rowData}
        columnDefs={colDefs}
        paginationPageSizeSelector={[10, 100, 500, 1000, 5000]}
        paginationPageSize={1000}
        // pagination={true}
        reactiveCustomComponents
        components={components}
        defaultColDef={defaultColDef}
        rowDragManaged={true}
        rowDragEntireRow={true}
      />
    </div>

    <PopupTable isOpen={isPopupOpen} onClose={closePopup} />
  

 </Fragment>

  );
};

export default GridExample;
