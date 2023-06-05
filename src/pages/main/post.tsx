import { PostModel } from "./main";
import "../../css/customPost.css";
import { auth, db } from "../../config/firebase";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import { useAuthState } from "react-firebase-hooks/auth";
import { useEffect, useState } from "react";

interface Props {
  post: PostModel;
}

interface Like {
  userId: string;
  likeId: string;
}

export const Post = (props: Props) => {
  const [likes, setLikes] = useState<Like[] | null>(null);
  const { post } = props;
  const [user] = useAuthState(auth);

  const likesRef = collection(db, "likes");

  const likesDoc = query(likesRef, where("postId", "==", post.id));

  const getLikes = async () => {
    const data = await getDocs(likesDoc);
    setLikes(
      data.docs.map((doc) => ({ userId: doc.data().userId, likeId: doc.id }))
    );
  };
  const addLike = async () => {
    const newDoc = await addDoc(likesRef, {
      userId: user?.uid,
      postId: post.id,
    });
    if (user) {
      setLikes((prev) =>
        prev
          ? [...prev, { userId: user?.uid, likeId: newDoc.id }]
          : [{ userId: user?.uid, likeId: newDoc.id }]
      );
    }
  };

  const removeLike = async () => {
    const likeToDeleteQuery = query(
      likesRef,
      where("postId", "==", post.id),
      where("userId", "==", user?.uid)
    );

    const likeToDeleteData = await getDocs(likeToDeleteQuery);
    const likeToDelete = doc(db, "likes", likeToDeleteData.docs[0].id);
    await deleteDoc(likeToDelete);

    if (user) {
      setLikes(
        (prev) =>
          prev &&
          prev.filter((like) => like.likeId !== likeToDeleteData.docs[0].id)
      );
    }
  };
  const hasUserLiked = likes?.find((like) => like.userId === user?.uid);

  useEffect(() => {
    getLikes();
  }, []);

  return (
    <div className="post-container">
      <h1 className="post-title">{post.title}</h1>
      <p className="post-description">{post.description}</p>
      <div className="post-footer">
        <small className="post-username">@{post.username}</small>
      </div>
      <button
        onClick={hasUserLiked ? removeLike : addLike}
        className={hasUserLiked ? "pig-button reverse" : "pig-button"}
      >
        <span>&#128022;</span>
      </button>
      {likes && <p> Bayır Domuzu Onayı: {likes.length}</p>}
    </div>
  );
};
