import React, { useEffect, useState } from "react";
import styles from "./burgers.module.css";
import { createCart, getFoodItem } from "../../services";
import toast from "react-hot-toast";
import { useAuth } from "../Context/AuthContext";

const Burgers = ({ onCartUpdate }) => {
  const [cards, setCards] = useState([]);
  const [loading, setLoading] = useState(false);
  const { setShowCart } = useAuth();

  useEffect(() => {
    const getCards = async () => {
      try {
        const response = await getFoodItem();
        setCards(response.cards);
      } catch (error) {
        toast.error(error.message);
      }
    };
    getCards();
  }, []);

  const handleCards = async (card) => {
    const token = localStorage.getItem("token");
    if (!token) {
      toast.error("Please log in to add items to your cart.");
      return;
    }
    if (loading[card._id]) return;

    setLoading((prev) => ({ ...prev, [card._id]: true }));
    setShowCart(true);
    try {
      const response = await createCart({ cardId: card._id });
      if (response.message === "Item added to cart") {
        toast.success(response.message);
        onCartUpdate();
      }
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading((prev) => ({ ...prev, [card._id]: false }));
    }
  };

  const BurgerCards = cards.filter((card) => card.name === "Burgers");
  const FriesCards = cards.filter((card) => card.name === "Fries");
  const ColdDrinkCards = cards.filter((card) => card.name === "Cold Drinks");
  return (
    <div className={styles.foodItemBurger}>
      {BurgerCards.length > 0 ? (
        <div className={styles.burgerMain}>
          <h2>Burgers</h2>
          <div className={styles.burgerCardWrapper}>
            {BurgerCards.map((burgerCard) => (
              <div className={styles.burgerCard} key={burgerCard._id}>
                <div className={styles.cardDetailsBurger}>
                  <h3>{burgerCard.title}</h3>
                  <h4>{burgerCard.description}</h4>
                  <h5> ₹ {burgerCard.price}</h5>
                </div>
                <div className={styles.burgerCardImg}>
                  <div className={styles.mainImageBurger}>
                    <img src={burgerCard.mainImage} alt={burgerCard.title} />
                  </div>
                  <div className={styles.addBg}>
                    <img src={burgerCard.addImageBg} alt="image" />
                  </div>
                  <div className={styles.addImg}>
                    <img
                      src={burgerCard.addImage}
                      onClick={() => handleCards(burgerCard)}
                      alt="image"
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className={styles.notAvailable}>
          <p>No burgers are available at the moment.</p>
        </div>
      )}

      {FriesCards.length > 0 ? (
        <div className={styles.burgerMain}>
          <h2 className={styles.fries}>Fries</h2>
          <div className={styles.burgerCardWrapper}>
            {FriesCards.map((friesCard) => (
              <div className={styles.burgerCard} key={friesCard._id}>
                <div className={styles.cardDetailsBurger}>
                  <h3>{friesCard.title}</h3>
                  <h4>{friesCard.description}</h4>
                  <h5> ₹ {friesCard.price}</h5>
                </div>
                <div className={styles.burgerCardImg}>
                  <div className={styles.mainImageBurger}>
                    <img src={friesCard.mainImage} alt={friesCard.title} />
                  </div>
                  <div className={styles.addBg}>
                    <img src={friesCard.addImageBg} alt="image" />
                  </div>
                  <div className={styles.addImg}>
                    <img
                      src={friesCard.addImage}
                      onClick={() => handleCards(friesCard)}
                      alt="image"
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className={styles.notAvailable}>
          <p>No fries are available at the moment.</p>
        </div>
      )}

      {ColdDrinkCards.length > 0 ? (
        <div className={styles.burgerMain}>
          <h2 className={styles.fries}>Cold Drinks</h2>
          <div className={styles.burgerCardWrapper}>
            {ColdDrinkCards.map((coldDrinkCard) => (
              <div className={styles.burgerCard} key={coldDrinkCard._id}>
                <div className={styles.cardDetailsBurger}>
                  <h3>{coldDrinkCard.title}</h3>
                  <h4>{coldDrinkCard.description}</h4>
                  <h5> ₹ {coldDrinkCard.price}</h5>
                </div>
                <div className={styles.burgerCardImg}>
                  <div className={styles.mainImageBurger}>
                    <img
                      src={coldDrinkCard.mainImage}
                      alt={coldDrinkCard.title}
                    />
                  </div>
                  <div className={styles.addBg}>
                    <img src={coldDrinkCard.addImageBg} alt="image" />
                  </div>
                  <div className={styles.addImg}>
                    <img
                      src={coldDrinkCard.addImage}
                      onClick={() => handleCards(coldDrinkCard)}
                      alt="image"
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className={styles.notAvailable}>
          <p>No cold drinks are available at the moment.</p>
        </div>
      )}
    </div>
  );
};

export default Burgers;
