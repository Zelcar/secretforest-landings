import React from "react";
import langs from "../assets/landingPageLangs.json";
import LandingPage from "../pages/LandingPage";
import { Route, Routes } from "react-router-dom";

const LandingPageRouter = () => {
  return (
    <Routes>
      <Route path="es" element={<LandingPage lang={langs.es} />} />
      <Route path="en" element={<LandingPage lang={langs.en} />} />
      <Route path="br" element={<LandingPage lang={langs.br} />} />
      <Route path="kr" element={<LandingPage lang={langs.ko} />} />
      <Route path="ja" element={<LandingPage lang={langs.ja} />} />
      <Route path="de" element={<LandingPage lang={langs.de} />} />
      <Route path="nl" element={<LandingPage lang={langs.nl} />} />
      <Route path="ru" element={<LandingPage lang={langs.ru} />} />
      <Route path="fr" element={<LandingPage lang={langs.fr} />} />
      <Route path="zh" element={<LandingPage lang={langs.zh} />} />
      <Route path="it" element={<LandingPage lang={langs.it} />} />
    </Routes>
  );
};

export default LandingPageRouter;
