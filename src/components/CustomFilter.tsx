import { useCallback, useRef } from "react";
import {
  IAfterGuiAttachedParams,
  IDoesFilterPassParams,
} from "ag-grid-community";
import { CustomFilterProps, useGridFilter } from "ag-grid-react";

export default ({ model, onModelChange }: CustomFilterProps) => {
  const refInput = useRef<HTMLInputElement>(null);

  const doesFilterPass = useCallback(
    (params: IDoesFilterPassParams) => {
      const { node } = params;
      const filterText: string = model;

      const value: string = node.data.fuel_type
        ? node.data.fuel_type.toLowerCase()
        : "";

      return filterText
        .toLowerCase()
        .split(" ")
        .every((filterWord) => value.indexOf(filterWord) >= 0);
    },
    [model]
  );

  const afterGuiAttached = useCallback((params?: IAfterGuiAttachedParams) => {
    if (!params || !params.suppressFocus) {
      refInput.current?.focus();
    }
  }, []);

  useGridFilter({
    doesFilterPass,
    afterGuiAttached,
  });

  return (
    <div style={{ padding: "0.5rem" }}>
      <div style={{ marginBottom: "0.5rem", fontWeight: "bolder" }}>
        Fuel type filter
      </div>
      <div>
        <input
          ref={refInput}
          type="text"
          value={model || ""}
          onChange={({ target: { value } }) =>
            onModelChange(value === "" ? null : value)
          }
          placeholder="Enter fuel type"
        />
      </div>
    </div>
  );
};
