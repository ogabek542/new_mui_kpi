import * as React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainPage from './pages/MainPage/MainPage';
import TableScreen from './pages/TableScreen/TableScreen';
import AccessAll from "./pages/AccessAll/AccessAll";
import KpiScreen from './pages/KPIScreen/KpiScreen';

function App() {
  return (
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/tablescreen" element={<TableScreen />} />
          <Route path="/accessall" element={<AccessAll />} />
          <Route path="/kpidashboard" element={<KpiScreen />} />
        </Routes>
      </BrowserRouter>
  );
}

export default App;
