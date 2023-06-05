import { signInWithPopup } from "firebase/auth";
import { auth, provider } from "../config/firebase";
import { useNavigate } from "react-router-dom";

export const Login = () => {
  const navigete = useNavigate();

  const handleLoginClick = async () => {
    const result = await signInWithPopup(auth, provider);
    if (result?.user.emailVerified) {
      navigete("/");
    } else {
      window.alert("Unseccefull login");
    }
  };
  return (
    <div>
      <p>Sign in With Google to Continue</p>
      <button onClick={handleLoginClick}>Sign In</button>
    </div>
  );
};
