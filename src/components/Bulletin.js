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
import PlayCircleIcon from "@mui/icons-material/PlayCircle";
import StopCircleIcon from "@mui/icons-material/StopCircle";
import Likes from "./Likes";
import "./Bulletin.css";

export default function Bulletin() {
  const [isPlaying, setPlaying] = useState(false);

  function onClickPlay() {
    setPlaying((ex) => !ex);
  }

  return (
    <Box
      sx={{
        borderRadius: "30px",
        width: "250px",
        height: "250px",
        boxShadow: "0px 0px 20px -10px #000",
      }}
    >
      <Stack
        spacing={5}
        sx={{
          mt: "20px",
          ml: "20px",
        }}
      >
        <Box height="25px">
          <Typography
            sx={{
              fontWeight: "bold",
            }}
          >
            제목
          </Typography>
        </Box>
        <Box height="85px">
          {!isPlaying ? (
            <PlayCircleIcon
              sx={{
                width: "80px",
                height: "80px",
              }}
              onClick={onClickPlay}
            />
          ) : (
            <StopCircleIcon
              sx={{
                width: "80px",
                height: "80px",
              }}
              onClick={onClickPlay}
            />
          )}
        </Box>
        <Box height="30px">
          <Likes />
        </Box>
      </Stack>
    </Box>
  );
}
