// import { collection, getDocs } from "firebase/firestore";
// import { createContext, useState } from "react";
// import { db } from "../config/firebase";

// export const PostsContext = createContext();

// export const PostContext = ({
//     children,
// }) => {

//     const [postsList, setPostsList] = useState(null);

//     const postsRef = collection(db, "posts");

//     const getPosts = async () => {
//         const data = await getDocs(postsRef)
//         setPostsList(
//             data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
//     }

//     const values = {
//         postsRef,
//         postsList,
//         getPosts,

//     }


//     return (

//         <PostContext.Provider value={values}>
//             {children}
//         </PostContext.Provider>
//     );
// };

// export default PostsContext;