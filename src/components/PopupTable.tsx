import React, { useEffect, useState } from 'react';
import { AgGridReact } from 'ag-grid-react';
import { ColDef } from 'ag-grid-community';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

const PopupTable: React.FC<Props> = ({ isOpen, onClose }) => {
  const [rowData, setRowData] = useState<any[]>([]);

  useEffect(() => {
    if (isOpen) {
      fetchData();
    }
  }, [isOpen]);

  const fetchData = async () => {
    try {
      const response = await fetch('https://jsonplaceholder.typicode.com/posts');
      if (!response.ok) {
        throw new Error('Failed to fetch data');
      }
      const data = await response.json();
      setRowData(data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const columnDefs: ColDef[] = [
    { field: 'userId', headerName: 'User ID', sortable: true, filter: true },
    { field: 'id', headerName: 'ID', sortable: true, filter: true },
    { field: 'title', headerName: 'Title', sortable: true, filter: true },
    { field: 'body', headerName: 'Body', sortable: true, filter: true }
  ];

  return (
    <div className={`popup ${isOpen ? 'active' : ''}`}>
      <div className="popup-overlay" onClick={onClose}></div>
      <div className="popup-content">
        <span className="close" onClick={onClose}>&times;</span>
        <div className="ag-theme-alpine" style={{ height: 400, width: '100%' }}>
          <AgGridReact rowData={rowData} columnDefs={columnDefs}>
          </AgGridReact>
        </div>
      </div>
    </div>
  );
};

export default PopupTable;

