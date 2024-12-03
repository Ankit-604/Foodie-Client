import React, { useState, useEffect } from "react";
import styles from "./similarRestaurent.module.css";
import { getImage } from "../../services";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const SimilarRestaurent = () => {
  const [imageUrl, setImageUrl] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const getImageUrl = async () => {
      try {
        const response = await getImage();
        setImageUrl(response.data);
      } catch (error) {
        toast.error(error);
      }
    };
    getImageUrl();
  }, []);

  const handleScrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const handleProduct = () => {
    navigate("/product");
    handleScrollToTop();
  };

  return (
    <>
      <div className={styles.similarRestaurant}>
        <div className={styles.similarRestaurantHeader}>
          <h4>Similar Restaurants</h4>
        </div>

        <div className={styles.similarRestaurantImage}>
          <div className={styles.similarRestaurantDiv1} onClick={handleProduct}>
            <div className={styles.similarRestaurantImage1}>
              {imageUrl.map((img, i) => (
                <img key={i} src={img.data.popularRestaurent1} alt="image" />
              ))}
            </div>
            <div className={styles.similarRestaurantCards}>
              <h3>Burgers & Fast food</h3>
            </div>
          </div>

          <div className={styles.similarRestaurantDiv1} onClick={handleProduct}>
            <div className={styles.similarRestaurantImage1}>
              {imageUrl.map((img, i) => (
                <img key={i} src={img.data.popularRestaurent2} alt="image" />
              ))}
            </div>
            <div className={styles.similarRestaurantCards}>
              <h3>Papa Johns</h3>
            </div>
          </div>
          <div className={styles.similarRestaurantDiv1} onClick={handleProduct}>
            <div className={styles.similarRestaurantImage1}>
              {imageUrl.map((img, i) => (
                <img key={i} src={img.data.popularRestaurent3} alt="image" />
              ))}
            </div>
            <div className={styles.similarRestaurantCards}>
              <h3>KFC West London</h3>
            </div>
          </div>
          <div className={styles.similarRestaurantDiv1} onClick={handleProduct}>
            <div className={styles.similarRestaurantImage1}>
              {imageUrl.map((img, i) => (
                <img key={i} src={img.data.popularRestaurent4} alt="image" />
              ))}
            </div>
            <div className={styles.similarRestaurantCards}>
              <h3>Texas Chicken</h3>
            </div>
          </div>
          <div className={styles.similarRestaurantDiv1} onClick={handleProduct}>
            <div className={styles.similarRestaurantImage1}>
              {imageUrl.map((img, i) => (
                <img key={i} src={img.data.popularRestaurent5} alt="image" />
              ))}
            </div>
            <div className={styles.similarRestaurantCards}>
              <h3>Burger King</h3>
            </div>
          </div>
          <div className={styles.similarRestaurantDiv1} onClick={handleProduct}>
            <div className={styles.similarRestaurantImage1}>
              {imageUrl.map((img, i) => (
                <img key={i} src={img.data.popularRestaurent6} alt="image" />
              ))}
            </div>
            <div className={styles.similarRestaurantCards}>
              <h3>Shaurma 1</h3>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SimilarRestaurent;
