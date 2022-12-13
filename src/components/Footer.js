import React from "react";
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

export default function Footer() {
  return (
    <Box
      className="footer"
      sx={{
        backgroundColor: "#DCD5E0",
        height: "200px",
        position: "relative",
        boxSizing: "border-box",
        width: "100vw",

        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-end",
        padding: "20px",
      }}
      component="footer"
    >
      <Box
        sx={{
          display: "flex",
          // width: "1000px",
          justifyContent: "flex-end",
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
          <Typography
            variant="subtitle12"
            sx={{
              color: "gray",
            }}
          >
            김경훈
          </Typography>
          <Typography
            variant="subtitle12"
            sx={{
              color: "gray",
            }}
          >
            오혜성
          </Typography>
          <Typography
            variant="subtitle12"
            sx={{
              color: "gray",
            }}
          >
            최동규
          </Typography>
          <Typography
            variant="body1"
            sx={{
              color: "gray",
              fontWeight: "bold",
            }}
          >
            MusicIdea
          </Typography>
        </Stack>
      </Box>
    </Box>
  );
}
