
import React from 'react';
// @ts-ignore
import { HashRouter, Routes, Route } from 'react-router-dom';
import BarcodeGeneratorPage from './pages/BarcodeGeneratorPage';

function App() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/:barcodeValue?/:encodedName?" element={<BarcodeGeneratorPage />} />
      </Routes>
    </HashRouter>
  );
}

export default App;
