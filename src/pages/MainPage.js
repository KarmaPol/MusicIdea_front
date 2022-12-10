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
import { motion } from "framer-motion";

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
          // border: 1,
          // backgroundColor: "#ffffff",
          borderRadius: "30px",
          display: "flex",
          justifyContent: "center",
        }}
      >
        <Stack
          spacing={3}
          sx={{
            width: "1000px",
            mt: "24px",
          }}
        >
          <Box
            sx={{
              borderRadius: "10px",
              padding: "10px",
              boxSizing: "border-box",
              backgroundColor: "#ffffff",
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              boxShadow: "0px 0px 20px -10px #000",
            }}
          >
            <Stack
              direction="row"
              spacing={2}
              sx={{
                display: "flex",
                alignItems: "center",
              }}
            >
              <Avatar />
              <Typography variant="h5">user</Typography>
            </Stack>

            <motion.div whileHover={{ scale: 1.1 }}>
              <Button
                variant="contained"
                sx={{ fontSize: 24 }}
                onClick={onClickPostButton}
              >
                작성
              </Button>
            </motion.div>
          </Box>
          <Stack
            direction="row"
            spacing={6}
            sx={{
              display: "flex",
              justifyContent: "center",
            }}
          >
            <Bulletin />
            <Bulletin />
            <Bulletin />
          </Stack>
          <Stack
            direction="row"
            spacing={6}
            sx={{
              display: "flex",
              justifyContent: "center",
            }}
          >
            <Bulletin />
            <Bulletin />
            <Bulletin />
          </Stack>
          <Stack
            direction="row"
            spacing={6}
            sx={{
              display: "flex",
              justifyContent: "center",
            }}
          >
            <Bulletin />
            <Bulletin />
            <Bulletin />
          </Stack>
        </Stack>
      </Box>
    </Box>
  );
}
