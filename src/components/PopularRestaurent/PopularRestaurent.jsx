import React, { useState, useEffect } from "react";
import styles from "./popularRestaurent.module.css";
import { getImage } from "../../services";
import { useNavigate } from "react-router-dom";

const PopularRestaurent = () => {
  const [imageUrl, setImageUrl] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    try {
      const getImageUrl = async () => {
        const response = await getImage();
        setImageUrl(response.data);
      };
      getImageUrl();
    } catch (error) {
      console.error(error);
    }
  }, []);

  const handleProduct = () => {
    navigate("/product");
  };
  return (
    <>
      <div className={styles.popularRestaurantMain}>
        <div className={styles.popularRestaurantSection}>
          <h4>Popular Restaurants</h4>
        </div>

        <div className={styles.RestaurantImage}>
          <div className={styles.popularRestaurantDiv1} onClick={handleProduct}>
            <div className={styles.RestaurantImageMain}>
              {imageUrl.map((img, i) => (
                <img key={i} src={img.data.popularRestaurent1} alt="image" />
              ))}
            </div>
            <div className={styles.restaurantBoxes}>
              <h3>Burgers & Fast food</h3>
            </div>
          </div>

          <div className={styles.popularRestaurantDiv1} onClick={handleProduct}>
            <div className={styles.RestaurantImageMain}>
              {imageUrl.map((img, i) => (
                <img key={i} src={img.data.popularRestaurent2} alt="image" />
              ))}
            </div>
            <div className={styles.restaurantBoxes}>
              <h3>Papa Johns</h3>
            </div>
          </div>
          <div className={styles.popularRestaurantDiv1} onClick={handleProduct}>
            <div className={styles.RestaurantImageMain}>
              {imageUrl.map((img, i) => (
                <img key={i} src={img.data.popularRestaurent3} alt="image" />
              ))}
            </div>
            <div className={styles.restaurantBoxes}>
              <h3>KFC West London</h3>
            </div>
          </div>
          <div className={styles.popularRestaurantDiv1} onClick={handleProduct}>
            <div className={styles.RestaurantImageMain}>
              {imageUrl.map((img, i) => (
                <img key={i} src={img.data.popularRestaurent4} alt="image" />
              ))}
            </div>
            <div className={styles.restaurantBoxes}>
              <h3>Texas Chicken</h3>
            </div>
          </div>
          <div className={styles.popularRestaurantDiv1} onClick={handleProduct}>
            <div className={styles.RestaurantImageMain}>
              {imageUrl.map((img, i) => (
                <img key={i} src={img.data.popularRestaurent5} alt="image" />
              ))}
            </div>
            <div className={styles.restaurantBoxes}>
              <h3>Burger King</h3>
            </div>
          </div>
          <div className={styles.popularRestaurantDiv1} onClick={handleProduct}>
            <div className={styles.RestaurantImageMain}>
              {imageUrl.map((img, i) => (
                <img key={i} src={img.data.popularRestaurent6} alt="image" />
              ))}
            </div>
            <div className={styles.restaurantBoxes}>
              <h3>Shaurma 1</h3>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PopularRestaurent;
