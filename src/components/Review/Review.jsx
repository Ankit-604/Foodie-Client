import React, { useEffect, useState } from "react";
import styles from "./review.module.css";
import backBtn from "../../assets/Back.png";
import nextBtn from "../../assets/next.png";
import profileImg from "../../assets/profile.png";
import TimeImg from "../../assets/TimeSpan.png";
import ratingImg from "../../assets/rating.png";
import toast from "react-hot-toast";
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
        toast.log(error.message);
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
      toast.error(error);
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
    <div className={styles.reviewMain}>
      <div className={styles.reviewMainHeader}>
        <h1>Customer Reviews</h1>
        <div className={styles.nextBackBtnReview}>
          <div className={styles.backBtn} onClick={handleBackBtn}>
            <img src={backBtn} alt="Back" />
          </div>
          <div className={styles.nextBtn} onClick={handleNextBtn}>
            <img src={nextBtn} alt="Next" />
          </div>
        </div>
      </div>

      <div className={styles.carouselReview}>
        <div
          className={styles.allReviewsMain}
          style={{ transform: `translateX(-${index * 476}px)` }}
        >
          {userReview.map((reviewMain) => (
            <div className={styles.profileReview} key={reviewMain._id}>
              <div className={styles.profileContainerReview}>
                <div className={styles.profileImageReview}>
                  <div className={styles.profileImg}>
                    <img src={profileImg} alt="Profile" />
                  </div>
                  <div className={styles.reviewLine}></div>
                  <div className={styles.locationReview}>
                    <h3>{reviewMain.name}</h3>
                    <h4>{reviewMain.location}</h4>
                  </div>
                </div>
                <div className={styles.ratingReview}>
                  <img src={ratingImg} alt="Rating" />
                  <div className={styles.date}>
                    <img src={TimeImg} alt="Date" />
                    <p>{reviewMain.date}</p>
                  </div>
                </div>
              </div>
              <div className={styles.description}>
                <p>{reviewMain.description}</p>
              </div>
            </div>
          ))}
        </div>
        <div className={styles.nextBackBtn1}>
          <div className={styles.backBtn} onClick={handleBackBtn}>
            <img src={backBtn} alt="Back" />
          </div>
          <div className={styles.nextBtn} onClick={handleNextBtn}>
            <img src={nextBtn} alt="Next" />
          </div>
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
