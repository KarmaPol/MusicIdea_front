import create from "zustand";
import axios from "axios";

export const zustandStore = create((set, get) => ({
  userToken: localStorage.getItem("userToken"),

  /**토큰 저장 */
  setUserToken: async (_token) => {
    set((state) => ({ userToken: _token.access }));
    localStorage.setItem("userToken", _token.access);
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
    set((state) => ({ userToken: null }));
    set((state) => ({ userName: null }));

    localStorage.clear();
  },
  /**회원가입 */
  userSignUp: async (_account) => {
    axios.post("http://3.37.33.149/user/signup", _account);
  },
  /**게시물 9개 받기 */
  getPosts: async (_nextURL) => {
    const token = localStorage.getItem("userToken");
    console.log(token);

    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
        withCredentials: false,
      },
    };

    if (token === null) {
      const posts = await axios.get(_nextURL || "http://3.37.33.149/posts");
      return posts;
    } else {
      const posts = await axios.get(
        _nextURL || "http://3.37.33.149/posts",
        config
      );
      return posts;
    }
  },
  /**게시물 작성 */
  submitPost: async (_post) => {
    const token = localStorage.getItem("userToken");
    console.log(token);

    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
        withCredentials: false,
        "Content-Type": "multipart/form-data;",
      },
    };

    console.log(config);

    console.log(_post);
    const formData = new FormData();

    formData.append("title", _post.title);
    formData.append("melody", _post.melody);
    formData.append("str_tags", _post.str_tags);

    console.log(formData);

    try {
      await axios.post("http://3.37.33.149/post", formData, config);
    } catch (e) {
      throw e;
    }
  },

  /**게시물 삭제 */
  deletePost: async (_post_id) => {
    const token = localStorage.getItem("userToken");
    console.log(token);

    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
        withCredentials: false,
        "Content-Type": "multipart/form-data;",
      },
    };

    console.log(config);

    try {
      await axios.delete(`http://3.37.33.149/post/${_post_id}`, config);
    } catch (e) {
      throw e;
    }
  },
  /**댓글 작성 */
  submitComment: async (_comment, _post_id) => {
    const token = localStorage.getItem("userToken");
    console.log(token);

    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
        withCredentials: false,
      },
    };
    console.log(_comment);

    try {
      await axios.post(
        `http://3.37.33.149/post/${_post_id}/comment`,
        {
          content: _comment,
        },
        config
      );
    } catch (e) {
      throw e;
    }
  },
  /**댓글 가져오기 */
  getComments: async (_post_id) => {
    try {
      const comments = await axios.get(
        `http://3.37.33.149/post/${_post_id}/comments`
      );

      return comments;
    } catch (e) {
      throw e;
    }
  },
  /**댓글 삭제 (미구현)*/
  deleteComment: async (_commentID) => {
    const config = {
      headers: {
        Authorization: "Token " + get().userToken,
      },
    };
    axios.post(`주소/${_commentID}`, config);
  },
  /**좋아요 누르기 */
  submitLike: async (_post_id) => {
    const token = localStorage.getItem("userToken");
    console.log(token);

    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
        withCredentials: false,
      },
    };

    const like_count = await axios.get(
      `http://3.37.33.149/post/${_post_id}/like`,
      config
    );

    return like_count;
  },
  /**검색 */
  submitSearch: async (_text) => {
    const searched_posts = await axios.get(
      `http://3.37.33.149/posts?search=${_text}`
    );

    return searched_posts;
  },
}));
