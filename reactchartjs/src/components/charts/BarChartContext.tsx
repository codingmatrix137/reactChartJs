import { ChartData, ChartOptions } from 'chart.js';
import {createContext} from 'react'

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
// Initial options for the chart
export const OptionsContext =  createContext({
    responsive: true,
    maintainAspectRatio: true,
    plugins: {
      legend: {
        position: "top" as const,
      },
      title: {
        display: true,
        text: "Chart.js Bar Chart",
      },
    },
  } as ChartOptions<"bar">);

  
  // Initial labels for the chart
  const labels = [Months[0], Months[1]];
  // Initial data for the chart
 export const DataContext = createContext({
    labels:labels,
    datasets: [
      {
        label: "Dataset 1",
        data:labels.map(() => Math.floor(Math.random() * 100)),
        backgroundColor: "rgba(255, 99, 132, 0.5)",
      },
      {
        label: "Dataset 2",
        data: labels.map(() => Math.floor(Math.random() * 100)),
        backgroundColor: "rgba(53, 162, 235, 0.5)",
      },
    ],
  } as ChartData<'bar'>);