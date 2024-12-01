import styles from "./login.module.css";
import Footer from"../../components/Footer/Footer";

import LoginHeader from "./LoginHeader/LoginHeader";

const Login = () => {

  return (
    <div className={styles.container}>
      <LoginHeader/>
      <Footer/>
    </div>
  );
};

export default Login;
