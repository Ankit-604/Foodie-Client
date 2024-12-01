import React, { useEffect, useState } from "react";
import styles from "./address.module.css";
import AllNav from "../../components/AllNavbar/AllNavbar";
import Nav from "../../components/Nav/Nav";
import arrow from "../../assets/arrow-left.png";
import AddressPopup from "../../components/AddressModal/AddressModal";
import { DeleteUserAddressById, getUserAddress } from "../../services";
import toast from "react-hot-toast";
import EditAddressModal from "../../components/EditAddressModal/EditAddressModal";
import { useNavigate } from "react-router-dom";

const Address = () => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [isEditPopup, setIsEditPopup] = useState(false);
  const [userAddress, setUserAddress] = useState([]);
  const [selectedAddressId, setSelectedAddressId] = useState(null);
  const [userName, setUserName] = useState("");
  const [id, setId] = useState(null);
  const navigate = useNavigate();
  const localAddressId = localStorage.getItem("addressId");

  const handleClosePopup = () => setIsPopupOpen(false);
  const handleEditPopup = () => setIsEditPopup(false);

  useEffect(() => {
    const fetchAddresses = async () => {
      try {
        const response = await getUserAddress();
        setUserAddress(response.userAddress);

        const name = localStorage.getItem("name");
        setUserName(name);
      } catch (error) {
        toast.error(error.message);
      }
    };
    fetchAddresses();
  }, [isPopupOpen, isEditPopup]);

  const handleEdit = (id) => {
    setIsEditPopup(true);
    setId(id);
  };

  const handleRemove = async (addressId) => {
    try {
      const response = await DeleteUserAddressById(addressId);
      if (response.message === "Address deleted successfully") {
        setUserAddress(userAddress.filter((addr) => addr._id !== addressId));
        toast.success(response.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const handleSelectedAddress = (Address) => {
    try {
      setSelectedAddressId(Address._id);
      localStorage.setItem("addressId", Address._id);
      localStorage.setItem("Address", JSON.stringify(Address));
      toast.success("Address selected successfully");
    } catch (error) {
      toast.error("Failed to select address.");
    }
  };

  return (
    <div className={styles.container}>
      <Nav />
      <AllNav />
      <div className={styles.address}>
        <div className={styles.addressHeading}>
          <img src={arrow} alt="arrow-icon" onClick={() => navigate(-1)} />
          <p>Your Addresses</p>
        </div>

        <div className={styles.addAddress}>
          <div className={styles.addAddressBtn}>
            <div className={styles.addBtn}>
              <button onClick={() => setIsPopupOpen(true)}>+</button>
            </div>
            <p>Add Address</p>
          </div>

          {userAddress.length > 0 &&
            userAddress.map((Address) => (
              <div className={styles.userAddress} key={Address._id}>
                <div className={styles.userName}>
                  <p>{userName}</p>
                  <button
                    onClick={() => handleSelectedAddress(Address)}
                    className={
                      selectedAddressId === Address._id
                        ? styles.selectedButton
                        : styles.selectButton
                    }
                  >
                    {localAddressId === Address._id ? "Selected" : "Select"}
                  </button>
                </div>
                <p>
                  {Address.fullAddress}, {Address.city}, {Address.state},{" "}
                  {Address.pinCode}
                </p>
                <h3>Phone Number: {Address.phoneNumber}</h3>
                <div className={styles.editRemove}>
                  <p onClick={() => handleEdit(Address._id)}>Edit</p>
                  <div className={styles.line}></div>
                  <p onClick={() => handleRemove(Address._id)}>Remove</p>
                </div>
              </div>
            ))}
        </div>
        <EditAddressModal
          isOpen={isEditPopup}
          onClose={handleEditPopup}
          id={id}
          setIsEditPopup={setIsEditPopup}
        />
        <AddressPopup
          isOpen={isPopupOpen}
          onClose={handleClosePopup}
          setIsPopupOpen={setIsPopupOpen}
        />
      </div>
    </div>
  );
};

export default Address;
