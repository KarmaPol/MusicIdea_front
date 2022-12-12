import React, {
  Children,
  useEffect,
  useState,
  useContext,
  useRef,
} from "react";
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
import { zustandStore } from "../zustand/zustandStore";

const Comment = (props) => {
  const submitComment = zustandStore((state) => state.submitComment);
  const getComments = zustandStore((state) => state.getComments);

  const [comments, setComments] = useState([]);
  const [comment, setComment] = useState("");

  const onSubmitEnter = (e) => {
    if (e.key === "Enter") {
      submitComment(comment, props.postID).then(() => {
        setComment("");
        props.setCommentCount((ex) => ex + 1);
      });
    }
  };

  useEffect(() => {
    getComments(props.postID).then((res) => {
      console.log(res);
      setComments(res.data.reverse());
    });
  }, [comment]);

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
        {Children.toArray(
          comments.map((c) => (
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
                  {c.author}
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
          ))
        )}
      </Stack>
    </Stack>
  );
};

export default Comment;
