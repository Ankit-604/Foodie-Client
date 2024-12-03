import React from "react";
import styles from "./allnavbar.module.css";
import navbarImage from "../../assets/LOGO.png";
import userImage from "../../assets/User.png";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../Context/AuthContext";
import basketImg from "../../assets/Basket.png";
import avatarImg from "../../assets/avatar.png";

const NavBar = () => {
  const navigate = useNavigate();
  const { isLoggedIn, userName } = useAuth();
  const id = localStorage.getItem("userId");

  const handleSignUp = () => {
    navigate("/signup");
  };
  const handleSignIp = () => {
    navigate("/");
  };
  const handleProfile = () => {
    navigate(`/profile`);
  };
  const handleScrollToTop = () => {
    window.scrollTo({
      top: 950,
      behavior: "smooth",
    });
  };
  const handleOpenCart = () => {
    handleCart();
    navigate("/product");
    handleScrollToTop();
  };
  const displayName = userName ? `${userName.slice(0, 8)}...` : null;
  return (
    <>
      <div className={styles.navbarMain}>
        <div className={styles.navbarMainLogo}>
          <img src={navbarImage} alt="navbarMain-image" />
        </div>
        <div className={styles.navbarPage}>
          <div className={styles.navbarHomePage}>
            <h1>Home</h1>
          </div>
          <p>Browse Menu</p>
          <p>Special Offers</p>
          <p>Restaurants</p>
          <p>Track Order</p>
          <div className={styles.navbarLoginRegister}>
            <div className={styles.navbarUserImg}>
              <img src={userImage} alt="user-image" />
            </div>
            {isLoggedIn ? (
              <h1 onClick={handleProfile}>Hey {displayName}</h1>
            ) : (
              <h1>
                <span onClick={handleSignIp}>Login</span>/
                <span onClick={handleSignUp}>Signup</span>
              </h1>
            )}
          </div>
        </div>
        <div className={styles.navbarCartProfile}>
          <div className={styles.navbarProfileImage}>
            <div className={styles.navbarAvatar}>
              <img src={avatarImg} alt="avatar-image" />
            </div>
            {isLoggedIn ? (
              <h1 onClick={handleProfile}>Hey {displayName}</h1>
            ) : (
              <h1>
                <span onClick={handleSignIp}>Login</span>/
                <span onClick={handleSignUp}>Signup</span>
              </h1>
            )}
          </div>
          <div className={styles.navbarCart} onClick={handleOpenCart}>
            <img src={basketImg} alt="basket-image" />
            <p>My Cart</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default NavBar;
