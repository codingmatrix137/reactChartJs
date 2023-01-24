import { ChartData, ChartOptions } from "chart.js";
import React, { useContext, useEffect, useState } from "react";
import { useOptionsDispach } from "../charts/BarChartContext";
import classes from "./DropDown.module.css";

const Dropdown = () => {
  const [activeOption, setActiveOption] = useState("Vertical");
  const optionsDispatch = useOptionsDispach();
  const handleOptionChange = (event: {
    target: { value: React.SetStateAction<string> };
  }) => {
    setActiveOption(event.target.value);
    switch (event.target.value) {
      case "Vertical": {
        if (optionsDispatch) {
          optionsDispatch({
            type: "vertical",
          });
        }
        break;
      }

      case "Horizontal": {
        if (optionsDispatch) {
          optionsDispatch({
            type: "horizontal",
          });
        }

        break;
      }
      case "Stacked": {
        if (optionsDispatch) {
          optionsDispatch({
            type: "stacked",
          });
        }
        break;
      }
      default:
        break;
    }
  };

  return (
    <div className={classes.dropdownContainer}>
      <select
        className={classes.dropdownSelect}
        value={activeOption}
        onChange={handleOptionChange}
      >
        <option value="Vertical">Vertical</option>
        <option value="Horizontal">Horizontal</option>
        <option value="Stacked">Stacked</option>
      </select>
      <div className={classes.activeOption}>Active option: {activeOption}</div>
    </div>
  );
};

export default Dropdown;
