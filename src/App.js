import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { OilProvider } from './contexts/OilContext';
import { BottleProvider } from './contexts/BottleContext';
import { BottleStockProvider } from './contexts/BottleStockContext';
import { SaleProvider } from './contexts/SaleContext';
import InventoryPage from './pages/InventoryPage';
import LoginPage from './pages/LoginPage';
import SalesPage from './pages/SalesPage';
import Settings from './pages/Settings';

import { isEnglish } from './utlis/isEnglish';

function App() {
  return (
      <AuthProvider>
        <OilProvider>
          <BottleProvider>
            <BottleStockProvider>
              <SaleProvider>
                <div style={
                  isEnglish ? { direction: "ltr" } : { direction: "rtl" }
                } className="App">
                  <Routes>
                    <Route path="/login" element={<LoginPage />} />

                    <Route path="/oil-and-bottles" element={<InventoryPage />} />

                    <Route path="/" element={<SalesPage />} />

                    <Route path="/settings" element={<Settings />} />

                  </Routes>
                </div>
              </SaleProvider>
            </BottleStockProvider>
          </BottleProvider>
        </OilProvider>
      </AuthProvider>
  );
}

export default App;