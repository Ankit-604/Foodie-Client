import React from "react";
import styles from "./orderSuccess.module.css";
import Nav from "../../components/Nav/Nav";
import AllNavBar from "../../components/AllNavbar/AllNavbar";
import successImg from "../../assets/success.png";
import Footer from "../../components/Footer/Footer";
import { useNavigate } from "react-router-dom";

const OrderSuccess = () => {
  const title = JSON.parse(localStorage.getItem("title"));
  const navigate = useNavigate();
  return (
    <>
      <div className={styles.orderSuccessMain}>
        <Nav />
        <div className={styles.orderSuccessAllNav}>
          <AllNavBar />
        </div>
        <div className={styles.orderSuccessWrapper}>
          <div className={styles.success}>
            <div className={styles.orderSuccessImg}>
              <img src={successImg} alt="success-image" />
            </div>
          </div>
          <h3>Order Placed Successfully</h3>
          <div className={styles.orderSuccessOrderDescription}>
            <p>Your order is confirmed and on its way. Get set to </p>
            <h3>savor your chosen delights!</h3>
          </div>
          <div className={styles.orderSuccessOrderDetails}>
            {title && title.map((item, i) => <p key={i}>{item}</p>)}
            <button onClick={() => navigate("/home")}>Back to Home</button>
          </div>
        </div>
      </div>
      <div className={styles.footer}>
        <Footer />
      </div>
    </>
  );
};

export default OrderSuccess;
