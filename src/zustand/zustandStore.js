import create from "zustand";
import axios from "axios";

export const zustandStore = create((set, get) => ({
  userToken: localStorage.getItem("userToken")
    ? localStorage.getItem("userToken")
    : "not logined",

  setUserToken: async (_token) => {
    set((state) => ({ userToken: _token }));
    localStorage.setItem("userToken", _token);
  },
  getUserToken: async (_account) => {
    // userName 저장
    try {
      const token = await axios.post("http://3.37.33.149/user/token", _account);
      localStorage.setItem("userName", _account.name);
      return token.data;
    } catch (error) {
      throw error;
    }
  },
  cleanUserToken: () => {
    set((state) => ({ userToken: "not logined" }));
    set((state) => ({ userName: null }));

    localStorage.clear();
  },
  userSignUp: async (_account) => {
    axios.post("http://3.37.33.149/user/signup", _account);
  },

  getPosts: async () => {
    const response = await axios.get("주소");

    return response;
  },

  submitPost: async (_post) => {
    const config = {
      Authorization: `Bearer ${get().userToken.access}`,
    };

    console.log(config);

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
