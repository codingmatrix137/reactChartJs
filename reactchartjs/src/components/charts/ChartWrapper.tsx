import { Bar, Doughnut, Line, Pie } from "react-chartjs-2";
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
  PointElement,
  LineElement,
  Filler,
  ArcElement,
} from "chart.js";
import Textarea from "../UI/Textarea";

import classes from "./ChartWrapper.module.css";
import Button from "../UI/Button";

import Dropdown from "../UI/Dropdown";
import {
  useData,
  useDataDispach,
  useOptions,
  useOptionsDispach,
} from "../context/OptionDataContext";
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  PointElement,
  LineElement,
  Filler,
  ArcElement
);
export enum ChartTypeEnum {
  bar = "bar",
  line = "line",
  pie = "pie",
  doughnut = "doughnut",
}
interface ChartType {
  type: ChartTypeEnum;
}
const ChartWrapper: React.FC<ChartType> = ({ type }) => {
  const options = useOptions();
  const data = useData();

  let dislableOptions = false;
  function getChartComponent(type: ChartTypeEnum) {
    switch (type) {
      case ChartTypeEnum.bar:
        return (
          <Bar
            options={options as ChartOptions<"bar">}
            width={750}
            height={750}
            data={data as ChartData<"bar">}
          />
        );
      case ChartTypeEnum.line:
        return (
          <Line
            options={options as ChartOptions<"line">}
            width={750}
            height={750}
            data={data as ChartData<"line">}
          />
        );
      case ChartTypeEnum.pie:
        return (
          <Pie width={750} height={750} data={data as ChartData<"pie">}></Pie>
        );
      case ChartTypeEnum.doughnut:
      return <Doughnut width={750} height={750} data = {data as ChartData<'doughnut'>}></Doughnut>

    }
  }
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
      <div className={classes.chart}>{getChartComponent(type)}</div>

      <div className={classes.textareaContainer}>
        <Textarea dislableOptions={dislableOptions} />
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

export default ChartWrapper;
