import React from "react";
import styles from "./footer.module.css";
import footerLogo from "../../assets/LOGO2.png";
import appStoreImg from "../../assets/appStore.png";
import playStoreImg from "../../assets/playStore.png";
import facebook from "../../assets/Facebook.png";
import instagram from "../../assets/Instagram.png";
import Tiktok from "../../assets/TikTok.png";
import snapchat from "../../assets/Snapchat.png";

const Footer = () => {
  return (
    <>
      <div className={styles.footerMain}>
        <div className={styles.footerPart1}>
          <div className={styles.footerListItems1}>
            <div className={styles.footerLogo}>
              <img src={footerLogo} alt="footerLogo-image" />
            </div>
            <div className={styles.storeFooter}>
              <div className={styles.footerStoreOne}>
                <img src={appStoreImg} alt="appStore-image" />
              </div>
              <div className={styles.footerStoreTwo}>
                <img src={playStoreImg} alt="playStore-image" />
              </div>
            </div>
            <div className={styles.footerCompany}>
              <p>Company # 490039-445, Registered with</p>
              <p>House of companies.</p>
            </div>
          </div>

          <div className={styles.footerListItemsTwo}>
            <div className={styles.footerItemsOne}>
              <p className={styles.footerItemOneHeading}>
                Get Exclusive Deals in your Inbox
              </p>
              <div className={styles.footerItemOneInput}>
                <input type="text" readOnly placeholder="youremail@gmail.com" />
                <button>Subscribe</button>
              </div>
              <div className={styles.footerPolicy}>
                <h3>
                  we wont spam, read our <span>email policy</span>
                </h3>
              </div>
              <div className={styles.footerItemOneLogo}>
                <img src={facebook} alt="facebook_image" />

                <img src={instagram} alt="instagram_image" />

                <img src={Tiktok} alt="tiktok_image" />

                <img src={snapchat} alt="snapchat_image" />
              </div>
            </div>
            <div className={styles.footerItemTwo}>
              <p>Legal Pages</p>
              <ul>
                <li>Terms and conditions</li>
                <li>Privacy</li>
                <li>Cookies</li>
                <li>Modern Slavery Statement</li>
              </ul>
            </div>
            <div className={styles.footerItemThree}>
              <p>Important Links</p>
              <ul>
                <li>Get help</li>
                <li>Add your restaurant</li>
                <li>Sign up to deliver</li>
                <li>Create a business account</li>
              </ul>
            </div>
          </div>
        </div>
        <div className={styles.listTwoFooter}>
          <div className={styles.footerCopyright}>
            <p>Order.uk Copyright 2024, All Rights Reserved.</p>
          </div>
          <div className={styles.footerTerms}>
            <p>Privacy Policy</p>
            <p>Terms</p>
            <p>Pricing</p>
            <p>Do not sell or share my personal information</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Footer;
