import React from "react";
import orderImage from "../../assets/star.png";
import locationImage from "../../assets/Location.png";
import cartImage from "../../assets/cartImage.png";
import styles from "./nav.module.css";
import { useAuth } from "../Context/AuthContext";
import { useNavigate } from "react-router-dom";

const Nav = () => {
  const { handleCart } = useAuth();
  const navigate = useNavigate();
  const localAddress = JSON.parse(localStorage.getItem("Address"));

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

  return (
    <>
      <nav>
        <div className={styles.order}>
          <div className={styles.orderImg}>
            <img src={orderImage} alt="orderImage" />
          </div>
          <h1>
            Get 5% Off your first order, <span>Promo: ORDER5</span>
          </h1>
        </div>

        <div className={styles.locationCart}>
          <div className={styles.location}>
            <div className={styles.locationImg}>
              <img src={locationImage} alt="locationImage" />
            </div>
            {localAddress && (
              <h1>
                {localAddress.fullAddress},{localAddress.city},
                {localAddress.pinCode},{localAddress.state}
              </h1>
            )}
            <h3>Change Location</h3>
          </div>

          <div className={styles.cart}>
            <img src={cartImage} onClick={handleOpenCart} alt="locationImage" />
          </div>
        </div>
      </nav>
    </>
  );
};

export default Nav;
