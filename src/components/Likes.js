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

import "../App.css";

export default function Likes() {
  const [likes, setlikes] = useState(0);
  const [likeClicked, setLikeClicked] = useState(false);

  return (
    <Stack spacing={1}>
      <Stack spacing={1} direction="row">
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
        <p>{likes} likes</p>
        <CommentIcon
          sx={{
            color: "grey.700",
          }}
        />
      </Stack>
    </Stack>
  );
}
