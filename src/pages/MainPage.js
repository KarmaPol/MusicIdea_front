import React, { useEffect, useState, useContext, useRef } from "react";
import {
  Container,
  Typography,
  Box,
  Avatar,
  Grid,
  Stack,
  TextField,
  Button,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import "./WritePage.css";
import Bulletin from "../components/Bulletin";

export default function MainPage() {
  const navigate = useNavigate();

  function onClickPostButton() {
    navigate("/write");
  }

  return (
    <Box
      sx={{
        width: "100vw",
        minHeight: "2000px",
        backgroundColor: "#6495ED",
        padding: "50px",
        boxSizing: "border-box",
        display: "flex",
        justifyContent: "center",
      }}
    >
      <Box
        className="mainbox"
        sx={{
          width: "1400px",
          minHeight: "2000px",
          //   border: 1,
          backgroundColor: "#ffffff",
          borderRadius: "30px",
          display: "flex",
          justifyContent: "center",
        }}
      >
        <Stack
          spacing={3}
          sx={{
            mt: "24px",
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "row-reverse",
            }}
          >
            <Button
              variant="contained"
              sx={{ fontSize: 24 }}
              onClick={onClickPostButton}
            >
              작성
            </Button>
          </Box>
          <Stack direction="row" spacing={5}>
            <Bulletin />
            <Bulletin />
            <Bulletin />
          </Stack>
          <Stack direction="row" spacing={5}>
            <Bulletin />
            <Bulletin />
            <Bulletin />
          </Stack>
          <Stack direction="row" spacing={5}>
            <Bulletin />
            <Bulletin />
            <Bulletin />
          </Stack>
        </Stack>
      </Box>
    </Box>
  );
}
