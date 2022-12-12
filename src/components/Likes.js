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
import { zustandStore } from "../zustand/zustandStore";

import "../App.css";

export default function Likes(props) {
  const [likes, setlikes] = useState(props.like_count);
  const [likeClicked, setLikeClicked] = useState(props.is_liked);
  const [userName, setUserName] = useState(
    localStorage.getItem("userName") || null
  );

  const submitLike = zustandStore((state) => state.submitLike);

  const onClickLikeButton = () => {
    if (userName !== null) {
      submitLike(props.post_id).then((res) => {
        setLikeClicked((ex) => !ex);
        setlikes(res.data.like_count);
        console.log(res.data);
      });
    }
  };

  useEffect(() => {});

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
                onClickLikeButton();
              }}
            ></FavoriteBorderIcon>
          )}
          {likeClicked && (
            <FavoriteIcon
              sx={{
                color: red[600],
              }}
              onClick={() => {
                onClickLikeButton();
              }}
            ></FavoriteIcon>
          )}
        </motion.div>
        <Typography>{likes} likes</Typography>
      </Stack>
    </Stack>
  );
}
