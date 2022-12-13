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
import Swal from "sweetalert2";
import { zustandStore } from "../zustand/zustandStore";
import { motion } from "framer-motion";
import { ReactMic } from "react-mic";
import Footer from "../components/Footer";

export default function WritePage() {
  const [stream, setStream] = useState();
  const [media, setMedia] = useState();
  const [onRec, setOnRec] = useState(false);
  const [source, setSource] = useState();
  const [analyser, setAnalyser] = useState();

  const [fileurl, setFileUrl] = useState("");
  const audioUrl = useRef();

  const [post, setPost] = useState({
    title: "",
    melody: null,
    str_tags: "",
  });

  const onChangeTitle = (e) => {
    setPost({ ...post, title: e.target.value });
  };

  const onChangeTag = (e) => {
    setPost({ ...post, str_tags: e.target.value });
  };

  useEffect(() => console.log(post), [post]);

  const submitPost = zustandStore((state) => state.submitPost);

  const navigate = useNavigate();

  const onSubmitPost = async () => {
    submitPost(post)
      .then(() => setTimeout(() => navigate("/"), 1000))
      .catch((e) =>
        Swal.fire({
          icon: "error",
          title: "작성 실패",
          text: "잘못된 입력 양식입니다",
          timer: 1500,
          showConfirmButton: false,
        })
      );
  };

  // const onRecAudio = () => {
  //   // 녹음 버튼 클릭시 실행 녹음 시작
  //   const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
  //   const analyser = audioCtx.createScriptProcessor(0, 1, 1);
  //   setAnalyser(analyser);

  //   function makeSound(stream) {
  //     const source = audioCtx.createMediaStreamSource(stream);
  //     setSource(source);
  //     source.connect(analyser);
  //     analyser.connect(audioCtx.destination);
  //   }

  //   navigator.mediaDevices.getUserMedia({ audio: true }).then((stream) => {
  //     document.getElementById("recordBtn").textContent = "중지";
  //     const mediaRecorder = new MediaRecorder(stream);
  //     mediaRecorder.start();
  //     setStream(stream);
  //     setMedia(mediaRecorder);
  //     makeSound(stream);

  //     analyser.onaudioprocess = function (e) {
  //       if (e.playbackTime > 300) {
  //         stream.getAudioTracks().forEach(function (track) {
  //           track.stop();
  //         });
  //         mediaRecorder.stop();

  //         analyser.disconnect();
  //         audioCtx.createMediaStreamSource(stream).disconnect();

  //         mediaRecorder.ondataavailable = function (e) {
  //           audioUrl.current = e.data;
  //           setOnRec(true);
  //         };
  //       } else {
  //         setOnRec(false);
  //       }
  //     };
  //   });
  // };

  // const offRecAudio = () => {
  //   document.getElementById("recordBtn").textContent = "녹음";

  //   media.ondataavailable = function (e) {
  //     audioUrl.current = e.data; // e.data = blob
  //     document.getElementById("fileUpload").value = ""; // 파일 선택 취소
  //     document.getElementById("controller").volume = 0.5;

  //     const soundFile = new File([audioUrl.current], "record.mp3", {
  //       lastModifiedDate: new Date(),
  //       type: "audio/mpeg",
  //     });

  //     let source = document.querySelector("#controller");
  //     source.src = URL.createObjectURL(soundFile);
  //     setPost({ ...post, melody: soundFile });
  //     setOnRec(true);
  //   };

  //   stream.getAudioTracks().forEach(function (track) {
  //     track.stop();
  //   });

  //   media.stop();

  //   analyser.disconnect();
  //   source.disconnect();
  // };

  const uploadFile = (input) => {
    document.getElementById("controller").volume = 0.5;
    const source = document.querySelector("#controller");
    var url = URL.createObjectURL(input.target.files[0]);
    console.log(input.target.files[0]);
    source.src = url;
    setPost({ ...post, melody: input.target.files[0] });
    setFileUrl(url);
  };

  const onStop = (record) => {
    console.log(record);
    const soundFile = new File([record.blob], "record", {
      lastModifiedDate: new Date(),
      type: record.blob.type,
    });

    let source = document.querySelector("#controller");
    source.src = URL.createObjectURL(soundFile);
    console.log(soundFile);
    setPost({ ...post, melody: soundFile });
    document.getElementById("fileUpload").value = ""; // 파일 선택 취소
  };

  return (
    <>
      <Box
        sx={{
          width: "100vw",
          minHeight: "2000px",
          backgroundColor: "#9793FF",
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
              height: "500px",
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
              spacing={4}
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
                <Stack spacing={2}>
                  <TextField
                    className="inputRounded"
                    onChange={(e) => onChangeTitle(e)}
                    fullWidth
                    id="title"
                    name="title"
                    label="제목"
                    variant="outlined"
                  />
                  <TextField
                    className="inputRounded"
                    onChange={(e) => onChangeTag(e)}
                    placeholder="#겨울"
                    fullWidth
                    id="tags"
                    name="tags"
                    label="태그"
                    variant="outlined"
                  />
                </Stack>
              </Box>

              <div class="filebox">
                <input
                  class="fileUpload"
                  value={fileurl}
                  placeholder="첨부파일"
                ></input>
                <Stack
                  direction="row"
                  spacing={1}
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    // justifyContent: "center",
                    mt: 1,
                  }}
                >
                  <button
                    className="recordButton"
                    id="recordBtn"
                    onClick={() => setOnRec((ex) => !ex)}
                  >
                    {onRec ? "중지" : "녹음"}
                  </button>
                  <label for="fileUpload">파일찾기</label>
                </Stack>
                <input
                  type="file"
                  id="fileUpload"
                  accept="audio/*"
                  onChange={uploadFile}
                ></input>
              </div>

              <ReactMic
                record={onRec}
                className="reactmic"
                onStop={onStop}
                // onData={this.onData}
                strokeColor="#000000"
                backgroundColor="#FF4081"
              />

              <audio id="controller" controls>
                <source id="audioSrc" src=""></source>
              </audio>
              <motion.div whileHover={{ scale: 1.1 }}>
                <Button
                  color="secondary"
                  variant="contained"
                  sx={{ fontSize: 24, borderRadius: "10px" }}
                  onClick={onSubmitPost}
                >
                  작성 완료
                </Button>
              </motion.div>
            </Stack>
          </Box>
        </motion.div>
      </Box>
      <Footer />
    </>
  );
}
