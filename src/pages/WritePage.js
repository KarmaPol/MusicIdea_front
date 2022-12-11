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
import { motion } from "framer-motion";

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
      <motion.div
        className={"bulletin"}
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{
          duration: 0.8,
          delay: 0.5,
          ease: [0, 0.71, 0.2, 1.01],
        }}
      >
        <Box
          className="mainbox"
          sx={{
            width: "1000px",
            minHeight: "2000px",
            //   border: 1,
            backgroundColor: "#ffffff",
            boxShadow: "0px 0px 20px -10px #000",
            mt: "24px",

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
            <motion.div whileHover={{ scale: 1.1 }}>
              <Button variant="contained" sx={{ fontSize: 24 }}>
                작성 완료
              </Button>
            </motion.div>
          </Stack>
        </Box>
      </motion.div>
    </Box>
  );
}
