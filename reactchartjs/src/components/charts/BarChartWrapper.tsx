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
  ChartDataset,
} from "chart.js";
import { useContext, useEffect, useState } from "react";
import Textarea from "../UI/Textarea";

import classes from "./BarChartWrapper.module.css";
import Button from "../UI/Button";
import { DataContext, Months, OptionsContext } from "./BarChartContext";
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const BarChartWrapper = () => {
  const options = useContext(OptionsContext);
  const data = useContext(DataContext);
  // Using the useState hook to set the initial state of the bar chart options and data.
  const [barOptions, setBarOptions] = useState<ChartOptions<"bar">>(options);
  const [barData, setBarData] = useState<ChartData<"bar">>(data);

  const handleOptionChange = (newOption: ChartOptions<"bar">) => {
    setBarOptions(newOption);
  };

  const handleDataChange = (newData: ChartData<"bar">) => {
    setBarData(newData);
  };

  const handleAddDataset = () => {
    const newDataset = {
      label: `Dataset ${barData.datasets.length + 1}`, //new label with respect to the pattern
      data:
        barData && barData.labels
          ? barData.labels.map(() => Math.floor(Math.random() * 100))
          : [], //create new data that matches the label length
      backgroundColor: `rgba(${Math.floor(Math.random() * 255)}, ${Math.floor(
        Math.random() * 255
      )}, ${Math.floor(Math.random() * 255)}, 0.5)`, // create a random color
    };
    setBarData({ ...barData, datasets: [...barData.datasets, newDataset] }); //adds new dataset to the current datasets array and updates the state of the chart
  };

  const handleRemoveDataset = () => {
    const newDatasets = barData.datasets.slice(0, -1); //delete the last dataset
    setBarData({ ...barData, datasets: newDatasets }); //update the data to inform that the last dataset doesn't exist
  };
  const handleAddMonth = () => {
    const currentMaxMonth: string =
      barData && barData.labels
        ? (barData.labels[barData.labels?.length - 1] as string)
        : Months[0]; //verify the current month
    if (currentMaxMonth !== Months[12]) {
      const nextMonth: string =
        Object.keys(Months)[Object.keys(Months).indexOf(currentMaxMonth) + 1];
      //calculate the nextMonth based on the current month
      setBarData((prevBarData) => {
        const newDataSet = prevBarData.datasets.map((dataset) => {
          return {
            ...dataset,
            data: [...dataset.data, Math.floor(Math.random() * 100)],
          };
        }); //calculate the new dataset by adding one more value to what we already have into the data
        return {
          ...prevBarData,
          labels: [...(prevBarData.labels as unknown[]), nextMonth],
          datasets: newDataSet, //update the labels and datasets
        };
      });
    }
  };
  const handleRemoveMonth = () => {
    if (barData && barData.labels && barData.labels.length > 1) {
      //if we aren't in January
      setBarData((prevBarData) => {
        const newDataSet = barData.datasets.map((dataset) => {
          return {
            ...dataset,
            data: dataset.data.slice(0, -1), //calculate the new dataset by deleting the last element
          };
        });
        return {
          ...prevBarData,
          labels:
            prevBarData && prevBarData.labels
              ? prevBarData.labels.slice(0, -1)
              : [],
          datasets: newDataSet, //update the labels and datasets
        };
      });
    }
  };
  return (
    <OptionsContext.Provider value={barOptions}>
      <DataContext.Provider value={barData}>
        <div className={classes.gridContainer}>
          <div className={classes.chart}>
            <Bar options={barOptions} width={750} height={750} data={barData} />
          </div>

          <div className={classes.textareaContainer}>
            <Textarea
            
              onOptionChange={handleOptionChange}
              onDataChange={handleDataChange}
            />
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
              disabled={barData.datasets.length === 1}
            />
            <Button
              type="addMonth"
              text="Add Month"
              onClick={handleAddMonth}
              disabled={barData.labels?.length === 12}
            />
            <Button
              type="removeMonth"
              text="Remove Month"
              onClick={handleRemoveMonth}
              disabled={barData.labels?.length === 1}
            />
          </div>
        </div>
      </DataContext.Provider>
    </OptionsContext.Provider>
  );
};

export default BarChartWrapper;
