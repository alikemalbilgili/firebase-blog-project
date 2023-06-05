import { Box } from "@chakra-ui/react";
import { getDocs, collection } from "firebase/firestore";
import { db } from "../../config/firebase";
import { useEffect, useState } from "react";
import { Post } from "./post";

export interface PostModel {
  description: string;
  id: string;
  title: string;
  userId: string;
  username: string;
}

export const Main = () => {
  const [postList, setPostList] = useState<PostModel[] | null>(null);

  const postRef = collection(db, "posts");

  const getPost = async () => {
    const data = await getDocs(postRef);
    setPostList(
      data.docs.map((doc) => ({ ...doc.data(), id: doc.id })) as PostModel[]
    );
  };

  useEffect(() => {
    getPost();
  }, []);

  return (
    <Box>
      {postList?.map((post) => (
        <Post post={post} />
      ))}
    </Box>
  );
};
