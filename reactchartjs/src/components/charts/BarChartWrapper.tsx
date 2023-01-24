import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ChartData,
  ChartOptions,
} from "chart.js";
import { useContext, useEffect, useState } from "react";
import Textarea from "../UI/Textarea";

import classes from "./BarChartWrapper.module.css";
import Button from "../UI/Button";

import Dropdown from "../UI/Dropdown";
import {
  DataProvider,
  OptionsProvider,
  useData,
  useDataDispach,
  useOptions,
  useOptionsDispach,
} from "./BarChartContext";
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const BarChartWrapper = () => {
  const options = useOptions();
  const data = useData();
  useEffect(() => {
    console.log('Bar re-rendered with updated context');
  }, [options, data]);
  const optionsDispatch = useOptionsDispach();
  const dataDispatch = useDataDispach();
  function handleAddDataset(): void {
    if (dataDispatch) {
      dataDispatch({
        type: "addDataset",
      });
    }
  }

  function handleRemoveDataset(): void {
    if (dataDispatch) {
      dataDispatch({
        type: "removeDataset",
      });
    }
  }

  function handleAddMonth(): void {
    if (dataDispatch) {
      dataDispatch({
        type: "addMonth",
      });
    }
  }

  function handleRemoveMonth(): void {
    if (dataDispatch) {
      dataDispatch({
        type: "removeMonth",
      });
    }
  }

  return (
    <div className={classes.gridContainer}>
      <div className={classes.chart}>
        <Bar options={options} width={750} height={750} data={data} />
      </div>

      <div className={classes.textareaContainer}>
        <Textarea />
      </div>
      <div className={classes.buttonContainer}>
        <Button
          type="addDataset"
          text="Add Dataset"
          onClick={handleAddDataset}
          disabled={false}
        />
        <Button
          type="removeDataset"
          text="Remove Dataset"
          onClick={handleRemoveDataset}
          disabled={data.datasets.length === 1}
        />
        <Button
          type="addMonth"
          text="Add Month"
          onClick={handleAddMonth}
          disabled={data.labels?.length === 12}
        />
        <Button
          type="removeMonth"
          text="Remove Month"
          onClick={handleRemoveMonth}
          disabled={data.labels?.length === 1}
        />
      </div>
      <div className={classes.dropdownContainer}>
        <Dropdown></Dropdown>
      </div>
    </div>
  );
};

export default BarChartWrapper;
