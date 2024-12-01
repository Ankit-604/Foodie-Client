import React, { useEffect, useState } from "react";
import styles from "./review.module.css";
import backBtn from "../../assets/Back.png";
import nextBtn from "../../assets/next.png";
import profileImg from "../../assets/profile.png";
import TimeImg from "../../assets/TimeSpan.png";
import ratingImg from "../../assets/rating.png";
import { getImage, getUserReview } from "../../services";

const Review = () => {
  const [userReview, setUserReview] = useState([]);
  const [imageUrl, setImageUrl] = useState([]);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const getReviews = async () => {
      try {
        const response = await getUserReview();
        setUserReview(response.data);
      } catch (error) {
        console.log(error.message);
      }
    };
    getReviews();
  }, []);
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

  const handleNextBtn = () => {
    if (index < userReview.length - 1) {
      setIndex((prev) => prev + 1);
    }
  };

  const handleBackBtn = () => {
    if (index > 0) {
      setIndex((prev) => prev - 1);
    }
  };

  return (
    <div className={styles.review}>
      <div className={styles.reviewHeader}>
        <h1>Customer Reviews</h1>
        <div className={styles.nextBackBtn}>
          <div className={styles.backBtn} onClick={handleBackBtn}>
            <img src={backBtn} alt="Back" />
          </div>
          <div className={styles.nextBtn} onClick={handleNextBtn}>
            <img src={nextBtn} alt="Next" />
          </div>
        </div>
      </div>

      <div className={styles.carousel}>
        <div
          className={styles.allReviews}
          style={{ transform: `translateX(-${index * 476}px)` }}
        >
          {userReview.map((review) => (
            <div className={styles.profile} key={review._id}>
              <div className={styles.profileContainer}>
                <div className={styles.profileImgWrapper}>
                  <div className={styles.profileImg}>
                    <img src={profileImg} alt="Profile" />
                  </div>
                  <div className={styles.line}></div>
                  <div className={styles.location}>
                    <h3>{review.name}</h3>
                    <h4>{review.location}</h4>
                  </div>
                </div>
                <div className={styles.rating}>
                  <img src={ratingImg} alt="Rating" />
                  <div className={styles.date}>
                    <img src={TimeImg} alt="Date" />
                    <p>{review.date}</p>
                  </div>
                </div>
              </div>
              <div className={styles.description}>
                <p>{review.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className={styles.ratingImg}>
        {imageUrl.map((img, i) => (
          <img key={i} src={img.data.productImage2} alt="header-image" />
        ))}
      </div>
    </div>
  );
};

export default Review;