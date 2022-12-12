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
// import Mypiano from "../components/MyPiano";
import { zustandStore } from "../zustand/zustandStore";
import { motion } from "framer-motion";

export default function WritePage() {
  const [stream, setStream] = useState();
  const [media, setMedia] = useState();
  const [onRec, setOnRec] = useState(true);
  const [source, setSource] = useState();
  const [analyser, setAnalyser] = useState();
  const [sound, setSound] = useState();
  const audioUrl = useRef();

  const getUserToken = zustandStore((state) => state.getUserToken);

  const [post, setPost] = useState({
    title: "",
    melody: null,
  });

  const onChangeTitle = (e) => {
    setPost({ ...post, title: e.target.value });
  };

  useEffect(() => console.log(post), [post]);

  const submitPost = zustandStore((state) => state.submitPost);

  const navigate = useNavigate();

  const onSubmitPost = async () => {
    await submitPost(post);
    setTimeout(() => navigate("/"), 1000);
  };

  const onRecAudio = () => {
    // 녹음 버튼 클릭시 실행 녹음 시작
    const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    const analyser = audioCtx.createScriptProcessor(0, 1, 1);
    setAnalyser(analyser);

    function makeSound(stream) {
      const source = audioCtx.createMediaStreamSource(stream);
      setSource(source);
      source.connect(analyser);
      analyser.connect(audioCtx.destination);
    }

    navigator.mediaDevices.getUserMedia({ audio: true }).then((stream) => {
      document.getElementById("recordBtn").textContent = "중지";
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorder.start();
      setStream(stream);
      setMedia(mediaRecorder);
      makeSound(stream);

      analyser.onaudioprocess = function (e) {
        if (e.playbackTime > 300) {
          stream.getAudioTracks().forEach(function (track) {
            track.stop();
          });
          mediaRecorder.stop();

          analyser.disconnect();
          audioCtx.createMediaStreamSource(stream).disconnect();

          mediaRecorder.ondataavailable = function (e) {
            audioUrl.current = e.data;
            setOnRec(true);
          };
        } else {
          setOnRec(false);
        }
      };
    });
  };

  const offRecAudio = () => {
    document.getElementById("recordBtn").textContent = "녹음";

    media.ondataavailable = function (e) {
      audioUrl.current = e.data; // e.data = blob
      document.getElementById("fileUpload").value = ""; // 파일 선택 취소
      document.getElementById("controller").volume = 0.5;

      const soundFile = new File([audioUrl], "record.mp3", {
        lastModified: new Date().getTime(),
        type: "audio",
      });
      const source = document.querySelector("#controller");
      source.src = URL.createObjectURL(audioUrl.current);
      setPost({...post, melody: soundFile});
      setOnRec(true);
    };

    stream.getAudioTracks().forEach(function (track) {
      track.stop();
    });

    media.stop();

    analyser.disconnect();
    source.disconnect();
  };

  const uploadFile = (input) => {
    document.getElementById("controller").volume = 0.5;
    const source = document.querySelector("#controller");
    var url = URL.createObjectURL(input.target.files[0]);
    source.src = url;
    setPost({ ...post, melody: input.target.files[0] });
  };

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
            //   border: 1,
            backgroundColor: "#ffffff",
            boxShadow: "0px 0px 20px -10px #000",
            mt: "24px",

            borderRadius: "30px",
            display: "flex",
            justifyContent: "center",
          }}
        >
          <Stack
            spacing={10}
            sx={{
              display: "flex",
              mt: "50px",
              alignItems: "center",
            }}
          >
            <Box
              sx={{
                width: "600px",
              }}
            >
              <TextField
                className="inputRounded"
                onChange={(e) => onChangeTitle(e)}
                fullWidth
                id="title"
                name="title"
                label="제목"
                variant="outlined"
              ></TextField>
            </Box>
            <button id="recordBtn" onClick={onRec ? onRecAudio : offRecAudio}>
              녹음
            </button>
            <div class="filebox">
              <input class="fileUpload" value="첨부파일" placeholder="첨부파일"></input>
              <label for="fileUpload">파일찾기</label> 
              <input type="file" id="fileUpload" accept="audio/*" onChange={uploadFile}></input>
            </div>
            <audio id="controller" controls>
              <source id="audioSrc" src=""></source>
            </audio>
            <motion.div whileHover={{ scale: 1.1 }}>
              <Button
                variant="contained"
                sx={{ fontSize: 24 }}
                onClick={onSubmitPost}
              >
                작성 완료
              </Button>
            </motion.div>
          </Stack>
        </Box>
      </motion.div>
    </Box>
  );
}
