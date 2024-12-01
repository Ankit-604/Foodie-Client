import React, { useEffect, useState } from "react";
import styles from "./signupHeader.module.css";
import headerLogo from "../../../assets/LOGO.png";
import { userSignUp, getImage } from "../../../services/index";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const SignupHeader = () => {
  const [image, setImage] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    password: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name.trim()) {
      return toast.error("Name is required");
    }
    if (!formData.phone.trim()) {
      return toast.error("Phone number is required");
    } else if (!/^\d{10}$/.test(formData.phone)) {
      return toast.error("Phone number is invalid");
    }
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
      const response = await userSignUp(formData);
      if (response.message === "Sign up successfully") {
        toast.success(response.message);
        setFormData({
          name: "",
          phone: "",
          email: "",
          password: "",
        });
        navigate("/");
      } else {
        toast.error(response.message);
      }
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };
  const handleSignIn = () => {
    navigate("/");
  };
  useEffect(() => {
    try {
      const getImageUrl = async () => {
        const response = await getImage();
        console.log(response);
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
                Today is a new day. It's your day. You shape it. Sign up to
                start ordering.
              </p>
            </div>
            <form onSubmit={handleSubmit}>
              <div className={styles.input}>
                <label htmlFor="name">Name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  placeholder="eg. John A"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                />
              </div>
              <div className={styles.input}>
                <label htmlFor="phone">Phone Number</label>
                <input
                  type="text"
                  id="phone"
                  name="phone"
                  placeholder="Enter your 10 digit mobile number"
                  value={formData.phone}
                  onChange={(e) =>
                    setFormData({ ...formData, phone: e.target.value })
                  }
                />
              </div>
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
                  type="text"
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
                {loading ? "Loading..." : "Continue"}
              </button>
            </form>
            <div className={styles.signup}>
              <p>
                Already have an account?{" "}
                <span onClick={handleSignIn}> Sign in</span>
              </p>
            </div>
          </div>
        </div>
        <div className={styles.loginImg}>
          <div className={styles.img}>
            {image.map((img, index) => (
              <img key={index} src={img.data.loginImage} alt="loginImg" />
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default SignupHeader;
