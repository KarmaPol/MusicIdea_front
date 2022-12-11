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
import CommentIcon from "@mui/icons-material/Comment";
import { grey } from "@mui/material/colors";
import Comment from "./Commnt";

export default function Bulletin(props) {
  const [commentClicked, setCommentClicked] = useState(false);

  console.log(props);
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
                spacing={5}
                sx={{
                  mt: "20px",
                }}
              >
                <Stack
                  height="25px"
                  sx={{
                    // mt: "20px",
                    ml: "20px",
                  }}
                >
                  <Typography
                    sx={{
                      fontWeight: "bold",
                    }}
                  >
                    {props.post.postTitle}
                  </Typography>
                  <Typography variant="subtitle2">
                    {props.post.authorID}
                  </Typography>
                </Stack>

                <motion.div
                  className={"bulletin"}
                  whileTap={{
                    scale: 0.94,
                    opacity: 0.6,
                  }}
                >
                  <Box
                    height="85px"
                    width="300px"
                    sx={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <audio className="audio" controls src />
                  </Box>
                </motion.div>
                <Stack
                  direction="row"
                  spacing={1}
                  sx={{
                    mt: "40px",
                    ml: "20px",
                  }}
                >
                  <Likes />

                  <motion.div
                    className={"bulletin"}
                    whileTap={{
                      scale: 0.9,
                      opacity: 0.6,
                    }}
                  >
                    <CommentIcon
                      onClick={() => setCommentClicked((ex) => !ex)}
                      sx={{
                        color: "grey.700",
                      }}
                    />
                  </motion.div>
                </Stack>
              </Stack>
              {commentClicked && (
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
              )}
              {commentClicked && <Comment postID={props.post.postID} />}
            </Stack>
          </Box>
        </motion.div>
      </motion.div>
    </>
  );
}
