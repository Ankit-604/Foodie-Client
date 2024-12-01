import React,{useEffect, useState} from "react";
import styles from "./checkout.module.css";
import Nav from "../../components/Nav/Nav";
import AllNavbar from "../../components/AllNavbar/AllNavbar";
import arrow from "../../assets/arrow-left.png";
import mapPinImg from "../../assets/MapPin.png";
import forwardAddressImg from "../../assets/forwardAddress.png";
import SimilarRestaurent from "../../components/SimilarRestaurent/SimilarRestaurent";
import Footer from "../../components/Footer/Footer"
import { getCartItem, getCheckoutItem } from "../../services";
import { useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";

const Checkout = () => {
  const [checkout,setCheckout] = useState([])
  const [totalPrice, setTotalPrice] = useState(0);
  const [item,setItem] = useState(0)
  const { id } = useParams()
  const navigate = useNavigate()
  const localAddress = JSON.parse(localStorage.getItem("Address"));



  useEffect(() => {
    const getCheckout = async () => {
      try {
        const response = await getCheckoutItem(id);
        setCheckout(response.cart)
        setItem(response?.cart?.length || 0)
        setTotalPrice(response?.totalPrice || 0);
        localStorage.setItem("totalAmount", response.totalPrice || 0)
        localStorage.setItem("cartUserId",response.cartUserId)
      } catch (error) {
        toast.error(error.message);
      }
    };
    getCheckout()
  }, []);

  useEffect(() => {
    if(checkout?.length > 0){
      let title = checkout.map((item) => item.cardId.title)
      localStorage.setItem("title", JSON.stringify(title))
    }
  })

 
  return (
    <>
    <div className={styles.checkoutContainer}>
      <Nav />
      <div className={styles.allNavbar}>
        <AllNavbar />
      </div>

      <div className={styles.checkout}>
        <div className={styles.checkoutName}>
          <img src={arrow} alt="image" onClick={() => navigate(-1)} />
          <h1>Your Order Details</h1>
        </div>

        <div className={styles.Details}>
          <div className={styles.notesAndDetails}>
            <div className={styles.getItem}>
            {checkout?.length > 0 ? (
              checkout.map((checkoutItem) => (
              <div className={styles.allItem} key={checkoutItem._id}>
              <div className={styles.checkoutDetails}>
                <div className={styles.checkoutDetailsWrapper}>
                  <img src={checkoutItem.cardId.mainImage} alt="image " />
                  <div className={styles.cartTitle}>
                    <h3>{checkoutItem.cardId.title}</h3>
                    <p>{checkoutItem.quantity}x item</p>
                  </div>
                </div>
                <p>{checkoutItem.price}</p>
              </div>
              <div className={styles.line}></div>
            </div>
            ))) : (
              <>
              <div className={styles.noItem}>
              <p>No checkout items available</p>
              </div>
              <div className={styles.line}></div>
              </>
            )}
            <div className={styles.notes}>
              <p>Notes</p>
              <textarea readOnly placeholder="Add order notes"></textarea>
            </div>
            </div>
          </div>

          <div className={styles.allAddressDetails}>
            <div className={styles.addressDetails}>
              <div className={styles.input}>
                <div className={styles.allInputItem}>
                  <div className={styles.mapPin}>
                    <img src={mapPinImg} alt="image" />
                  </div>
                  <div className={styles.delivery} onClick={() => navigate("/address")}>
                    <h3>Delivery Address</h3>
                    {localAddress ? <p>{localAddress.fullAddress},{localAddress.city},{localAddress.pinCode},{localAddress.state}</p> : <p>Select Address</p>}
                  </div>
                </div>
                <img src={forwardAddressImg} alt="image" onClick={() => navigate("/address")} />
              </div>
            </div>
            <div className={styles.line2}></div>

            <div className={styles.itemAndTax}>
              <div className={styles.totalItems}>
                <p>Items</p>
                <h3>₹{totalPrice}</h3>
              </div>
              <div className={styles.tax}>
                <p>Sales Tax</p>
                <h3>₹0</h3>
              </div>
            </div>
            <div className={styles.line2}></div>

            <div className={styles.subTotal}>
                <p>Subtotal ({item} items)</p>
                <h3>₹{totalPrice}</h3>
              </div>
              <button onClick={() => navigate(`/payment/${id}`)}>Choose Payment Method</button>
          </div>
        </div>
      </div>
      <SimilarRestaurent/>
    </div>
    <div className={styles.footer}>
    <Footer/>
    </div>
    </>
  );
};

export default Checkout;