import { Route, Routes, Navigate } from "react-router-dom";
import "./App.css";
import {
  DataProvider,
  OptionsProvider,
} from "./components/context/OptionDataContext";
import ChartWrapper, { ChartTypeEnum } from "./components/charts/ChartWrapper";
import Layout from "./components/layout/Layout";

function App() {
  return (
    <DataProvider>
      <OptionsProvider>
        <Layout>
          <Routes>
            <Route path="/" element={<Navigate replace to="/barchart" />} />
            <Route path="/barchart" element={<ChartWrapper type={ChartTypeEnum.bar}/>}></Route>
            <Route path="/linechart" element={<ChartWrapper type={ChartTypeEnum.line}/>}></Route>
            <Route path="/piechart" element={<ChartWrapper type= {ChartTypeEnum.pie}/>}></Route>
            <Route path="/doughnutchart" element={<ChartWrapper type = {ChartTypeEnum.doughnut}/>}></Route>
          </Routes>
        </Layout>
      </OptionsProvider>
    </DataProvider>
  );
}

export default App;
