import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import "../../css/customForm.css";
import { addDoc, collection } from "firebase/firestore";
import { db } from "../../config/firebase";
import { auth } from "../../config/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";

interface CreatePostModel {
  title: string;
  description: string;
}

export const CreatePostForm = () => {
  const navigate = useNavigate();
  const [user] = useAuthState(auth);
  const schema = yup.object().shape({
    title: yup.string().required("You must add a title").min(10).max(50),
    description: yup
      .string()
      .required("You must add a description")
      .min(10)
      .max(1500),
  });
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CreatePostModel>({
    resolver: yupResolver(schema),
  });

  const postRef = collection(db, "posts");

  const handleCreatePostSubmit = async (data: CreatePostModel) => {
    await addDoc(postRef, {
      ...data,
      username: user?.displayName,
      userId: user?.uid,
    });
    navigate("/");
  };
  return (
    <form
      onSubmit={handleSubmit(handleCreatePostSubmit)}
      className="form-container"
    >
      <input
        type="text"
        placeholder="title"
        {...register("title")}
        className="form-input"
      />
      <p className="form-error">{errors.title?.message}</p>
      <textarea
        placeholder="description"
        {...register("description")}
        className="form-textarea"
      ></textarea>
      <p className="form-error">{errors.description?.message}</p>
      <input type="submit" className="form-submit" value="Submit" />
    </form>
  );
};
