import React from 'react'
import styles from "./footer.module.css"
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
    <div className={styles.footer}>
    <div className={styles.footerList1}>
      <div className={styles.listItems1}>
        <div className={styles.footerLogo}>
          <img src={footerLogo} alt="footerLogo-image" />
        </div>
        <div className={styles.store}>
          <div className={styles.store1}>
            <img src={appStoreImg} alt="appStore-image" />
          </div>
          <div className={styles.store2}>
            <img src={playStoreImg} alt="playStore-image" />
          </div>
        </div>
        <div className={styles.company}>
          <p>Company # 490039-445, Registered with</p>
          <p>House of companies.</p>
        </div>
      </div>

      <div className={styles.listItems2}>
        <div className={styles.item1}>
          <p className={styles.item1Heading}>
            Get Exclusive Deals in your Inbox
          </p>
          <div className={styles.item1Input}>
            <input type="text" readOnly placeholder="youremail@gmail.com" />
            <button>Subscribe</button>
          </div>
          <div className={styles.policy}>
            <h3>
              we wont spam, read our <span>email policy</span>
            </h3>
          </div>
          <div className={styles.item1Logo}>
            <img src={facebook} alt="facebook_image" />

            <img src={instagram} alt="instagram_image" />

            <img src={Tiktok} alt="tiktok_image" />

            <img src={snapchat} alt="snapchat_image" />
          </div>
        </div>
        <div className={styles.item2}>
          <p>Legal Pages</p>
          <ul>
            <li>Terms and conditions</li>
            <li>Privacy</li>
            <li>Cookies</li>
            <li>Modern Slavery Statement</li>
          </ul>
        </div>
        <div className={styles.item3}>
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
    <div className={styles.footerList2}>
      <div className={styles.copyright}>
        <p>Order.uk Copyright 2024, All Rights Reserved.</p>
      </div>
      <div className={styles.terms}>
        <p>Privacy Policy</p>
        <p>Terms</p>
        <p>Pricing</p>
        <p>Do not sell or share my personal information</p>
      </div>
    </div>
  </div>
  </>
  )
}

export default Footer
