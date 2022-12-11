import React from "react";
import { Route, Routes } from "react-router-dom";
import WritePage from "./pages/WritePage";
import MainPage from "./pages/MainPage";
import LoginPage from "./pages/LoginPage";

function App() {
  return (
    <Routes>
      <Route path="" element={<MainPage />} />
      <Route path="/write" element={<WritePage />} />
      <Route path="/login" element={<LoginPage />} />
    </Routes>
  );
}

export default App;
