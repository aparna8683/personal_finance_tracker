import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Layout from "./components/layout/Layout";
import Home from "./pages/Home";
import InsightPage from "./pages/InsightPage";
import Settings from "./pages/Settings";
import { AppProvider } from "./context/AppContext";
import Analytics from "./pages/Analtics";
import TransactionPage from "./pages/TransitionPage";

const App = () => {
  return (
    <AppProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="transactions" element={<TransactionPage />} />
            <Route path="analytics" element={<Analytics />} />
            <Route path="insights" element={<InsightPage />} />
            <Route path="settings" element={<Settings />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </AppProvider>
  );
};

export default App;
