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

const Comment = (props) => {
  const [comments, setComments] = useState(
    [
      {
        id: "1",
        content: "test1dddddddddddddddddddddddddddddddddddddddddddddddddddd",
      },
      {
        id: "2",
        content: "test1",
      },
      {
        id: "3",
        content: "test1",
      },
      {
        id: "4",
        content: "test1",
      },
      {
        id: "5",
        content: "test1",
      },
    ].reverse()
  );
  const [comment, setComment] = useState("");

  const onSubmitEnter = (e) => {
    if (e.key === "Enter") {
      setComments([
        {
          id: "6",
          content: comment,
        },
        ...comments,
      ]);
      setComment("");
    }
  };

  console.log(comment);
  console.log(comments);

  return (
    <Stack
      spacing={2}
      sx={{
        mt: "20px",
        ml: "20px",
      }}
    >
      <Box width="260px">
        <TextField
          value={comment}
          className="inputRounded"
          size="small"
          fullWidth
          placeholder="댓글 작성"
          onKeyDown={onSubmitEnter}
          onChange={(e) => setComment(e.target.value)}
        />
      </Box>

      <Stack
        sx={{
          display: "flex",
          width: "256px",
          height: "155px",
          borderRadius: "10px",
          // border: 1,
          borderColor: "grey.400",
          overflow: "auto",
        }}
      >
        {comments.map((c) => (
          <>
            <Stack
              direction="row"
              spacing={1}
              sx={{
                maxWidth: "246px",
                mt: "5px",
                ml: "5px",
              }}
            >
              <Typography
                variant="body1"
                sx={{
                  fontWeight: "bold",
                  fontSize: "15px",
                }}
              >
                {c.id}
              </Typography>

              <Typography
                sx={{
                  wordBreak: "break-word",
                  fontSize: "15px",
                }}
              >
                {c.content}
              </Typography>
            </Stack>
          </>
        ))}
      </Stack>
    </Stack>
  );
};

export default Comment;
