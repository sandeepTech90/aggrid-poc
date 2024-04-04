import React, { Component } from "react";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";

class CustomHeaderWithPin extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pinned: false,
    };
  }

  togglePinned = () => {
    this.setState(
      (prevState) => ({
        pinned: !prevState.pinned,
      }),
      () => {
        this.props.columnApi.setColumnPinned(
          this.props.column.colId,
          this.state.pinned ? "left" : null
        );
      }
    );
  };

  render() {
    return (
      <div>
        <span>{this.props.displayName}</span>
        <button onClick={this.togglePinned}>
          {this.state.pinned ? "Unpin" : "Pin"}
        </button>
      </div>
    );
  }
}

class TestApp extends Component {
  render() {
    const columnDefs = [
      {
        headerName: "Make",
        field: "make",
        sortable: true,
        filter: true,
        headerComponentFramework: CustomHeaderWithPin,
      },
      { headerName: "Model", field: "model", sortable: true, filter: true },
      { headerName: "Price", field: "price", sortable: true, filter: true },
    ];

    const rowData = [
      { make: "Toyota", model: "Celica", price: 35000 },
      { make: "Ford", model: "Mondeo", price: 32000 },
      { make: "Porsche", model: "Boxster", price: 72000 },
    ];

    return (
      <div className="ag-theme-alpine" style={{ height: 400, width: 600 }}>
        <AgGridReact columnDefs={columnDefs} rowData={rowData} />
      </div>
    );
  }
}

export default TestApp;
