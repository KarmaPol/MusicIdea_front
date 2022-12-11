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
import Bulletin from "../components/Bulletin";
import { zustandStore } from "../zustand/zustandStore";
import { motion } from "framer-motion";

export default function MainPage() {
  const getPosts = zustandStore((state) => state.getPosts);
  const cleanUserToken = zustandStore((state) => state.cleanUserToken);

  const onClickLogoutButton = () => {
    cleanUserToken();
  };

  const fetchPosts = async () => {
    const posts = await getPosts;
    setPosts(posts);
  };

  useEffect(() => {
    // fetchPosts();
  }, []);

  const [posts, setPosts] = useState([
    {
      postID: "1",
      postTitle: "테스트 제목1",
      authorID: "1234",
    },
    {
      postID: "1",
      postTitle: "테스트 제목2",
      authorID: "1234",
    },
    {
      postID: "1",
      postTitle: "테스트 제목3",
      authorID: "1234",
    },
    {
      postID: "1",
      postTitle: "테스트 제목4",
      authorID: "1234",
    },
    {
      postID: "1",
      postTitle: "테스트 제목5",
      authorID: "1234",
    },
    {
      postID: "1",
      postTitle: "테스트 제목6",
      authorID: "1234",
    },
    {
      postID: "1",
      postTitle: "테스트 제목7",
      authorID: "1234",
    },
    {
      postID: "1",
      postTitle: "테스트 제목8",
      authorID: "1234",
    },
    {
      postID: "1",
      postTitle: "테스트 제목9",
      authorID: "1234",
    },
  ]);

  console.log(posts.slice(0, 3));

  const navigate = useNavigate();

  function onClickPostButton() {
    navigate("/write");
  }

  function onClickLoginButton() {
    navigate("/login");
  }

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
      <Box
        className="mainbox"
        sx={{
          width: "1400px",
          minHeight: "2000px",
          // border: 1,
          // backgroundColor: "#ffffff",
          borderRadius: "30px",
          display: "flex",
          justifyContent: "center",
        }}
      >
        <Stack
          spacing={3}
          sx={{
            width: "1000px",
            mt: "24px",
          }}
        >
          <Box
            sx={{
              borderRadius: "10px",
              padding: "10px",
              boxSizing: "border-box",
              backgroundColor: "#ffffff",
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              boxShadow: "0px 0px 20px -10px #000",
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
              <Avatar />
              <Typography variant="h5">user</Typography>
              <motion.div whileHover={{ scale: 1.1 }}>
                <Button
                  variant="contained"
                  sx={{ fontSize: 15 }}
                  onClick={onClickLoginButton}
                >
                  로그인
                </Button>
              </motion.div>{" "}
              <motion.div whileHover={{ scale: 1.1 }}>
                <Button
                  variant="contained"
                  sx={{ fontSize: 15 }}
                  onClick={onClickLogoutButton}
                >
                  로그아웃
                </Button>
              </motion.div>
            </Stack>

            <motion.div whileHover={{ scale: 1.1 }}>
              <Button
                variant="contained"
                sx={{ fontSize: 15 }}
                onClick={onClickPostButton}
              >
                작성
              </Button>
            </motion.div>
          </Box>
          <Stack
            direction="row"
            spacing={6}
            sx={{
              display: "flex",
              justifyContent: "center",
            }}
          >
            {posts.slice(0, 3).map((post) => (
              <Bulletin post={post} />
            ))}
          </Stack>
          <Stack
            direction="row"
            spacing={6}
            sx={{
              display: "flex",
              justifyContent: "center",
            }}
          >
            {posts.slice(3, 6).map((post) => (
              <Bulletin post={post} />
            ))}
          </Stack>
          <Stack
            direction="row"
            spacing={6}
            sx={{
              display: "flex",
              justifyContent: "center",
            }}
          >
            {posts.slice(6, 9).map((post) => (
              <Bulletin post={post} />
            ))}
          </Stack>
        </Stack>
      </Box>
    </Box>
  );
}
