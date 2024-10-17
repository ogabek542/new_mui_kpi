import * as React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainPage from './pages/MainPage/MainPage';
import TableScreen from './pages/TableScreen/TableScreen';
import KpiScreen from './pages/KPIScreen/KpiScreen';
import NetProfitSceen from './pages/NetProfit/NetProfitSceen';
import TestScreen from './pages/testapi/TestScreen';
import NewTestScreen from './pages/testOutletPage/TestScreen';
import NewLoginScreen from './pages/NewLoginScreen/NewLoginScreen';
import BalanceTable from './pages/BalanceTable/BalanceTable';
import IndicatorKey from './pages/IndicatorKey/IndicatorKey';
import KpiDailiyWorkTable from './pages/KpiDailiyWorkTable/KpiDailiyWorkTable';
import MuiKpi from './pages/MUIkpiScreen/MuiKpi';
import DynamicIncomeScreen from "./pages/DynamicIncomeScreen/DynamicIncomeScreen"

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainPage />}>
          <Route index element={<NewLoginScreen />} />
          {/* Remove the leading slash to make it a relative path */}
          <Route path="newtestscreen" element={<NewTestScreen />} />
        </Route>
        <Route path="keyindicatorscreen" element={<IndicatorKey />} />
        <Route path="balancescreen" element={<BalanceTable />} />
        {/* <Route path="tablescreen" element={<TableScreen />} /> */}
        <Route path="kpidashboard" element={<KpiScreen />}> 
          <Route index element={<MuiKpi />} />
          {/* Remove the leading slash to make it a relative path */}
          <Route path="kpidailiyworktable" element={<KpiDailiyWorkTable />} />
        </Route>
        <Route path="netprofit" element={<NetProfitSceen />} />
        {/* <Route path="testscreen" element={<TestScreen />} /> */}
        <Route path="/dynamicincome" element={<DynamicIncomeScreen />} />
      </Routes>
    </BrowserRouter>
  );
}
 
export default App;
