import React, { useEffect, useState } from "react";
import { AgGridReact } from "ag-grid-react";
import { ColDef } from "ag-grid-community";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import "./tablePopUp.css";

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

const PopupTable: React.FC<Props> = ({ isOpen, onClose }) => {
  const [allData, setAllData] = useState([]);
  const [rowData, setRowData] = useState<any[]>([]);
  const [hidden, setHidden] = useState<boolean>(true);

  useEffect(() => {
    if (isOpen) {
      fetchData();
    }
  }, [isOpen]);

  useEffect(() => {
    if (hidden) {
      setRowData(() => [
        ...allData.slice(0, 10),
        { country: "more" },
        ...allData.slice(allData.length - 10, allData.length),
      ]);
    } else {
      setRowData(allData);
    }
  }, [hidden, allData]);

  const fetchData = async () => {
    try {
      const response = await fetch(
        "https://www.ag-grid.com/example-assets/olympic-winners.json"
      );
      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }
      const data = await response.json();
      setAllData(data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const columnDefs: ColDef[] = [
    {
      field: "athlete",
      headerName: "Owner Name",
      sortable: true,
      filter: true,
      cellRenderer: (params: { data: { country: string } }) =>
        params.data.country === "more" ? (
          <div
            onClick={() => setHidden(false)}
            className="h-fit text-red-500 bg-gray-300 font-extrabold cursor-pointer"
          >{`+ ${allData.length - rowData.length + 1} more rows`}</div>
        ) : (
          params.data.country
        ),
      colSpan: (params) => {
        if (params.data.country === "more") return 4;
        return 1;
      },
    },
    { field: "country", headerName: "Country", sortable: true, filter: true },
    { field: "age", headerName: "Owner Age", sortable: true, filter: true },
    {
      field: "year",
      headerName: "Registration Year",
      sortable: true,
      filter: true,
    },
  ];

  return (
    <div className={`popup ${isOpen ? "active" : ""}`}>
      <div className="popup-overlay" onClick={onClose}></div>
      <div className="popup-content">
        <span className="close" onClick={onClose}>
          &times;
        </span>
        <div className="ag-theme-alpine" style={{ height: 400, width: "100%" }}>
          <AgGridReact rowData={rowData} columnDefs={columnDefs}></AgGridReact>
        </div>
      </div>
    </div>
  );
};

export default PopupTable;
