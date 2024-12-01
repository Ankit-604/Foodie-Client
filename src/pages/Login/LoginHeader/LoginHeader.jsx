import React, { useEffect, useState } from "react";
import styles from "./loginHeader.module.css";
import headerLogo from "../../../assets/LOGO.png";
import { getImage, userSignIn } from "../../../services/index";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useAuth } from "../../../components/Context/AuthContext";

const LoginHeader = () => {
  const [image, setImage] = useState([]);
  const [loading, setLoading] = useState(false);
  const { logIn } = useAuth();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();
  const handleSignUp = () => {
    navigate("/signup");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.email.trim()) {
      return toast.error("Email is required");
    } else if (!formData.email.includes("@") || !formData.email.includes(".")) {
      return toast.error("Email is invalid");
    }
    const regex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    if (!formData.password.trim()) {
      return toast.error("Password is required");
    } else if (!regex.test(formData.password)) {
      return toast.error(
        "Password must be at least 8 characters long and include uppercase, lowercase, numbers, and symbols"
      );
    }
    setLoading(true);
    try {
      const response = await userSignIn(formData);
      if (response.message === "Logged in successfully") {
        toast.success(response.message);
        setFormData({
          email: "",
          password: "",
        });
        localStorage.setItem("token", response.token);
        localStorage.setItem("userId", response.user._id);
        logIn(response.user.name);
        navigate("/home");
      } else {
        toast.error(response.message);
      }
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    try {
      const getImageUrl = async () => {
        const response = await getImage();

        setImage(response.data);
      };
      getImageUrl();
    } catch (error) {
      console.error(error);
    }
  }, []);
  return (
    <>
      <div className={styles.header}>
        <div className={styles.loginPage}>
          <div className={styles.items}>
            <div className={styles.loginLogoWrapper}>
              <div className={styles.loginLogo}>
                <img src={headerLogo} alt="loginLogo" />
              </div>
            </div>
            <div className={styles.loginWelcome}>
              <h1>Welcome Back 👋 </h1>
            </div>
            <div className={styles.loginDescription}>
              <p>
                Today is a new day. It's your day. You shape it. Sign in to
                start ordering.
              </p>
            </div>
            <form onSubmit={handleSubmit}>
              <div className={styles.input}>
                <label htmlFor="email">Email</label>
                <input
                  type="text"
                  id="email"
                  name="email"
                  placeholder="Example@email.com"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                />
              </div>
              <div className={styles.input}>
                <label htmlFor="password">Password</label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  placeholder="At least 8 characters"
                  value={formData.password}
                  onChange={(e) =>
                    setFormData({ ...formData, password: e.target.value })
                  }
                />
              </div>
              <button
                className={styles.loginBtn}
                disabled={loading}
                type="submit"
              >
                {loading ? "Loading..." : "Sign in"}
              </button>
            </form>
            <div className={styles.signup}>
              <p>
                Don't you have an account?
                <span onClick={handleSignUp}> Sign up</span>
              </p>
            </div>
          </div>
        </div>
        <div className={styles.loginImg}>
          <div className={styles.img}>
            {image.map((img, i) => (
              <img key={i} src={img.data.loginImage} alt="loginImg" />
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default LoginHeader;
