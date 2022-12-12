import React from "react";
import { Route, Routes } from "react-router-dom";
import WritePage from "./pages/WritePage";
import MainPage from "./pages/MainPage";
import LoginPage from "./pages/LoginPage";
import "./App.css";
import { createTheme, ThemeProvider } from "@mui/material";

const theme = createTheme({
  typography: {
    fontFamily: "NanumSquareNeo-bRg",
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Routes>
        <Route path="" element={<MainPage />} />
        <Route path="/write" element={<WritePage />} />
        <Route path="/login" element={<LoginPage />} />
      </Routes>
    </ThemeProvider>
  );
}

export default App;
