import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainPage from './pages/MainPage/MainPage';
import TableScreen from './pages/TableScreen/TableScreen';

function App() {
  return (
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/tablescreen" element={<TableScreen />} />

        </Routes>
      </BrowserRouter>
  );
}

export default App;
