import { Route, Routes, Navigate, Link } from "react-router-dom";
import "./App.css";
import { DataProvider, OptionsProvider } from "./components/charts/BarChartContext";
import BarChartWrapper from "./components/charts/BarChartWrapper";
import Layout from "./components/layout/Layout";

function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Navigate replace to="/barchart" />} />
        <Route
          path="/barchart"
          element={
            <DataProvider>
              <OptionsProvider>
                <BarChartWrapper />
              </OptionsProvider>
            </DataProvider>
          }
        ></Route>
      </Routes>
    </Layout>
  );
}

export default App;
