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
import { zustandStore } from "../zustand/zustandStore";
import Swal from "sweetalert2";
import "./WritePage.css";
import { motion } from "framer-motion";

export default function LoginPage() {
  const [title, setTitle] = useState("");

  const navigate = useNavigate();

  const getUserToken = zustandStore((state) => state.getUserToken);
  const setUserToken = zustandStore((state) => state.setUserToken);
  const userSignUp = zustandStore((state) => state.userSignUp);

  const onClickLoginButton = async () => {
    try {
      const token = await getUserToken(account);
      console.log(token);
      await setUserToken(token);
      navigate("/");
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "로그인 실패",
        text: "잘못된 아이디, 비밀번호를 입력하였습니다",
        timer: 1500,
        showConfirmButton: false,
      });
    }
  };

  const onClickSignupButtion = () => {
    userSignUp(account);
  };

  const [account, setAccount] = useState({
    name: "",
    password: "",
  });

  const onChangeUserAccount = (e) => {
    setAccount({
      ...account,
      [e.target.name]: e.target.value,
    });
  };

  console.log(account);

  return (
    <Box
      sx={{
        width: "100vw",
        minHeight: "2000px",
        backgroundColor: "#9793FF",
        padding: "50px",
        boxSizing: "border-box",
        display: "flex",
        border: 1,
        borderColor: "#6495ED",
        justifyContent: "center",
      }}
    >
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
        <Box
          className="mainbox"
          sx={{
            width: "1000px",
            height: "1000px",
            backgroundColor: "#ffffff",
            boxShadow: "0px 0px 20px -10px #000",
            mt: "24px",

            borderRadius: "30px",
            display: "flex",
            justifyContent: "center",
          }}
        >
          <Stack
            spacing={3}
            sx={{
              display: "flex",
              mt: "100px",
              alignItems: "center",
            }}
          >
            <Box
              sx={{
                width: "500px",
              }}
            >
              <TextField
                className="inputRounded"
                required
                fullWidth
                autoFocus
                onChange={(e) => onChangeUserAccount(e)}
                id="name"
                name="name"
                label="아이디"
                variant="outlined"
                autoComplete="name"
              />
            </Box>{" "}
            <Box
              sx={{
                width: "500px",
              }}
            >
              <TextField
                className="inputRounded"
                required
                fullWidth
                onChange={(e) => onChangeUserAccount(e)}
                id="password"
                name="password"
                label="비밀번호"
                variant="outlined"
                autoComplete="password"
                type="password"
              />
            </Box>
            <Stack width="500px" spacing={1}>
              <Button
                type="submit"
                fullWidth
                color="secondary"
                variant="contained"
                onClick={onClickLoginButton}
              >
                로그인
              </Button>
              <Button
                type="submit"
                fullWidth
                color="secondary"
                variant="outlined"
                onClick={onClickSignupButtion}
              >
                회원가입
              </Button>
            </Stack>
          </Stack>
        </Box>
      </motion.div>
    </Box>
  );
}
