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
import Mypiano from "../components/MyPiano";

export default function WritePage() {
  const [title, setTitle] = useState("");

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
          spacing={10}
          sx={{
            display: "flex",
            mt: "50px",
            alignItems: "center",
          }}
        >
          <Box
            sx={{
              width: "600px",
            }}
          >
            <TextField
              className="inputRounded"
              onChange={(e) => setTitle(e.target.value)}
              fullWidth
              id="title"
              name="title"
              label="제목"
              variant="outlined"
            ></TextField>
          </Box>
          <Mypiano />
          <Button variant="contained" sx={{ fontSize: 24 }}>
            작성 완료
          </Button>
        </Stack>
      </Box>
    </Box>
  );
}
