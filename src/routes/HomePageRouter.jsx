import React from "react";
import HomePage from "../pages/HomePage";
import { Route, Routes } from "react-router-dom";
import langs from "../assets/homePageLangs.json";
const HomePageRouter = () => {
  return (
    <Routes>
      <Route path="es" element={<HomePage lang={langs.es} />} />
      <Route path="en" element={<HomePage lang={langs.en} />} />
      <Route path="br" element={<HomePage lang={langs.br} />} />
      <Route path="kr" element={<HomePage lang={langs.ko} />} />
      <Route path="ja" element={<HomePage lang={langs.ja} />} />
      <Route path="de" element={<HomePage lang={langs.de} />} />
      <Route path="nl" element={<HomePage lang={langs.nl} />} />
      <Route path="ru" element={<HomePage lang={langs.ru} />} />
      <Route path="fr" element={<HomePage lang={langs.fr} />} />
      <Route path="zh" element={<HomePage lang={langs.zh} />} />
      <Route path="it" element={<HomePage lang={langs.it} />} />
    </Routes>
  );
};

export default HomePageRouter;
