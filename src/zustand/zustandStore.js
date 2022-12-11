import create from "zustand";
import axios from "axios";
import { DiscFull } from "@mui/icons-material";

export const zustandStore = create((set, get) => ({
  userToken: localStorage.getItem("userToken")
    ? localStorage.getItem("userToken")
    : "not logined",
  setUserToken: (_token) => {
    set((state) => ({ userToken: _token }));
    localStorage.setItem("userToken", _token);
  },
  getUserToken: async (_account) => {
    const token = await axios.post("주소", _account);
    return token;
  },
  cleanUserToken: () => {
    set((state) => ({ userToken: "not logined" }));
    localStorage.clear();
  },
  userSignUp: async (_account) => {
    axios.post("주소", _account);
  },

  getPosts: async () => {
    const response = await axios.get("주소");

    return response;
  },

  submitPost: async (_post) => {
    const config = {
      Authorization: "Token " + get().userToken,
    };

    axios.post("주소", _post, config);
  },

  submitComment: async (_comment) => {
    const config = {
      Authorization: "Token " + get().userToken,
    };

    axios.post("주소", _comment, config);
  },

  deleteComment: async (_commentID) => {
    const config = {
      Authorization: "Token " + get().userToken,
    };

    axios.post(`주소/${_commentID}`, config);
  },
}));
