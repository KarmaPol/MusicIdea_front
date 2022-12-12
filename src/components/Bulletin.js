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
import { motion, useAnimationControls } from "framer-motion";
import CommentIcon from "@mui/icons-material/Comment";
import Comment from "./Commnt";
import TagBox from "./TagBox";
import Swal from "sweetalert2";

import DeleteIcon from "@mui/icons-material/Delete";
import { zustandStore } from "../zustand/zustandStore";

export default function Bulletin(props) {
  const [commentClicked, setCommentClicked] = useState(false);
  const [commentCount, setCommentCount] = useState(props.post.comment_cnt || 0);

  const deletePost = zustandStore((state) => state.deletePost);

  const onClickDeleteButton = () => {
    Swal.fire({
      title: "정말 삭제하시겠습니까?",
      showCancelButton: true,
      confirmButtonText: "확인",
      denyButtonText: "취소",
    }).then((res) => {
      if (res.isConfirmed) {
        deletePost(props.post.id).then(() => window.location.reload());
      }
    });
  };

  return (
    <>
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
        <motion.div whileHover={{ scale: 1.05 }} className={"bulletin"}>
          <Box
            sx={{
              borderRadius: "30px",
              width: commentClicked ? "600px" : "300px",
              height: "250px",
              backgroundColor: "#ffffff",
              position: commentClicked ? "sticky" : "relative",
              boxShadow: "0px 0px 20px -10px #000",
            }}
          >
            <Stack direction="row">
              <Stack
                spacing={1}
                sx={{
                  mt: "20px",
                }}
              >
                <Stack
                  height="50px"
                  sx={{
                    // mt: "20px",
                    ml: "20px",
                  }}
                >
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                    }}
                  >
                    <Typography
                      sx={{
                        fontWeight: "bold",
                      }}
                    >
                      {props.post.title}
                    </Typography>
                    {props.userName === props.post.author && (
                      <motion.div
                        className={"bulletin"}
                        whileTap={{
                          scale: 0.9,
                          opacity: 0.6,
                        }}
                      >
                        <DeleteIcon
                          onClick={() => {
                            onClickDeleteButton();
                          }}
                          sx={{
                            cursor: "pointer",
                            mr: "20px",
                            color: "grey.600",
                          }}
                        />
                      </motion.div>
                    )}
                  </Box>

                  <Typography variant="subtitle2">
                    {props.post.author}
                  </Typography>
                </Stack>

                <Box
                  height="100px"
                  width="300px"
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <audio
                    className="audio"
                    id="controller"
                    controls
                    src={props.post.melody}
                  />
                </Box>
                <TagBox tags={props.post.tags} />

                <Stack
                  direction="row"
                  spacing={1}
                  sx={{
                    mt: "40px",
                    ml: "20px",
                  }}
                >
                  <Likes
                    like_count={props.post.like_count}
                    post_id={props.post.id}
                    is_liked={props.post.is_liked}
                  />

                  <motion.div
                    className={"bulletin"}
                    whileTap={{
                      scale: 0.9,
                      opacity: 0.6,
                    }}
                  >
                    <Stack direction="row" spacing={1}>
                      <CommentIcon
                        onClick={() => setCommentClicked((ex) => !ex)}
                        sx={{
                          color: "grey.700",
                          cursor: "pointer",
                        }}
                      />
                      <Typography>{commentCount}</Typography>
                    </Stack>
                  </motion.div>
                </Stack>
              </Stack>

              {commentClicked && (
                <>
                  <Box
                    sx={{
                      mt: "20px",
                      border: 1,
                      width: 0,
                      height: "210px",
                      maxWidth: "0px",
                      borderColor: "grey.200",
                    }}
                  />
                  <Comment
                    postID={props.post.id}
                    setCommentCount={setCommentCount}
                  />
                </>
              )}
            </Stack>
          </Box>
        </motion.div>
      </motion.div>
    </>
  );
}
