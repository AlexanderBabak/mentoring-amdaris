import React from "react";
import { FormControl, MenuItem, Select, SelectChangeEvent } from "@mui/material";

export interface SelectItemsProps {
  value: string;
  name: string;
}

interface SelectCustomProps {
  selectItems: SelectItemsProps[];
  selectedValue: string;
  onChange: (event: SelectChangeEvent) => void;
}

const SelectCustom = ({ selectItems, selectedValue, onChange }: SelectCustomProps) => {
  return (
    <FormControl sx={{ minWidth: 90 }} size="small">
      <Select value={selectedValue} onChange={onChange}>
        {selectItems.map((selectedItem) => (
          <MenuItem key={selectedItem.value} value={selectedItem.value}>
            {selectedItem.name}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default SelectCustom;
