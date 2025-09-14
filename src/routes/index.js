import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Cadastro from "../components/Cadastro";
import Login from "../components/Login";
import Principal from "../components/Principal";

function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Rota inicial será a de cadastro */}
        <Route path="/" element={<Cadastro />} />
        <Route path="/login" element={<Login />} />
        <Route path="/principal" element={<Principal />} />
      </Routes>
    </BrowserRouter>
  );
}

export default AppRoutes;
