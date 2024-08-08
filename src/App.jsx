import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainPage from './pages/MainPage/MainPage';
import TableScreen from './pages/TableScreen/TableScreen';
import AccessAll from "./pages/AccessAll/AccessAll";

function App() {
  return (
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/tablescreen" element={<TableScreen />} />
          <Route path="/accessall" element={<AccessAll />} />
        </Routes>
      </BrowserRouter>
  );
}

export default App;
