import React from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import langs from "../assets/langs.json";

import Index from "../pages/Index";

const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/en" />} />
        <Route path="/en" element={<Index lang={langs.en} />} />
        <Route path="/es" element={<Index lang={langs.es} />} />
        <Route path="/br" element={<Index lang={langs.br} />} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRouter;
