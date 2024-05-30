import React from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import langs from "../assets/langs.json";

import Index from "../pages/Index";

const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/en" />} />
        <Route path="/es" element={<Index lang={langs.es} />} />
        <Route path="/en" element={<Index lang={langs.en} />} />
        <Route path="/br" element={<Index lang={langs.br} />} />
        <Route path="/ko" element={<Index lang={langs.ko} />} />
        <Route path="/ja" element={<Index lang={langs.ja} />} />
        <Route path="/de" element={<Index lang={langs.de} />} />
        <Route path="/nl" element={<Index lang={langs.nl} />} />
        <Route path="/ru" element={<Index lang={langs.ru} />} />
        <Route path="/fr" element={<Index lang={langs.fr} />} />
        <Route path="/zh" element={<Index lang={langs.zh} />} />
        <Route path="/it" element={<Index lang={langs.it} />} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRouter;
