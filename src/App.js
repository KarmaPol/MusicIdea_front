import React from "react";
import { Route, Routes } from "react-router-dom";
import WritePage from "./pages/WritePage";
import MainPage from "./pages/MainPage";

function App() {
  return (
    <Routes>
      <Route path="" element={<MainPage />} />
      <Route path="/write" element={<WritePage />} />
    </Routes>
  );
}

export default App;
