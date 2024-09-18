import * as React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainPage from './pages/MainPage/MainPage';
import TableScreen from './pages/TableScreen/TableScreen';
import AccessAll from "./pages/AccessAll/AccessAll";
import KpiScreen from './pages/KPIScreen/KpiScreen';
import NetProfitSceen from './pages/NetProfit/NetProfitSceen';
import TestScreen from './pages/testapi/TestScreen';
import NewTestScreen from './pages/testOutletPage/TestScreen';
import NewLoginScreen from './pages/NewLoginScreen/NewLoginScreen';
import KeyIndicatorTable from './pages/KeyIndicatorTable/KeyIndicatorTable';
import BalanceTable from './pages/BalanceTable/BalanceTable';
import IndicatorKey from './pages/IndicatorKey/IndicatorKey';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainPage />}>
          <Route index element={<NewLoginScreen />} />
          <Route path="/newtestscreen" element={<NewTestScreen />} />
        </Route>
        <Route path="/keyindicatorscreen" element={<IndicatorKey />} />
        {/* <Route path="/keyindicatorscreen" element={<KeyIndicatorTable />} /> */}
        <Route path="/tablescreen" element={<TableScreen />} />
        <Route path="/accessall" element={<AccessAll />} />
        <Route path="/kpidashboard" element={<KpiScreen />} />
        <Route path="/netprofit" element={<NetProfitSceen />} />
        <Route path="/testscreen" element={<TestScreen />} />
        <Route path="/balancescreen" element={<BalanceTable />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
