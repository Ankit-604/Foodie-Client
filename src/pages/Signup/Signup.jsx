import React from "react";
import styles from "./signup.module.css";
import SignupHeader from "./SignupHeader/SignupHeader";
import Footer from "../../components/Footer/Footer";

const Signup = () => {
  return (
    <div className={styles.container}>
      <SignupHeader />
      <Footer/>
    </div>
  );
};

export default Signup;
