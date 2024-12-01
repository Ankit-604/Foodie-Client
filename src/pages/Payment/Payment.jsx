import React, { useState,useEffect } from "react";
import styles from "./Payment.module.css";
import AllNavBar from "../../components/AllNavbar/AllNavbar";
import Nav from "../../components/Nav/Nav";
import arrow from "../../assets/arrow-left.png";
import forwardAddressImg from "../../assets/forwardAddress.png";
import walletImg from "../../assets/Wallet.png";
import mImage from "../../assets/M.png";
import pImage from "../../assets/P.png";
import sImage from "../../assets/S.png";
import SimilarRestaurent from "../../components/SimilarRestaurent/SimilarRestaurent";
import Footer from "../../components/Footer/Footer";
import { useNavigate, useParams } from "react-router-dom";
import AddCard from "../../components/AddCardModal/AddCard";
import { removeCartItem, UserCard } from "../../services";
import toast from "react-hot-toast";

const Payment = () => {
  const [isPopupOpen, setPopupOpen] = useState(false);
  const [currentCardName, setCurrentCardName] = useState("");
  const [selectedCard, setSelectedCard] = useState(null);
  const [userDebitCard,setUserDebitCard] = useState([])
  const navigate = useNavigate();
  const amount = localStorage.getItem("totalAmount");
  const { id } = useParams()
  const handleCardSelect = (cardName) => {
    setSelectedCard(cardName === selectedCard ? null : cardName);
  };

  const handleCardClick = (cardName) => {
    const isCardValid = userDebitCard.some((card) => card.cardName === cardName);
    if(isCardValid){
      return;
    }
    setCurrentCardName(cardName);
    setPopupOpen(true);
  };

  useEffect(() => {
    const getDebitCard = async () => {
    try {
      const response = await UserCard()
      setUserDebitCard(response.userCard)
    } catch (error) {
      toast.error(error.message)
    }
  }
    getDebitCard();
  }, [isPopupOpen]);

  const handlePayment = () => {
    const isCardValid = userDebitCard.some((card) => card.cardName === selectedCard);
    if (!selectedCard || userDebitCard.length === 0) {
      return toast.error("Please select a card or Add card details");
    }
    if (!isCardValid) {
      return toast.error("Please select a valid card you added");
    }
    if(localStorage.getItem("userId") === localStorage.getItem("cartUserId")){
      const clearCart = async() => {
        try {
          const response = await removeCartItem(id)
          console.log(response)
        } catch (error) {
          console.log(error.message)
        }
      }
   clearCart()
    }
    navigate(`/orderSuccess/${id}`);
  };

  const selectedDebitCard = userDebitCard.filter((f) =>
    !["MasterCard", "Paypal", "Stripe"].includes(f.cardName)
  );


  return (
    <>
      <div className={styles.paymentContainer}>
        <Nav />
        <div className={styles.allNav}>
          <AllNavBar />
        </div>

        <div className={styles.checkout}>
          <div className={styles.checkoutName}>
            <img src={arrow} alt="Back" onClick={() => navigate(-1)} />
            <h1>Your Order Details</h1>
          </div>

          <div className={styles.Details}>
            <div className={styles.notesAndDetails}>
              <div className={styles.getItem}>
                <div className={styles.allItem}>
                  <div className={styles.checkoutDetails}>
                    <div className={styles.checkoutDetailsWrapper}>
                      <div className={styles.wallet}>
                        <img src={walletImg} alt="Wallet" />
                      </div>
                      <div className={styles.cartTitle}>
                        <h3>Wallet</h3>
                        <p>Available balance: ₹300</p>
                      </div>
                    </div>
                    <img src={forwardAddressImg} alt="Forward" />
                  </div>
                  <div className={styles.line}></div>
                </div>

                <div className={styles.paymentCards}>
                  <div
                    className={styles.paymentCardsWrapper}
                    onClick={() => handleCardClick("MasterCard")}
                  >
                    <div className={styles.mastercard}>
                      <img src={mImage} alt="MasterCard" />
                    </div>
                    <div className={styles.cardTitle}>
                      <h3>MasterCard</h3>
                    </div>
                  </div>
                  <div className={styles.check}>
                    <input
                      type="checkbox"
                      checked={selectedCard === "MasterCard"}
                      onChange={() => handleCardSelect("MasterCard")}
                    />
                  </div>
                </div>

                <div className={styles.paymentCards}>
                  <div
                    className={styles.paymentCardsWrapper}
                    onClick={() => handleCardClick("Paypal")}
                  >
                    <div className={styles.mastercard}>
                      <img src={pImage} alt="Paypal" />
                    </div>
                    <div className={styles.cardTitle}>
                      <h3>Paypal</h3>
                    </div>
                  </div>
                  <div className={styles.check}>
                    <input
                      type="checkbox"
                      checked={selectedCard === "Paypal"}
                      onChange={() => handleCardSelect("Paypal")}
                    />
                  </div>
                </div>

                <div className={styles.paymentCards}>
                  <div
                    className={styles.paymentCardsWrapper}
                    onClick={() => handleCardClick("Stripe")}
                  >
                    <div className={styles.mastercard}>
                      <img src={sImage} alt="Stripe" />
                    </div>
                    <div className={styles.cardTitle}>
                      <h3>Stripe</h3>
                    </div>
                  </div>
                  <div className={styles.check}>
                    <input
                      type="checkbox"
                      checked={selectedCard === "Stripe"}
                      onChange={() => handleCardSelect("Stripe")}
                    />
                  </div>
                </div>

              {selectedDebitCard && 
              selectedDebitCard.map((card) => (
                <div className={styles.paymentCards} key={card._id}>
                <div
                  className={styles.paymentCardsWrapper}
                  onClick={() => handleCardClick(card.cardName)}
                >
                  <div className={styles.mastercard}>
                    <img src={walletImg} alt="Stripe" />
                  </div>
                  <div className={styles.cardTitle}>
                    <h3>{card.cardName}</h3>
                  </div>
                </div>
                <div className={styles.check}>
                  <input
                    type="checkbox"
                    checked={selectedCard === card.cardName}
                    onChange={() => handleCardSelect(card.cardName)}
                  />
                </div>
              </div>
              ))
              }

                <div
                  className={styles.addCards}
                  onClick={() => handleCardClick("")}
                >
                  <div className={styles.addCardssWrapper}>
                    <div className={styles.addBtn}>
                      <button>+</button>
                    </div>
                    <div className={styles.addBtnTitle}>
                      <h3>Add Debit Card</h3>
                    </div>
                  </div>
                  <img src={forwardAddressImg} alt="Forward" />
                </div>
              </div>
            </div>

            <div className={styles.allAddressDetails}>
              <div className={styles.allAmount}>
                <div className={styles.amount}>
                  <p>Amount to be paid</p>
                  <h3>₹{amount}</h3>
                </div>
                <div className={styles.line2}></div>

                <button  onClick={handlePayment}>Proceed Payment</button>
              </div>
            </div>
          </div>
        </div>
        <AddCard
          isOpen={isPopupOpen}
          cardName={currentCardName}
          onClose={() => setPopupOpen(false)}
          setPopupOpen={setPopupOpen}
        />
      </div>
      <div className={styles.similarRestaurentWrapper}>
        <SimilarRestaurent />
      </div>
      <Footer />
    </>
  );
};

export default Payment;