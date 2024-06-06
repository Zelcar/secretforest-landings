import React from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import langs from "../assets/langs.json";

import Index from "../pages/Index";

const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/landing/en" />} />
        <Route path="/landing/es" element={<Index lang={langs.es} />} />
        <Route path="/landing/en" element={<Index lang={langs.en} />} />
        <Route path="/landing/br" element={<Index lang={langs.br} />} />
        <Route path="/landing/ko" element={<Index lang={langs.ko} />} />
        <Route path="/landing/ja" element={<Index lang={langs.ja} />} />
        <Route path="/landing/de" element={<Index lang={langs.de} />} />
        <Route path="/landing/nl" element={<Index lang={langs.nl} />} />
        <Route path="/landing/ru" element={<Index lang={langs.ru} />} />
        <Route path="/landing/fr" element={<Index lang={langs.fr} />} />
        <Route path="/landing/zh" element={<Index lang={langs.zh} />} />
        <Route path="/landing/it" element={<Index lang={langs.it} />} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRouter;
