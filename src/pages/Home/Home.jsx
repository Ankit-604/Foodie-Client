import React, { useState, useEffect } from "react";
import styles from "./Home.module.css";
import Nav from "../../components/Nav/Nav";
import NavBar from "../../components/Navbar/NavBar";
import { getImage } from "../../services/index";
import orderLogo from "../../assets/LOGO.png";
import AppLogo from "../../assets/appStore.png";
import playStoreLogo from "../../assets/playStore.png";
import firstImg from "../../assets/first.png";
import TickBox from "../../assets/TickBox.png";
import Tracking from "../../assets/Tracking.png";
import orderFood1 from "../../assets/order-food1.png";
import orderFood2 from "../../assets/order-food2.png";
import orderFood3 from "../../assets/order-food3.png";
import PopularRestaurent from "../../components/PopularRestaurent/PopularRestaurent";
import Footer from "../../components/Footer/Footer";

const Home = () => {
  const [imageUrl, setImageUrl] = useState([]);

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
  return (
    <>
      <div className={styles.container}>
        <Nav />
        <NavBar />
        <div className={styles.headerImages}>
          <div className={styles.text}>
            <p>Order Restaurant food, takeaway and groceries.</p>
            <h1>Feast Your Senses,</h1>
            <h3>Fast and Fresh</h3>
            <h4>Enter a postcode to see what we deliver</h4>
            <div className={styles.headerInput}>
              <input type="text" readOnly placeholder="e.g. EC4R 3TE" />
              <button>Search</button>
            </div>
          </div>
          <div className={styles.headerImage1}>
            {imageUrl.map((img, i) => (
              <img key={i} src={img.data.homeHederImg5} alt="header-image5" />
            ))}
          </div>
          <div className={styles.headerImage2}>
            {imageUrl.map((img, i) => (
              <img key={i} src={img.data.homeHederImg4} alt="header-image4" />
            ))}
          </div>
          <div className={styles.headerImage3}>
            {imageUrl.map((img, i) => (
              <img key={i} src={img.data.homeHederImg2} alt="header-image2" />
            ))}
          </div>
          <div className={styles.headerImage4}>
            {imageUrl.map((img, i) => (
              <img key={i} src={img.data.homeHederImg3} alt="header-image3" />
            ))}
          </div>
          <div className={styles.headerImage5}>
            <div className={styles.firstImage}>
              <img src={firstImg} alt="header-image" />
              <h4>We’ve Received your order!</h4>
              <div className={styles.tracking}>
                <img src={Tracking} alt="" />
              </div>
              <h5>Awaiting Restaurant acceptance </h5>
            </div>
          </div>
          <div className={styles.headerImage6}>
            <div className={styles.firstImage1}>
              {imageUrl.map((img, i) => (
                <img key={i} src={img.data.homeHederImg1} alt="header-image1" />
              ))}
              <h4>Order Accepted!✅</h4>
              <div className={styles.tick}></div>
              <h5>Your order will be delivered shortly</h5>
            </div>
          </div>
        </div>

        <div className={styles.section1}>
          <div className={styles.section1Header}>
            <h4>Up to -40% 🎊 Order.uk exclusive deals</h4>

            <div className={styles.itemList}>
              <p>Vegan</p>
              <p>Sushi</p>
              <div className={styles.pizza}>
                <h5>Pizza & Fastfood</h5>
              </div>
              <p>others</p>
            </div>
          </div>

          <div className={styles.section1Image}>
            <div className={styles.section1Image1}>
              {imageUrl.map((img, i) => (
                <img key={i} src={img.data.homeSection1Img1} alt="image" />
              ))}
            </div>
            <div className={styles.section1Image1}>
              {imageUrl.map((img, i) => (
                <img key={i} src={img.data.homeSection1Img2} alt="image" />
              ))}
            </div>
            <div className={styles.section1Image1}>
              {imageUrl.map((img, i) => (
                <img key={i} src={img.data.homeSection1Img3} alt="image" />
              ))}
            </div>
          </div>
        </div>

        <div className={styles.section2}>
          <div className={styles.section2Header}>
            <h4>Order.uk Popular Categories 🤩</h4>
          </div>

          <div className={styles.section2Image}>
            <div className={styles.section2Div1}>
              <div className={styles.section2Image1}>
                {imageUrl.map((img, i) => (
                  <img key={i} src={img.data.homeSection2Img1} alt="image" />
                ))}
              </div>
              <div className={styles.cards}>
                <h3>Burgers & Fast food</h3>
                <h4>21 Restaurants</h4>
              </div>
            </div>

            <div className={styles.section2Div1}>
              <div className={styles.section2Image1}>
                {imageUrl.map((img, i) => (
                  <img key={i} src={img.data.homeSection2Img2} alt="image" />
                ))}
              </div>
              <div className={styles.cards}>
                <h3>Salads</h3>
                <h4>32 Restaurants</h4>
              </div>
            </div>

            <div className={styles.section2Div1}>
              <div className={styles.section2Image1}>
                {imageUrl.map((img, i) => (
                  <img key={i} src={img.data.homeSection2Img3} alt="image" />
                ))}
              </div>
              <div className={styles.cards}>
                <h3>Pasta & Casuals</h3>
                <h4>4 Restaurants</h4>
              </div>
            </div>

            <div className={styles.section2Div1}>
              <div className={styles.section2Image1}>
                {imageUrl.map((img, i) => (
                  <img key={i} src={img.data.homeSection2Img4} alt="image" />
                ))}
              </div>
              <div className={styles.cards}>
                <h3>Pizza</h3>
                <h4>32 Restaurants</h4>
              </div>
            </div>

            <div className={styles.section2Div1}>
              <div className={styles.section2Image1}>
                {imageUrl.map((img, i) => (
                  <img key={i} src={img.data.homeSection2Img5} alt="image" />
                ))}
              </div>
              <div className={styles.cards}>
                <h3>Breakfast</h3>
                <h4>4 Restaurants</h4>
              </div>
            </div>

            <div className={styles.section2Div1}>
              <div className={styles.section2Image1}>
                {imageUrl.map((img, i) => (
                  <img key={i} src={img.data.homeSection2Img6} alt="image" />
                ))}
              </div>
              <div className={styles.cards}>
                <h3>Soups</h3>
                <h4>4 Restaurants</h4>
              </div>
            </div>
          </div>
        </div>
        <PopularRestaurent />

        <div className={styles.Personalised}>
          <div className={styles.itemWrapper}>
            <div className={styles.orderingImg}>
              <img src={orderLogo} alt="image" />
              <p>ing</p>
              <h4>is more </h4>
            </div>
            <div className={styles.instant}>
              <h3>
                <span>Personalised</span> & Instant
              </h3>
            </div>
            <h4>Download the Order.uk app for faster ordering</h4>
            <div className={styles.storeLogo}>
              <div className={styles.appStore}>
                <img src={AppLogo} alt="image" />
              </div>
              <div className={styles.playStore}>
                <img src={playStoreLogo} alt="image" />
              </div>
            </div>
          </div>
          <div className={styles.PersonalisedImg}>
            {imageUrl.map((img, i) => (
              <img key={i} src={img.data.homefooterImg1} alt="image" />
            ))}
          </div>
        </div>
        <div className={styles.getStarted}>
          <div className={styles.partner}>
            {imageUrl.map((img, i) => (
              <img key={i} src={img.data.homefooterImg2} alt="image" />
            ))}
            <div className={styles.earn}>
              <h3>Earn more with lower fees</h3>
            </div>
            <div className={styles.business}>
              <h3>Signup as a business</h3>
              <h4>Partner with us</h4>
              <button>Get Started</button>
            </div>
          </div>
          <div className={styles.rideWithUs}>
            {imageUrl.map((img, i) => (
              <img key={i} src={img.data.homefooterImg3} alt="image" />
            ))}
          </div>
        </div>

        <div className={styles.aboutUs}>
          <div className={styles.navItems}>
            <h2>Know more about us!</h2>
            <div className={styles.navList}>
              <div className={styles.question}>
                <h3>Frequent Questions</h3>
              </div>
              <p>Who we are?</p>
              <p>Partner Program</p>
              <p>Help & Support</p>
            </div>
          </div>
          <div className={styles.info}>
            <div className={styles.infoList}>
              <div className={styles.work}>
                <p>How does Order.UK work?</p>
              </div>
              <p>What payment methods are accepted?</p>
              <p>Can I track my order in real-time?</p>
              <div className={styles.promotion}>
                <p>Are there any special discounts or </p>
                <p>promotions available?</p>
              </div>
              <p>Is Order.UK available in my area?</p>
            </div>

            <div className={styles.aboutOrder}>
              <div className={styles.aboutCards}>
                <div className={styles.aboutOrderLogo}>
                  <h3>Place an Order!</h3>
                  <div className={styles.orderImage}>
                    <img src={orderFood1} alt="image" />
                  </div>
                  <h4>Place order through our website or Mobile app</h4>
                </div>
                <div className={styles.aboutOrderLogo}>
                  <h3>Track Progress</h3>
                  <div className={styles.orderImage}>
                    <img src={orderFood2} alt="image" />
                  </div>
                  <h4>Your can track your order status with delivery time</h4>
                </div>
                <div className={styles.aboutOrderLogo}>
                  <h3>Get your Order!</h3>
                  <div className={styles.orderImage}>
                    <img src={orderFood3} alt="image" />
                  </div>
                  <h4>Receive your order at a lighting fast speed!</h4>
                </div>
              </div>
              <h4>
                Order.UK simplifies the food ordering process. Browse through
                our diverse menu, select your favorite dishes, and proceed to
                checkout. Your delicious meal will be on its way to your
                doorstep in no time!
              </h4>
            </div>
          </div>
        </div>

        <div className={styles.history}>
          <div className={styles.historyText}>
            <p>546+</p>
            <h3>Registered Riders</h3>
          </div>
          <div className={styles.line}></div>
          <div className={styles.historyText}>
            <p>789,900+</p>
            <h3>Orders Delivered</h3>
          </div>
          <div className={styles.line}></div>
          <div className={styles.historyText}>
            <p>690+</p>
            <h3>Restaurants Partnered</h3>
          </div>
          <div className={styles.line}></div>
          <div className={styles.historyText}>
            <p>17,457+</p>
            <h3>Food items</h3>
          </div>
        </div>
      </div>
      <div className={styles.footer}>
        <Footer />
      </div>
    </>
  );
};

export default Home;
