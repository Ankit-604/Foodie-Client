import React from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import styles from "./orderSuccess.module.css";
import Nav from "../../components/Nav/Nav";
import AllNavBar from "../../components/AllNavbar/AllNavbar";
import successImg from "../../assets/success.png";
import Footer from "../../components/Footer/Footer";

const OrderSuccess = () => {
  const navigate = useNavigate(); // Initialize useNavigate
  const title = JSON.parse(localStorage.getItem("title"));

  const handleBackToHome = () => {
    navigate("/"); // Navigate to the home page
  };

  return (
    <>
      <div className={styles.container}>
        <Nav />
        <div className={styles.allNav}>
          <AllNavBar />
        </div>
        <div className={styles.successWrapper}>
          <div className={styles.success}>
            <div className={styles.successImage}>
              <img src={successImg} alt="success-image" />
            </div>
          </div>
          <h3>Order Placed Successfully</h3>
          <div className={styles.orderDescription}>
            <p>Your order is confirmed and on its way. Get set to </p>
            <h3>savor your chosen delights!</h3>
          </div>
          <div className={styles.orderDetails}>
            {title && title.map((item, i) => <p key={i}>{item}</p>)}
            <button onClick={handleBackToHome}>Back to Home</button>{" "}
            {/* Add onClick handler */}
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
