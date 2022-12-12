import React, {
  useEffect,
  useState,
  useContext,
  useRef,
  Children,
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
import { useLocation, useNavigate } from "react-router-dom";
import "./WritePage.css";
import Bulletin from "../components/Bulletin";
import { zustandStore } from "../zustand/zustandStore";
import { motion } from "framer-motion";
import { ExpandMore } from "@mui/icons-material";

export default function MainPage() {
  const getPosts = zustandStore((state) => state.getPosts);
  const cleanUserToken = zustandStore((state) => state.cleanUserToken);
  const submitSearch = zustandStore((state) => state.submitSearch);
  const [userName, setUserName] = useState(
    localStorage.getItem("userName") || null
  );

  const [nextURL, setNextURL] = useState(null);
  const [nextButtonClicked, setNextButtonClicked] = useState(false);

  const [posts, setPosts] = useState([]);
  const [chunkedPosts, setChunkedPosts] = useState([]);
  const [pageOffset, setPageOffset] = useState([0]);

  const [searchMsg, setSearchMsg] = useState(null);

  const [search, setSearch] = useState("");

  console.log(search);

  useEffect(() => {
    setSearchMsg(null);
    if (search !== "") {
      if (search.length === 1) {
        setPosts([]);
        setNextURL(null);
        setSearchMsg("2글자 이상 검색해주세요");
      } else {
        submitSearch(search).then((res) => {
          const searched_posts = res.data.results;
          console.log(res);
          setNextURL(res.data.next);
          setPosts(searched_posts);
          if (searched_posts.length === 0) {
            setSearchMsg(`"${search}" 검색 결과가 없습니다.`);
          }
        });
      }
    } else {
      getPosts(nextURL).then((res) => {
        const nextPosts = res.data.results;
        setNextURL(res.data.next);
        setPosts((ex) => [...ex, ...nextPosts]);
      });
    }

    console.log(posts);
  }, [nextButtonClicked, search]);

  useEffect(() => {
    setChunkedPosts(chunkArray(posts));
  }, [posts]);

  const onClickLogoutButton = () => {
    cleanUserToken();
    setUserName(null);
  };

  const chunkArray = () => {
    const temp = [];

    for (let i = 0; i < posts.length; i += 3) {
      temp.push(posts.slice(i, i + 3));
    }
    console.log("chunk", temp);

    return temp;
  };

  useEffect(() => {
    console.log(posts.slice(pageOffset, pageOffset + 3));
  }, [userName]);

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
            display: "flex",
            alignItems: "center",
          }}
        >
          <Box
            sx={{
              width: "1000px",
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
              {userName && (
                <>
                  <Avatar />
                  <Typography variant="h5">{userName}</Typography>
                </>
              )}
              {!userName && (
                <motion.div whileHover={{ scale: 1.1 }}>
                  <Button
                    variant="contained"
                    sx={{ fontSize: 15, borderRadius: "10px" }}
                    onClick={onClickLoginButton}
                  >
                    로그인
                  </Button>
                </motion.div>
              )}
              {userName && (
                <motion.div whileHover={{ scale: 1.1 }}>
                  <Button
                    variant="contained"
                    sx={{ fontSize: 15, borderRadius: "10px" }}
                    onClick={onClickLogoutButton}
                  >
                    로그아웃
                  </Button>
                </motion.div>
              )}
            </Stack>
            <Stack direction="row" spacing={3}>
              <TextField
                className="inputRounded"
                placeholder="검색"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                // fullWidth
                // onKeyDown={onSubmitEnter}
                size="small"
              />
              <motion.div whileHover={{ scale: 1.1 }}>
                <Button
                  variant="contained"
                  sx={{ fontSize: 15, borderRadius: "10px" }}
                  onClick={onClickPostButton}
                >
                  작성
                </Button>
              </motion.div>
            </Stack>
          </Box>
          {searchMsg && (
            <Box
              sx={{
                borderRadius: "30px",
                width: "800px",
                height: "250px",
                backgroundColor: "#ffffff",
                boxShadow: "0px 0px 20px -10px #000",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Typography
                sx={{
                  fontSize: "25px",
                }}
              >
                {searchMsg}
              </Typography>
            </Box>
          )}

          {chunkedPosts.map((dividedPosts, idx) => (
            <Stack
              key={idx}
              direction="row"
              spacing={6}
              sx={{
                display: "flex",
                justifyContent: "center",
              }}
            >
              {dividedPosts.map((post) => (
                <Bulletin key={post.id} post={post} />
              ))}
            </Stack>
          ))}

          {nextURL !== null && (
            <motion.div
              className={"mainbox2"}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{
                duration: 0.8,
                delay: 0.5,
                ease: [0, 0.71, 0.2, 1.01],
              }}
            >
              <motion.div whileHover={{ scale: 1.05 }}>
                <Box
                  sx={{
                    width: "600px",
                    borderRadius: "5px",
                    backgroundColor: "white",
                    display: "flex",
                    alignItems: "center",
                    borderRadius: "20px",
                    boxShadow: "0px 0px 20px -10px #000",
                  }}
                >
                  <Button
                    fullWidth
                    variant="outlined"
                    sx={{
                      color: "black",
                      // fontWeight: "bold",
                      fontSize: "20px",
                      borderRadius: "20px",
                    }}
                    onClick={() => {
                      setNextButtonClicked((ex) => !ex);
                    }}
                  >
                    more
                  </Button>
                </Box>
              </motion.div>
            </motion.div>
          )}
        </Stack>
      </Box>
    </Box>
  );
}
