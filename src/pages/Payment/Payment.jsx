import React, { useState, useEffect } from "react";
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
import arrowLeftImg from "../../assets/ArrowLeft.png";

const Payment = () => {
  const [isPopupOpen, setPopupOpen] = useState(false);
  const [currentCardName, setCurrentCardName] = useState("");
  const [selectedCard, setSelectedCard] = useState(null);
  const [userDebitCard, setUserDebitCard] = useState([]);
  const navigate = useNavigate();
  const amount = localStorage.getItem("totalAmount");
  const { id } = useParams();
  const handleCardSelect = (cardName) => {
    setSelectedCard(cardName === selectedCard ? null : cardName);
  };

  const handleCardClick = (cardName) => {
    if (!localStorage.getItem("token")) {
      toast.error("Please log in to continue.");
      return;
    }
    const isCardValid = userDebitCard.some(
      (card) => card.cardName === cardName
    );
    if (isCardValid) {
      return;
    }
    setCurrentCardName(cardName);
    setPopupOpen(true);
  };

  useEffect(() => {
    if (!localStorage.getItem("token")) {
      return;
    }
    const getDebitCard = async () => {
      try {
        const response = await UserCard();
        setUserDebitCard(response.userCard);
      } catch (error) {
        toast.error(error.message);
      }
    };
    getDebitCard();
  }, [isPopupOpen]);

  const handlePayment = () => {
    if (!localStorage.getItem("token")) {
      toast.error("Please log in to continue.");
      return;
    }

    const isCardValid = userDebitCard.some(
      (card) => card.cardName === selectedCard
    );
    if (!selectedCard || userDebitCard.length === 0) {
      return toast.error("Please select a card or Add card details");
    }
    if (!isCardValid) {
      return toast.error("Please select a valid card you added");
    }
    if (amount === "0") {
      return toast.error(
        "Please add at least one item to proceed with the payment."
      );
    }

    const isCartOwner =
      localStorage.getItem("userId") === localStorage.getItem("cartUserId");

    if (isCartOwner) {
      const clearCart = async () => {
        try {
          const response = await removeCartItem(id);
          if (
            response.message ===
            "You cannot proceed to payment because your cart is empty."
          ) {
            return toast.error(
              "You cannot proceed to payment because your cart is empty."
            );
          }
          localStorage.setItem("totalAmount", "0");
          toast.success("Order Placed successfully");
          navigate(`/orderSuccess/${id}`);
        } catch (error) {
          toast.error(error.message);
        }
      };
      clearCart();
    } else {
      toast.success("Order Placed successfully");
      navigate(`/orderSuccess/${id}`);
    }
  };

  const selectedDebitCard = userDebitCard.filter(
    (f) => !["MasterCard", "Paypal", "Stripe"].includes(f.cardName)
  );

  return (
    <>
      <div className={styles.paymentMain}>
        <Nav />
        <div className={styles.paymentAllNav}>
          <AllNavBar />
        </div>

        <div className={styles.paymentCheckout}>
          <div className={styles.checkoutNamePayment}>
            <img src={arrow} alt="image" onClick={() => navigate(-1)} />
            <h1>Choose and Pay</h1>
          </div>

          <div className={styles.DetailsPayment}>
            <div className={styles.checkoutArrowPayment}>
              <div className={styles.arrowLeftPayment}>
                <img
                  src={arrowLeftImg}
                  alt="arrow-image"
                  onClick={() => navigate(-1)}
                />
              </div>
              <p>Choose and Pay</p>
            </div>
            <div className={styles.notesAndDetailsPayment}>
              <div className={styles.getItemPayment}>
                <div className={styles.allItemPayment}>
                  <div className={styles.checkoutDetailsPayment}>
                    <div className={styles.detailsWrapperPayment}>
                      <div className={styles.walletPayment}>
                        <img src={walletImg} alt="Wallet" />
                      </div>
                      <div className={styles.cartTitlePayment}>
                        <h3>Wallet</h3>
                        <p>Available balance: ₹300</p>
                      </div>
                    </div>
                    <img src={forwardAddressImg} alt="Forward" />
                  </div>
                  <div className={styles.line}></div>
                </div>

                <div className={styles.cardsPayment}>
                  <div
                    className={styles.cardsWrapperPayment}
                    onClick={() => handleCardClick("MasterCard")}
                  >
                    <div className={styles.mastercardPayment}>
                      <img src={mImage} alt="MasterCard" />
                    </div>
                    <div className={styles.cardTitlePayment}>
                      <h3>MasterCard</h3>
                    </div>
                  </div>
                  <div className={styles.checkPayment}>
                    <input
                      type="checkbox"
                      checked={selectedCard === "MasterCard"}
                      onChange={() => handleCardSelect("MasterCard")}
                    />
                  </div>
                </div>

                <div className={styles.cardsPayment}>
                  <div
                    className={styles.cardsWrapperPayment}
                    onClick={() => handleCardClick("Paypal")}
                  >
                    <div className={styles.mastercardPayment}>
                      <img src={pImage} alt="Paypal" />
                    </div>
                    <div className={styles.cardTitlePayment}>
                      <h3>Paypal</h3>
                    </div>
                  </div>
                  <div className={styles.checkPayment}>
                    <input
                      type="checkbox"
                      checked={selectedCard === "Paypal"}
                      onChange={() => handleCardSelect("Paypal")}
                    />
                  </div>
                </div>

                <div className={styles.cardsPayment}>
                  <div
                    className={styles.cardsWrapperPayment}
                    onClick={() => handleCardClick("Stripe")}
                  >
                    <div className={styles.mastercardPayment}>
                      <img src={sImage} alt="Stripe" />
                    </div>
                    <div className={styles.cardTitlePayment}>
                      <h3>Stripe</h3>
                    </div>
                  </div>
                  <div className={styles.checkPayment}>
                    <input
                      type="checkbox"
                      checked={selectedCard === "Stripe"}
                      onChange={() => handleCardSelect("Stripe")}
                    />
                  </div>
                </div>

                {selectedDebitCard &&
                  selectedDebitCard.map((card) => (
                    <div className={styles.cardsPayment} key={card._id}>
                      <div
                        className={styles.cardsWrapperPayment}
                        onClick={() => handleCardClick(card.cardName)}
                      >
                        <div className={styles.mastercardPayment}>
                          <img src={walletImg} alt="Stripe" />
                        </div>
                        <div className={styles.cardTitlePayment}>
                          <h3>{card.cardName}</h3>
                        </div>
                      </div>
                      <div className={styles.checkPayment}>
                        <input
                          type="checkbox"
                          checked={selectedCard === card.cardName}
                          onChange={() => handleCardSelect(card.cardName)}
                        />
                      </div>
                    </div>
                  ))}

                <div
                  className={styles.addCards}
                  onClick={() => handleCardClick("")}
                >
                  <div className={styles.addCardsWrapperPayment}>
                    <div className={styles.addBtnPayment}>
                      <button>+</button>
                    </div>
                    <div className={styles.addBtnTitlePayment}>
                      <h3>Add Debit Card</h3>
                    </div>
                  </div>
                  <img src={forwardAddressImg} alt="Forward" />
                </div>
              </div>
            </div>

            <div className={styles.allAddressDetailsPayment}>
              <div className={styles.allAmountPayment}>
                <div className={styles.amountPayment}>
                  <p>Amount to be paid</p>
                  <h3>₹{amount}</h3>
                </div>
                <div className={styles.line2}></div>

                <button onClick={handlePayment}>Proceed Payment</button>
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
      <div className={styles.footerPayment}>
        <Footer />
      </div>
    </>
  );
};

export default Payment;
