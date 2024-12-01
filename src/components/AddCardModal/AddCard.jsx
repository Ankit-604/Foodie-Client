import React, { useState, useEffect } from "react";
import styles from "./addcard.module.css";
import toast from "react-hot-toast";
import { userDebitCard } from "../../services/index";

const AddCard = ({ isOpen, onClose, cardName, setPopupOpen }) => {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    cardNumber: "",
    expire: "",
    cvc: "",
    cardName: "",
  });

  useEffect(() => {
    if (cardName) {
      setFormData((prevData) => ({
        ...prevData,
        cardName: cardName,
      }));
    }
  }, [cardName]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formData);

    const { cardNumber, expire, cvc, cardName } = formData;
    if (!cardNumber || !expire || !cvc || !cardName) {
      return toast.error("Missing required field");
    }

    if (cardNumber.length !== 16 || isNaN(cardNumber)) {
      return toast.error("Invalid card number");
    }

    const expireRegex = /^(0[1-9]|1[0-2])\/\d{2}$/;
    if (!expireRegex.test(expire)) {
      return toast.error("Invalid expiration date format (MM/YY)");
    }

    if (cvc.length !== 3 || isNaN(cvc)) {
      return toast.error("Invalid CVC");
    }

    setLoading(true);
    try {
      const response = await userDebitCard(formData);
      if (response.message === "Card added successfully") {
        toast.success(response.message);
        setFormData({
          cardNumber: "",
          expire: "",
          cvc: "",
          cardName: "",
        });
      } else {
        toast.error(response.message);
      }
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
      setPopupOpen(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.container} onClick={(e) => e.stopPropagation()}>
        <h2>Edit Payment Method</h2>
        <form onSubmit={handleSubmit}>
          <label>
            Card Number
            <input
              type="text"
              placeholder="XXXX XXXX XXXX 1234"
              value={formData.cardNumber}
              onChange={(e) =>
                setFormData({ ...formData, cardNumber: e.target.value })
              }
            />
          </label>
          <label>
            Expiration
            <input
              type="text"
              placeholder="MM/YY"
              value={formData.expire}
              onChange={(e) =>
                setFormData({ ...formData, expire: e.target.value })
              }
            />
          </label>
          <label>
            CVC
            <input
              type="text"
              placeholder="XXX"
              value={formData.cvc}
              onChange={(e) =>
                setFormData({ ...formData, cvc: e.target.value })
              }
            />
          </label>
          <label>
            Name on Card
            <input
              type="text"
              placeholder="Your Name"
              value={formData.cardName}
              onChange={(e) =>
                setFormData({ ...formData, cardName: e.target.value })
              }
            />
          </label>
          <div className={styles.actions}>
            <button
              type="button"
              className={styles.cancelButton}
              onClick={onClose}
            >
              Cancel
            </button>
            <div className={styles.cancelSaveButton}>
              <button
                type="submit"
                disabled={loading}
                className={styles.saveButton}
              >
                {loading ? "Loading" : "Save Changes"}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddCard;
