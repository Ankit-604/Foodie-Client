import React, { useState } from "react";
import styles from "./AddressPopup.module.css";
import addressImg from "../../assets/addressLocation.png";
import toast from "react-hot-toast";
import { userAddress } from "../../services";

const AddressPopup = ({ isOpen, onClose, setIsPopupOpen }) => {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    state: "",
    city: "",
    pinCode: "",
    phoneNumber: "",
    fullAddress: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { state, city, pinCode, phoneNumber, fullAddress } = formData;
    if (!state || !city || !pinCode || !phoneNumber || !fullAddress) {
      return toast.error("Missing required field");
    }
    if (!/^\d*$/.test(phoneNumber) || phoneNumber.length !== 10) {
      return toast.error("Invalid phone number");
    }
    if (!/^\d*$/.test(pinCode) || pinCode.length !== 6) {
      return toast.error("Invalid pin code");
    }
    setLoading(true);
    try {
      const response = await userAddress(formData);
      if (response.message === "Address added successfully") {
        toast.success("Address added successfully");
      } else {
        toast.error(response.message);
      }
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
      setIsPopupOpen(false);
    }
  };

  if (!isOpen) return null;
  return (
    <div className={styles.backdrop} onClick={onClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <div className={styles.addressImage}>
          <img src={addressImg} alt="image" />
          <h2>Add Address</h2>
        </div>
        <form className={styles.form} onSubmit={handleSubmit}>
          <div className={styles.row}>
            <select
              className={styles.input}
              value={formData.state}
              onChange={(e) =>
                setFormData({ ...formData, state: e.target.value })
              }
            >
              <option value="" disabled>
                State
              </option>
              <option value="Andhra Pradesh">Andhra Pradesh</option>
              <option value="Arunachal Pradesh">Arunachal Pradesh</option>
              <option value="Assam">Assam</option>
              <option value="Bihar">Bihar</option>
              <option value="Chhattisgarh">Chhattisgarh</option>
              <option value="Goa">Goa</option>
              <option value="Gujarat">Gujarat</option>
              <option value="Haryana">Haryana</option>
              <option value="Himachal Pradesh">Himachal Pradesh</option>
              <option value="Jharkhand">Jharkhand</option>
              <option value="Karnataka">Karnataka</option>
              <option value="Kerala">Kerala</option>
              <option value="Madhya Pradesh">Madhya Pradesh</option>
              <option value="Maharashtra">Maharashtra</option>
              <option value="Manipur">Manipur</option>
              <option value="Meghalaya">Meghalaya</option>
              <option value="Mizoram">Mizoram</option>
              <option value="Nagaland">Nagaland</option>
              <option value="Odisha">Odisha</option>
              <option value="Punjab">Punjab</option>
              <option value="Rajasthan">Rajasthan</option>
              <option value="Sikkim">Sikkim</option>
              <option value="Tamil Nadu">Tamil Nadu</option>
              <option value="Telangana">Telangana</option>
              <option value="Tripura">Tripura</option>
              <option value="Uttar Pradesh">Uttar Pradesh</option>
              <option value="Uttarakhand">Uttarakhand</option>
              <option value="West Bengal">West Bengal</option>
            </select>
            <input
              type="text"
              placeholder="City/District"
              className={styles.input}
              value={formData.city}
              onChange={(e) =>
                setFormData({ ...formData, city: e.target.value })
              }
            />
            <input
              type="text"
              placeholder="Pin Code"
              className={styles.input}
              value={formData.pinCode}
              onChange={(e) =>
                setFormData({ ...formData, pinCode: e.target.value })
              }
            />
            <input
              type="text"
              placeholder="Phone Number"
              className={styles.input}
              value={formData.phoneNumber}
              onChange={(e) =>
                setFormData({ ...formData, phoneNumber: e.target.value })
              }
            />
          </div>
          <textarea
            placeholder="Enter full address"
            className={styles.textarea}
            value={formData.fullAddress}
            onChange={(e) =>
              setFormData({ ...formData, fullAddress: e.target.value })
            }
          ></textarea>
          <div className={styles.saveBtn}>
            <button type="submit" className={styles.saveButton}>
              {loading ? "Loading" : "Save"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddressPopup;
