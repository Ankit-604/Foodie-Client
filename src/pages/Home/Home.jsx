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
import nextPageBtn from "../../assets/NextpageBtn.png";
import toast from "react-hot-toast";

const Home = () => {
  const [imageUrl, setImageUrl] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

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
            <div className={styles.headerInputHome}>
              <input type="text" readOnly placeholder="e.g. EC4R 3TE" />
              <button>
                Search{" "}
                <img className={styles.nextPageHome} src={nextPageBtn} alt="" />
              </button>
            </div>
          </div>
          <div className={styles.headerImageOneHome}>
            {imageUrl.map((img, i) => (
              <img key={i} src={img.data.homeHederImg5} alt="header-image" />
            ))}
          </div>
          <div className={styles.headerImageTwoHome}>
            {imageUrl.map((img, i) => (
              <img key={i} src={img.data.homeHederImg4} alt="header-image" />
            ))}
          </div>
          <div className={styles.headerImageThreeHome}>
            {imageUrl.map((img, i) => (
              <img key={i} src={img.data.homeHederImg2} alt="header-image" />
            ))}
          </div>
          <div className={styles.headerImageFourHome}>
            {imageUrl.map((img, i) => (
              <img key={i} src={img.data.homeHederImg3} alt="header-image" />
            ))}
          </div>
          <div className={styles.headerImageFiveHome}>
            <div className={styles.firstImageHome}>
              <img src={firstImg} alt="header-image" />
              <h4>We’ve Received your order!</h4>
              <div className={styles.trackingImgHome}>
                <img src={Tracking} alt="" />
              </div>
              <h5>Awaiting Restaurant acceptance </h5>
            </div>
          </div>
          <div className={styles.headerImageSixHome}>
            <div className={styles.firstImgOneHome}>
              {imageUrl.map((img, i) => (
                <img key={i} src={img.data.homeHederImg1} alt="header-image" />
              ))}
              <h4>Order Accepted!</h4>
              <div className={styles.tickHome}>
                <img src={TickBox} alt="" />
              </div>
              <h5>Your order will be delivered shortly</h5>
            </div>
          </div>
        </div>

        <div className={styles.firstSectionHome}>
          <div className={styles.sectionFirstHeaderHome}>
            <h4>Up to -40% 🎊 Order.uk exclusive deals</h4>
            <h6>Up to -40% Discount Offers 🎊 </h6>

            <div className={styles.itemListHome}>
              <p>Vegan</p>
              <p>Sushi</p>
              <div className={styles.pizzaHome}>
                <img
                  className={styles.nextPagePart1Home}
                  src={nextPageBtn}
                  alt="btn-image"
                />
                <h5>Pizza & Fastfood</h5>
              </div>
              <p>others</p>
            </div>
          </div>

          <div className={styles.sectionOneImageHome}>
            <div className={styles.sectionOneImageOneHome}>
              {imageUrl.map((img, i) => (
                <img key={i} src={img.data.homeSection1Img1} alt="image" />
              ))}
            </div>
            <div className={styles.sectionOneImageOneHome}>
              {imageUrl.map((img, i) => (
                <img key={i} src={img.data.homeSection1Img2} alt="image" />
              ))}
            </div>
            <div className={styles.sectionOneImageOneHome}>
              {imageUrl.map((img, i) => (
                <img key={i} src={img.data.homeSection1Img3} alt="image" />
              ))}
            </div>
          </div>
        </div>

        <div className={styles.secondSectionHome}>
          <div className={styles.secondSectionHeaderHome}>
            <h4>Order.uk Popular Categories 🤩</h4>
          </div>

          <div className={styles.secondSectionImageHome}>
            <div className={styles.section2Image}>
              <div className={styles.secondSectionImageOneHome}>
                {imageUrl.map((img, i) => (
                  <img key={i} src={img.data.homeSection2Img1} alt="image" />
                ))}
              </div>
              <div className={styles.cardsHome}>
                <h3>Burgers & Fast food</h3>
                <h4>21 Restaurants</h4>
              </div>
            </div>

            <div className={styles.sectionTwoDivOneHome}>
              <div className={styles.secondSectionImageOneHome}>
                {imageUrl.map((img, i) => (
                  <img key={i} src={img.data.homeSection2Img2} alt="image" />
                ))}
              </div>
              <div className={styles.cardsHome}>
                <h3>Salads</h3>
                <h4>32 Restaurants</h4>
              </div>
            </div>

            <div className={styles.sectionTwoDivOneHome}>
              <div className={styles.secondSectionImageOneHome}>
                {imageUrl.map((img, i) => (
                  <img key={i} src={img.data.homeSection2Img3} alt="image" />
                ))}
              </div>
              <div className={styles.cardsHome}>
                <h3>Pasta & Casuals</h3>
                <h4>4 Restaurants</h4>
              </div>
            </div>

            <div className={styles.sectionTwoDivOneHome}>
              <div className={styles.secondSectionImageOneHome}>
                {imageUrl.map((img, i) => (
                  <img key={i} src={img.data.homeSection2Img4} alt="image" />
                ))}
              </div>
              <div className={styles.cardsHome}>
                <h3>Pizza</h3>
                <h4>32 Restaurants</h4>
              </div>
            </div>

            <div className={styles.sectionTwoDivOneHome}>
              <div className={styles.secondSectionImageOneHome}>
                {imageUrl.map((img, i) => (
                  <img key={i} src={img.data.homeSection2Img5} alt="image" />
                ))}
              </div>
              <div className={styles.cardsHome}>
                <h3>Breakfast</h3>
                <h4>4 Restaurants</h4>
              </div>
            </div>

            <div className={styles.sectionTwoDivOneHome}>
              <div className={styles.secondSectionImageOneHome}>
                {imageUrl.map((img, i) => (
                  <img key={i} src={img.data.homeSection2Img6} alt="image" />
                ))}
              </div>
              <div className={styles.cardsHome}>
                <h3>Soups</h3>
                <h4>4 Restaurants</h4>
              </div>
            </div>
          </div>
        </div>
        <PopularRestaurent />

        <div className={styles.PersonalizedHome}>
          <div className={styles.itemSectionsHome}>
            <div className={styles.orderingImageHome}>
              <img src={orderLogo} alt="image" />
              <p>ing</p>
              <h4>is more </h4>
            </div>
            <div className={styles.instantPartHome}>
              <h3>
                <span>Personalised</span> & Instant
              </h3>
            </div>
            <h4>Download the Order.uk app for faster ordering</h4>
            <div className={styles.storeLogoHome}>
              <div className={styles.appStoreLogoHome}>
                <img src={AppLogo} alt="image" />
              </div>
              <div className={styles.playStoreLogoHome}>
                <img src={playStoreLogo} alt="image" />
              </div>
            </div>
          </div>
          <div className={styles.PersonalizedImageHome}>
            {imageUrl.map((img, i) => (
              <img key={i} src={img.data.homefooterImg1} alt="image" />
            ))}
          </div>
        </div>
        <div className={styles.getStartedPartHome}>
          <div className={styles.partnerPartHome}>
            {imageUrl.map((img, i) => (
              <img key={i} src={img.data.homefooterImg2} alt="image" />
            ))}
            <div className={styles.earnPartHome}>
              <h3>Earn more with lower fees</h3>
            </div>
            <div className={styles.businessPartHome}>
              <h3>Signup as a business</h3>
              <h4>Partner with us</h4>
              <button>Get Started</button>
            </div>
          </div>
          <div className={styles.rideWithUsPartHome}>
            {imageUrl.map((img, i) => (
              <img key={i} src={img.data.homefooterImg3} alt="image" />
            ))}
          </div>
        </div>

        <div className={styles.aboutUsPartHome}>
          <div className={styles.navItemsHome}>
            <h2>Know more about us!</h2>
            <div className={styles.navListHome}>
              <div className={styles.questionsPartHome}>
                <h3>Frequent Questions</h3>
              </div>
              <p>Who we are?</p>
              <p>Partner Program</p>
              <p>Help & Support</p>
            </div>
          </div>
          <div className={styles.informationsPartHome}>
            <div className={styles.infoListPartHome}>
              <div className={styles.workPartHome}>
                <p>How does Order.UK workPartHome?</p>
              </div>
              <p>What payment methods are accepted?</p>
              <p>Can I track my order in real-time?</p>
              <div className={styles.promotionPartHome}>
                <p>Are there any special discounts or </p>
                <p>promotions available?</p>
              </div>
              <p>Is Order.UK available in my area?</p>
            </div>

            <div className={styles.aboutOrderPartHome}>
              <div className={styles.aboutCardsPartHome}>
                <div className={styles.aboutOrderLogoHome}>
                  <h3>Place an Order!</h3>
                  <div className={styles.orderImageHome}>
                    <img src={orderFood1} alt="image" />
                  </div>
                  <h4>Place order through our website or Mobile app</h4>
                </div>
                <div className={styles.aboutOrderLogoHome}>
                  <h3>Track Progress</h3>
                  <div className={styles.orderImageHome}>
                    <img src={orderFood2} alt="image" />
                  </div>
                  <h4>Your can track your order status with delivery time</h4>
                </div>
                <div className={styles.aboutOrderLogoHome}>
                  <h3>Get your Order!</h3>
                  <div className={styles.orderImageHome}>
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

        <div className={styles.historyPartHome}>
          <div className={styles.historyTextPartHome}>
            <p>546+</p>
            <h3>Registered Riders</h3>
          </div>
          <div className={styles.line}></div>
          <div className={styles.historyTextPartHome}>
            <p>789,900+</p>
            <h3>Orders Delivered</h3>
          </div>
          <div className={styles.line}></div>
          <div className={styles.historyTextPartHome}>
            <p>690+</p>
            <h3>Restaurants Partnered</h3>
          </div>
          <div className={styles.line}></div>
          <div className={styles.historyTextPartHome}>
            <p>17,457+</p>
            <h3>Food items</h3>
          </div>
        </div>
      </div>
      <div className={styles.footerHome}>
        <Footer />
      </div>
    </>
  );
};

export default Home;
