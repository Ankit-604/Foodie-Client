import React, { useState } from "react";
import styles from "./addcardInProfile.module.css";
import toast from "react-hot-toast";
import { userDebitCard } from "../../services";

const AddCardInProfile = ({ isOpen, onClose, setPopupOpen }) => {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    cardNumber: "",
    expire: "",
    cvc: "",
    cardName: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

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
    <div className={styles.AddCardOverlay} onClick={onClose}>
      <div
        className={styles.AddCardContainer}
        onClick={(e) => e.stopPropagation()}
      >
        <h2>Add Payment Method</h2>
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
              placeholder="Your Card Name"
              value={formData.cardName}
              onChange={(e) =>
                setFormData({ ...formData, cardName: e.target.value })
              }
            />
          </label>
          <div className={styles.AddCardActions}>
            <button
              type="button"
              className={styles.cancelButton}
              onClick={onClose}
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={loading}
              className={styles.saveButton}
            >
              {loading ? "Loading" : "Save Changes"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddCardInProfile;
