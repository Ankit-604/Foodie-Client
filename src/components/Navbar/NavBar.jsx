import React from "react";
import styles from "./navbar.module.css";
import navbarImage from "../../assets/LOGO.png";
import userImage from "../../assets/User.png";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../Context/AuthContext";
import basketImg from "../../assets/Basket.png";
import avatarImg from "../../assets/avatar.png";
import locationImage from "../../assets/Location.png";

const NavBar = ({ setIsCartOpen }) => {
  const navigate = useNavigate();
  const { isLoggedIn, userName, handleCart } = useAuth();
  const id = localStorage.getItem("userId");
  const localAddress = JSON.parse(localStorage.getItem("Address"));

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
    setIsCartOpen(true);
    handleScrollToTop();
  };
  const displayName = userName ? `${userName.slice(0, 8)}...` : null;
  return (
    <>
      <div className={styles.navbarMain}>
        <div className={styles.navbarMainLogo}>
          <img src={navbarImage} alt="navbarMain-image" />
        </div>
        <div className={styles.pageNavBar}>
          <div className={styles.homePageNavBar}>
            <h1>Home</h1>
          </div>
          <p>Browse Menu</p>
          <p>Special Offers</p>
          <p>Restaurants</p>
          <p>Track Order</p>
          <div className={styles.NavBarLoginRegister}>
            <div className={styles.userImg}>
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

        <div className={styles.NavBarCartProfile}>
          <div className={styles.NavBarProfileImage}>
            <div className={styles.avatarNavBar}>
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
          <div className={styles.cartNavbar} onClick={handleOpenCart}>
            <img src={basketImg} alt="basket-image" />
            <p>My Cart</p>
          </div>
        </div>
      </div>
      <div className={styles.addressNavBar}>
        {localAddress && (
          <>
            <img src={locationImage} alt="locationImage" />

            <h1>
              {localAddress.fullAddress},{localAddress.city},
              {localAddress.pinCode},{localAddress.state}
            </h1>
          </>
        )}
        <h3 onClick={() => navigate("/address")}>Change Location</h3>
      </div>
    </>
  );
};

export default NavBar;
