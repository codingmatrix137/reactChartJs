import { ChartData, ChartOptions, ChartTypeRegistry } from "chart.js";
import React, {
  createContext,
  type Dispatch,
  useContext,
  useReducer,
} from "react";
import * as _ from "lodash";
// Enum for months
export enum Months {
  January,
  February,
  March,
  April,
  May,
  June,
  July,
  August,
  September,
  Octomber,
  November,
  December,
}
interface AuxProps {
  children: React.ReactNode;
}
interface OptionAction {
  type: "vertical" | "horizontal" | "stacked" |  "custom";
  modifiedOption?: ChartOptions<keyof ChartTypeRegistry>;
}

interface DataAction {
  type: "addDataset" | "removeDataset" | "addMonth" | "removeMonth" | "custom";
  modifiedData?: ChartData<keyof ChartTypeRegistry>;
}
const initialOptions: ChartOptions<keyof ChartTypeRegistry> = {
  responsive: true,
  maintainAspectRatio: true,
  indexAxis: "x" as const,
  scales: {
    x: {
      stacked: false,
    },
    y: {
      stacked: false,
    },
  },
  plugins: {
    legend: {
      position: "top" as const,
    },
    title: {
      display: true,
      text: "Chart.js Chart",
    },
  },
};
// Initial options for the chart
const OptionsContext = createContext<ChartOptions<keyof ChartTypeRegistry>>(initialOptions);
const OptionDispachContext = createContext<Dispatch<any> | undefined>(
  undefined
);

function optionReducer(
  option: ChartOptions<keyof ChartTypeRegistry>,
  action: OptionAction
): ChartOptions<keyof ChartTypeRegistry> {
  switch (action.type) {
    case "vertical":
    {
      const newOptions = _.cloneDeep(option) as ChartOptions<"bar">;
      if (
        newOptions.scales &&
        newOptions.scales.x &&
        newOptions.scales.x.stacked &&
        newOptions.scales.y &&
        newOptions.scales.y.stacked
      ) {
        newOptions.scales.x.stacked = false;
        newOptions.scales.y.stacked = false;
      }
      if (newOptions.indexAxis === 'y') {
        newOptions.indexAxis = 'x'
      } 
      return newOptions;
    }
    case "horizontal": {
      const newOptions = _.cloneDeep(option) as ChartOptions<"bar">;
      if (
        newOptions.scales &&
        newOptions.scales.x &&
        newOptions.scales.x.stacked &&
        newOptions.scales.y &&
        newOptions.scales.y.stacked
      ) {
        newOptions.scales.x.stacked = false;
        newOptions.scales.y.stacked = false;
      }
      if (newOptions.indexAxis === 'x') {
        newOptions.indexAxis = 'y'
      } 
      return newOptions;
    }
    case "stacked": {
      const newOptions = _.cloneDeep(option) as ChartOptions<"bar">;
      if (
        newOptions.scales &&
        newOptions.scales.x &&
        !newOptions.scales.x.stacked &&
        newOptions.scales.y &&
        !newOptions.scales.y.stacked
      ) {
        newOptions.scales.x.stacked = true;
        newOptions.scales.y.stacked = true;
      }
      return newOptions;
    }
    case "custom": {
      const newOptions = _.cloneDeep(option);
      return { ...newOptions, ...action.modifiedOption };
    }
  }
}
export const OptionsProvider: React.FC<AuxProps> = ({ children }) => {
  const [optionProv, dispatchOptionProv]: [ChartOptions<keyof ChartTypeRegistry>, Dispatch<any>] =
    useReducer(optionReducer, initialOptions);
  return (
    <OptionsContext.Provider value={optionProv}>
      <OptionDispachContext.Provider value={dispatchOptionProv}>
        {children}
      </OptionDispachContext.Provider>
    </OptionsContext.Provider>
  );
};

export function useOptions() {
  return useContext(OptionsContext);
}
export function useOptionsDispach() {
  return useContext(OptionDispachContext);
}

// Initial labels for the chart
const labels = [Months[0]];
// Initial data for the chart
export const initialData: ChartData<keyof ChartTypeRegistry> = {
  labels: labels,
  datasets: [
    {
      label: "Dataset 1",
      data: labels.map(() => Math.floor(Math.random() * 100)),
      backgroundColor: ["rgba(255, 99, 132, 0.5)"],
    },
    {
      label: "Dataset 2",
      data: labels.map(() => Math.floor(Math.random() * 100)),
      backgroundColor: "rgba(53, 162, 235, 0.5)",
    },
  ],
};

// Initial options for the chart
const DataContext = createContext<ChartData<keyof ChartTypeRegistry>>(initialData);
const DataDispachContext = createContext<Dispatch<any> | undefined>(undefined);

function dataReducer(
  data: ChartData<keyof ChartTypeRegistry>,
  action: DataAction
): ChartData<keyof ChartTypeRegistry> {
  switch (action.type) {
    case "addDataset": {
      const newData = _.cloneDeep(data);
      const newDataset = {
        label: `Dataset ${newData.datasets.length + 1}`, //new label with respect to the pattern
        data:
          newData && newData.labels
            ? newData.labels.map(() => Math.floor(Math.random() * 100))
            : [], //create new data that matches the label length
        backgroundColor: `rgba(${Math.floor(Math.random() * 255)}, ${Math.floor(
          Math.random() * 255
        )}, ${Math.floor(Math.random() * 255)}, 0.5)`, // create a random color
      };
      return { ...newData, datasets: [...newData.datasets, newDataset] };
    }
    case "removeDataset": {
      const newData = _.cloneDeep(data);
      const newDatasets = newData.datasets.slice(0, -1); //delete the last dataset
      return { ...newData, datasets: newDatasets }; //update the data to inform that the last dataset doesn't exist
    }
    case "addMonth": {
      const newData = _.cloneDeep(data);
      const currentMaxMonth: string =
        newData && newData.labels
          ? (newData.labels[newData.labels?.length - 1] as string)
          : Months[0]; //verify the current month
      if (currentMaxMonth !== Months[12]) {
        const nextMonth: string =
          Object.keys(Months)[Object.keys(Months).indexOf(currentMaxMonth) + 1];
        //calculate the nextMonth based on the current month

        const newDataSet = newData.datasets.map((dataset) => {
          return {
            ...dataset,
            data: [...dataset.data, Math.floor(Math.random() * 100)],
          };
        }); //calculate the new dataset by adding one more value to what we already have into the data
        return {
          ...newData,
          labels: [...(newData.labels as unknown[]), nextMonth],
          datasets: newDataSet, //update the labels and datasets
        };
      }
    }
    case "removeMonth": {
      const newData = _.cloneDeep(data);
      if (newData && newData.labels && newData.labels.length > 1) {
        //if we aren't in January

        const newDataSet = newData.datasets.map((dataset) => {
          return {
            ...dataset,
            data: dataset.data.slice(0, -1), //calculate the new dataset by deleting the last element
          };
        });
        return {
          ...newData,
          labels: newData && newData.labels ? newData.labels.slice(0, -1) : [],
          datasets: newDataSet, //update the labels and datasets
        };
      }
    }
    case "custom": {
      const newData = _.cloneDeep(data);
      return { ...newData, ...action.modifiedData };
    }
  }
}
export const DataProvider: React.FC<AuxProps> = ({ children }) => {
  const [dataProv, dispatchDataProv]: [ChartData<keyof ChartTypeRegistry>, Dispatch<any>] =
    useReducer(dataReducer, initialData);
  return (
    <DataContext.Provider value={dataProv}>
      <DataDispachContext.Provider value={dispatchDataProv}>
        {children}
      </DataDispachContext.Provider>
    </DataContext.Provider>
  );
};

export function useData() {
  return useContext(DataContext);
}
export function useDataDispach() {
  return useContext(DataDispachContext);
}
