import * as React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainPage from './pages/MainPage/MainPage';
import TableScreen from './pages/TableScreen/TableScreen';
import AccessAll from "./pages/AccessAll/AccessAll";
import KpiScreen from './pages/KPIScreen/KpiScreen';
import NetProfitSceen from './pages/NetProfit/NetProfitSceen';
import TestScreen from './pages/testapi/TestScreen';

function App() {
  return (
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/tablescreen" element={<TableScreen />} />
          <Route path="/accessall" element={<AccessAll />} />
          <Route path="/kpidashboard" element={<KpiScreen />} />
          <Route path="/netprofit" element={<NetProfitSceen />} /> 
          <Route path="/testscreen" element={<TestScreen />} />
        </Routes>
      </BrowserRouter>
  );
}

export default App;
