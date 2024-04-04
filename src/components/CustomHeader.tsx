import { useEffect, useRef, useState } from "react";
import { CustomHeaderProps } from "@ag-grid-community/react";

export interface MyCustomHeaderProps extends CustomHeaderProps {
  menuIcon: string;
  onPinChange: (colid: string) => void;
}

export default (props: MyCustomHeaderProps) => {
  // console.log(props.column.isSorting());

  const [ascSort, setAscSort] = useState("inactive");
  const [descSort, setDescSort] = useState("inactive");
  const [noSort, setNoSort] = useState("inactive");
  const refButton = useRef(null);

  const onMenuClicked = () => {
    props.showColumnMenu(refButton.current!);
  };

  const onSortChanged = () => {
    setAscSort(props.column.isSortAscending() ? "active" : "inactive");
    setDescSort(props.column.isSortDescending() ? "active" : "inactive");
    setNoSort(
      !props.column.isSortAscending() && !props.column.isSortDescending()
        ? "active"
        : "inactive"
    );
  };

  const onSortRequested = (order: "asc" | "desc" | null, event: any) => {
    props.setSort(order, event.shiftKey);
  };

  useEffect(() => {
    props.column.addEventListener("sortChanged", onSortChanged);
    onSortChanged();
  }, []);

  let menu = null;
  if (props.enableMenu) {
    menu = (
      <div
        ref={refButton}
        className="customHeaderMenuButton"
        onClick={() => onMenuClicked()}
      >
        <i className={`fa ${props.menuIcon}`}></i>
      </div>
    );
  }

  let pin = null;
  pin = (
    <div
      onClick={() => {
        props.onPinChange(props.column.getColId());
      }}
    >
      {
        <div
          className={`customSortDownLabel ${
            props.column.isPinned() ? "active" : "inactive"
          }`}
        >
          <i className="fa-solid fa-map-pin"></i>
        </div>
      }
    </div>
  );

  let sort = null;
  if (props.enableSorting) {
    sort = (
      <div style={{ display: "flex", gap: "0.1rem", alignItems: "center" }}>
        <div
          onClick={(event) => onSortRequested("asc", event)}
          onTouchEnd={(event) => onSortRequested("asc", event)}
          className={`customSortDownLabel ${ascSort}`}
          style={{ height: "fit-content" }}
        >
          <i
            className="fa fa-long-arrow-alt-down"
            style={{ fontSize: "10px" }}
          ></i>
        </div>
        <div
          onClick={(event) => onSortRequested("desc", event)}
          onTouchEnd={(event) => onSortRequested("desc", event)}
          className={`customSortUpLabel ${descSort}`}
        >
          <i
            className="fa fa-long-arrow-alt-up"
            style={{ fontSize: "10px" }}
          ></i>
        </div>
        <div
          onClick={(event) => onSortRequested(null, event)}
          onTouchEnd={(event) => onSortRequested(null, event)}
          className={`customSortRemoveLabel ${noSort}`}
        >
          <i className="fa fa-times"></i>
        </div>
        {/* <div>
          <i className="fa-solid fa-map-pin"></i>
        </div> */}
      </div>
    );
  }

  return (
    <div style={{ display: "flex", gap: "0.5rem", width: "100% !important" }}>
      <div className="customHeaderLabel">{props.displayName}</div>
      {sort}
      {menu}
      {pin}
    </div>
  );
};
