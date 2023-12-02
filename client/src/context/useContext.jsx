import { createContext, useState, useContext } from "react";

const PostDataContext = createContext();

export const usePostData = () => useContext(PostDataContext);

export const PostDataProvider = ({ children }) => {
  const [postData, setPostData] = useState([]);

  return (
    <PostDataContext.Provider value={{ postData, setPostData }}>
      {children}
    </PostDataContext.Provider>
  );
};
