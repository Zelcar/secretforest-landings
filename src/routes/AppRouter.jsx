import React from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import LandingPageRouter from "./LandingPageRouter";
import HomePageRouter from "./HomePageRouter";

const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/landing/en" />} />
        <Route path="/landing/*" element={<LandingPageRouter />}></Route>
        <Route path="/*" element={<HomePageRouter />}></Route>
      </Routes>
    </BrowserRouter>
  );
};

export default AppRouter;
