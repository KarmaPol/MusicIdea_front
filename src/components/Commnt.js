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
import Likes from "./Likes";
import "./Bulletin.css";
import { motion } from "framer-motion";

const Comment = () => {
  return (
    <Box
      sx={{
        width: "1000px",
        heigth: "1000px",
        border: 1,
        backgroundColor: "#ffffff",
        boxShadow: "0px 0px 20px -10px #000",
        position: "sticky",
        // display: "flex",

        bottom: 0,
        zIndex: 10,
      }}
    >
      <TextField></TextField>
    </Box>
  );
};

export default Comment;
