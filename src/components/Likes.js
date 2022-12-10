import React, { useState, useContext, useEffect, useRef } from "react";
import {
  Stack,
  Typography,
  Box,
  Avatar,
  TextField,
  Button,
} from "@mui/material";
import CommentIcon from "@mui/icons-material/Comment";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import { orange, red } from "@mui/material/colors";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { motion } from "framer-motion";

import "../App.css";

export default function Likes() {
  const [likes, setlikes] = useState(0);
  const [likeClicked, setLikeClicked] = useState(false);

  return (
    <Stack
      spacing={1}
      sx={{
        ml: "20px",
      }}
    >
      <Stack spacing={1} direction="row">
        <motion.div
          className={"bulletin"}
          whileTap={{
            scale: 0.9,
            opacity: 0.6,
          }}
        >
          {!likeClicked && (
            <FavoriteBorderIcon
              sx={{
                color: "grey.700",
              }}
              onClick={() => {
                setLikeClicked((ex) => !ex);
              }}
            ></FavoriteBorderIcon>
          )}
          {likeClicked && (
            <FavoriteIcon
              sx={{
                color: red[600],
              }}
              onClick={() => {
                setLikeClicked((ex) => !ex);
              }}
            ></FavoriteIcon>
          )}
        </motion.div>
        <p>{likes} likes</p>
      </Stack>
    </Stack>
  );
}
