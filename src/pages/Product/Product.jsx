import React, { useState, useEffect } from "react";
import styles from "./product.module.css";
import Nav from "../../components/Nav/Nav";
import NavBar from "../../components/Navbar/NavBar";
import orderCompleteImg from "../../assets/OrderCompleted.png";
import orderInImg from "../../assets/Motocross.png";
import searchImg from "../../assets/SearchMore.png";
import clock from "../../assets/Clock.png";
import delInfoImg from "../../assets/Tracking3.png";
import IdImg from "../../assets/idVerified.png";
import Clock2Img from "../../assets/Clock2.png";
import { getImage } from "../../services";
import Burgers from "../../components/BurgersCards/Burgers";
import Cart from "../../components/Cart/Cart";
import MapComponent from "../../components/Map/Map";
import Review from "../../components/Review/Review";
import SimilarRestaurent from "../../components/SimilarRestaurent/SimilarRestaurent";
import Footer from "../../components/Footer/Footer";
import { useAuth } from "../../components/Context/AuthContext";

const Product = () => {
  const [imageUrl, setImageUrl] = useState([]);
  const [cartUpdated, setCartUpdated] = useState(false);
  const { showCart } = useAuth();

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

  const handleCartUpdate = () => {
    setCartUpdated((prev) => !prev);
  };

  return (
    <>
      <div className={styles.container}>
        <Nav />
        <NavBar />
        <div className={styles.productHeader}>
          <div className={styles.headerItem1}>
            <h3>I'm lovin' it!</h3>
            <h4>McDonald’s East London</h4>
            <div className={styles.orderWrapper}>
              <div className={styles.minimumOrder}>
                <img src={orderCompleteImg} alt="image" />
                <p>Minimum Order: 12 GBP</p>
              </div>
              <div className={styles.orderIn}>
                <img src={orderInImg} alt="image" />
                <p>Delivery in 20-25 Minutes</p>
              </div>
            </div>
          </div>
          <div className={styles.headerItem2}>
            <div className={styles.mainImg}>
              {imageUrl.map((img, i) => (
                <img key={i} src={img.data.productImage1} alt="header-image" />
              ))}
            </div>
            <div className={styles.rating}>
              {imageUrl.map((img, i) => (
                <img key={i} src={img.data.productImage2} alt="header-image" />
              ))}
            </div>
          </div>
          <div className={styles.clock}>
            <img src={clock} alt="image" />
            <p>Open until 3:00 AM</p>
          </div>
        </div>
        <div className={styles.search}>
          <h2>All Offers from McDonald’s East London</h2>
          <div className={styles.searchInput}>
            <img src={searchImg} alt="image" />
            <input type="text" placeholder="Search from menu..." />
          </div>
        </div>
      </div>
      <div className={styles.productList}>
        <div className={styles.offer}>
          <h3>Offers</h3>
        </div>
        <p>Burgers</p>
        <p>Fries</p>
        <p>Snacks</p>
        <p>Salads</p>
        <p>Cold drinks</p>
        <p>Happy Meal®</p>
        <p>Desserts</p>
        <p>Hot drinks</p>
        <p>Sauces</p>
        <p>Orbit®</p>
      </div>

      <div className={styles.main}>
        <div>
          <div className={styles.section1Image}>
            <div className={styles.section1Image1}>
              {imageUrl.map((img, i) => (
                <img key={i} src={img.data.productImage3} alt="image" />
              ))}
            </div>
            <div className={styles.section1Image2}>
              {imageUrl.map((img, i) => (
                <img key={i} src={img.data.productImage4} alt="image" />
              ))}
            </div>
            <div className={styles.section1Image3}>
              {imageUrl.map((img, i) => (
                <img key={i} src={img.data.productImage5} alt="image" />
              ))}
            </div>
          </div>
          <Burgers cartUpdated={cartUpdated} onCartUpdate={handleCartUpdate} />
        </div>
        {showCart && (
          <Cart cartUpdated={cartUpdated} onCartUpdate={handleCartUpdate} />
        )}
      </div>
      <div className={styles.informationWrapper}>
        <div className={styles.information}>
          <div className={styles.deliveryOperation}>
            <div className={styles.delInfo}>
              <img src={delInfoImg} alt="img" />
              <p>Delivery information</p>
            </div>
            <div className={styles.deliveryTiming}>
              <p>
                <span>Monday:</span> 12:00 AM–3:00 AM, 8:00 AM–3:00 AM
              </p>
              <p>
                <span>Tuesday:</span> 8:00 AM–3:00 AM
              </p>
              <p>
                <span>Wednesday:</span> 8:00 AM–3:00 AM
              </p>
              <p>
                <span>Thursday:</span> 8:00 AM–3:00 AM
              </p>
              <p>
                <span>Friday:</span> 8:00 AM–3:00 AM
              </p>
              <p>
                <span>Saturday:</span> 8:00 AM–3:00 AM
              </p>
              <p>
                <span>Sunday:</span> 8:00 AM–12:00 AM
              </p>
              <p>
                <span>Estimated time until delivery:</span> 20 min
              </p>
            </div>
          </div>

          <div className={styles.contactInformation}>
            <div className={styles.contactImg}>
              <img src={IdImg} alt="image" />
              <p>Contact information</p>
            </div>
            <div className={styles.contactMe}>
              <p>If you have allergies or other dietary</p>
              <p>restrictions, please contact the restaurant. The</p>
              <p>restaurant will provide food-specific</p>
              <p>information upon request.</p>
              <h3>Phone number</h3>
              <p>+934443-43</p>
              <h3>Website</h3>
              <p>http://mcdonalds.uk/</p>
            </div>
          </div>

          <div className={styles.operationTime}>
            <div className={styles.operationImg}>
              <img src={Clock2Img} alt="img" />
              <p>Delivery information</p>
            </div>
            <div className={styles.operationTiming}>
              <p>
                <span>Monday:</span> 8:00 AM–3:00 AM
              </p>
              <p>
                <span>Tuesday:</span> 8:00 AM–3:00 AM
              </p>
              <p>
                <span>Wednesday:</span> 8:00 AM–3:00 AM
              </p>
              <p>
                <span>Thursday:</span> 8:00 AM–3:00 AM
              </p>
              <p>
                <span>Friday:</span> 8:00 AM–3:00 AM
              </p>
              <p>
                <span>Saturday:</span> 8:00 AM–3:00 AM
              </p>
              <p>
                <span>Sunday:</span> 8:00 AM–3:00 AM
              </p>
            </div>
          </div>
        </div>
        <div className={styles.mapComponent}>
          <MapComponent />
        </div>
      </div>

      <div className={styles.reviewWrapper}>
        <Review />
      </div>

      <div className={styles.similarRestaurentWrapper}>
        <SimilarRestaurent />
      </div>
      <Footer />
    </>
  );
};

export default Product;
