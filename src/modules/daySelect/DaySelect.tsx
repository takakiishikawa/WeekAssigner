import React, { ChangeEvent } from "react";
import styles from "./DaySelectForm.module.scss";
import { Select, MenuItem } from "@material-ui/core";

type DaySelectProps = {
  name: string;
  defaultValue: string | null;
  onChange: (
    event: ChangeEvent<{ name?: string | undefined; value: unknown }>
  ) => void;
};

const DaySelect: React.FC<DaySelectProps> = ({
  name,
  defaultValue,
  onChange,
}) => {
  const items = ["Mon", "Tue", "Wed", "Thu", "Fri", "Next Week"];

  return (
    <Select name={name} defaultValue={defaultValue} onChange={onChange}>
      {items.map((item, index) => (
        <MenuItem key={index} value={item}>
          {item}
        </MenuItem>
      ))}
    </Select>
  );
};

export default DaySelect;
