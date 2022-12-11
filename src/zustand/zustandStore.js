import create from "zustand";
import axios from "axios";

export const zustandStore = create((set, get) => ({
  userToken: localStorage.getItem("userToken")
    ? localStorage.getItem("userToken")
    : null,

  /**토큰 저장 */
  setUserToken: async (_token) => {
    set((state) => ({ userToken: _token }));
    localStorage.setItem("userToken", _token);
  },
  /**로그인 */
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
  /**로그아웃 */
  cleanUserToken: () => {
    set((state) => ({ userToken: "not logined" }));
    set((state) => ({ userName: null }));

    localStorage.clear();
  },
  /**회원가입 */
  userSignUp: async (_account) => {
    axios.post("http://3.37.33.149/user/signup", _account);
  },
  /**게시물 9개 받기 */
  getPosts: async () => {
    const response = await axios.get("주소");

    return response;
  },
  /**게시물 작성 */
  submitPost: async (_post) => {
    const config = {
      Authorization: `Bearer ${get().userToken.access}`,
    };

    console.log(config);

    axios.post("주소", _post, config);
  },
  /**댓글 작성 */
  submitComment: async (_comment) => {
    const config = {
      Authorization: "Token " + get().userToken,
    };

    axios.post("주소", _comment, config);
  },
  /**댓글 삭제 */
  deleteComment: async (_commentID) => {
    const config = {
      Authorization: "Token " + get().userToken,
    };

    axios.post(`주소/${_commentID}`, config);
  },
}));
