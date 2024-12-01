import React, { useState, useEffect } from "react";
import styles from "./profile.module.css";
import AllNavBar from "../../components/AllNavbar/AllNavbar";
import Nav from "../../components/Nav/Nav";
import arrow from "../../assets/arrow-left.png";
import { useNavigate } from "react-router-dom";
import profileImg from "../../assets/avatar.png";
import cardImage from "../../assets/credit-card.png";
import cardEditImage from "../../assets/cardEdit.png";
import Footer from "../../components/Footer/Footer";
import EditCard from "../../components/EditCardModal/EditCard";
import AddCardInProfile from "../../components/AddCardProfile/AddCardProfile";
import { getUserProfile, updatedUserProfile, UserCard } from "../../services";
import toast from "react-hot-toast";

const Profile = () => {
  const [isPopupOpen, setPopupOpen] = useState(false);
  const [isEditCard, setIsEditCard] = useState(false);
  const [userDebitCard, setUserDebitCard] = useState([]);
  const [cardId, setCardId] = useState(null);
  const [isEditMode, setIsEditMode] = useState(false);
  const [loading, setLoading] = useState(false);
  const [profileData, setProfileData] = useState({
    fullName: "",
    email: "",
    gender: "",
    country: "",
  });

  const navigate = useNavigate();

  const handleEmailEdit = () => {
    if (isEditMode) {
      toast.error("You can not edit this field");
    }
  };

  useEffect(() => {
    const getDebitCard = async () => {
      try {
        const response = await UserCard();
        setUserDebitCard(response.userCard);
      } catch (error) {
        console.error(error.message);
      }
    };
    getDebitCard();
  }, [isPopupOpen, isEditCard]);

  useEffect(() => {
    const getProfile = async () => {
      try {
        const response = await getUserProfile();
        setProfileData(response.user);
      } catch (error) {
        toast.error(error.message);
      }
    };
    getProfile();
  }, [isEditMode]);

  const handleEditToggle = () => {
    // if (isEditMode) {
    //   console.log("Updated Profile Data:", profileData);
    // }
    setIsEditMode(!isEditMode);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProfileData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleUpdateData = async () => {
    if (isEditMode) {
      const { fullName, gender, country } = profileData;
      if (!gender && !fullName && !country) {
        return toast.error("At least one field is required to update.");
      }
      if (
        gender &&
        !["male", "female", "others"].includes(gender.trim().toLowerCase())
      ) {
        return toast.error("Gender must be 'male', 'female', or 'others'.");
      }
      setLoading(true);
      try {
        const response = await updatedUserProfile(profileData);
        if (response.status === "200") {
          toast.success(response.message);
        }
      } catch (error) {
        toast.error(error.message);
      } finally {
        setLoading(false);
      }
    }
    setIsEditMode(!isEditMode);
  };

  const handleEditCard = (id) => {
    setIsEditCard(true);
    setCardId(id);
  };

  const handleAddCard = () => {
    setPopupOpen(true);
  };

  const name = localStorage.getItem("name");

  return (
    <>
      <div className={styles.container}>
        <Nav />
        <div className={styles.allNav}>
          <AllNavBar />
        </div>
        <div className={styles.checkoutName}>
          <img src={arrow} alt="Back" onClick={() => navigate(-1)} />
          <h1>My Profile</h1>
        </div>
        <div className={styles.profileContainer}>
          <div className={styles.profileImageContainer}>
            <div className={styles.profileImage}>
              <img src={profileImg} alt="Profile" />
              <p>{name}</p>
            </div>
            <div className={styles.saveEditButton}>
              <button disabled={loading}>
                {isEditMode ? (
                  <span onClick={handleUpdateData}>Save</span>
                ) : (
                  <span onClick={handleEditToggle}>Edit</span>
                )}
              </button>
            </div>
          </div>
          <div className={styles.profileDetails}>
            <div className={styles.profileFullName}>
              <p>Full Name</p>
              <input
                type="text"
                placeholder="Enter your fullName"
                name="fullName"
                value={profileData.fullName}
                onChange={handleInputChange}
                readOnly={!isEditMode}
              />
            </div>
            <div className={styles.profileEmail}>
              <p>Email Address</p>
              <input
                type="email"
                placeholder="Enter your Email"
                name="email"
                value={profileData.email}
                onChange={handleInputChange}
                readOnly
                onClick={handleEmailEdit}
              />
            </div>
            <div className={styles.profileGender}>
              <p>Gender</p>
              <input
                type="text"
                name="gender"
                placeholder="Enter your gender"
                value={profileData.gender}
                onChange={handleInputChange}
                readOnly={!isEditMode}
              />
            </div>
            <div className={styles.profileCountry}>
              <p>Country</p>
              <input
                type="text"
                name="country"
                placeholder="Enter your Country name"
                value={profileData.country}
                onChange={handleInputChange}
                readOnly={!isEditMode}
              />
            </div>
          </div>
          <div className={styles.line}></div>

          <div className={styles.debitCards}>
            <h3>Saved Payment Methods</h3>
            <div className={styles.cardDetailsWrapper}>
              {userDebitCard.map((debitCard) => (
                <div className={styles.cardDetails} key={debitCard._id}>
                  <div className={styles.cardImg}>
                    <img src={cardImage} alt="Card" />
                  </div>
                  <div className={styles.cardnumber}>
                    <p>{debitCard.cardNumber}</p>
                    <h3>{debitCard.cardName}</h3>
                  </div>
                  <img
                    onClick={(e) => {
                      e.stopPropagation();
                      handleEditCard(debitCard._id);
                    }}
                    src={cardEditImage}
                    alt="Edit Card"
                  />
                </div>
              ))}
              <div className={styles.addCards}>
                <button onClick={handleAddCard}>+</button>
                <p>Add New Card</p>
              </div>
            </div>
          </div>
        </div>
        <EditCard
          isEditCard={isEditCard}
          onCloseCard={() => setIsEditCard(false)}
          cardId={cardId}
          setIsEditCard={setIsEditCard}
        />
        <AddCardInProfile
          isOpen={isPopupOpen}
          onClose={() => setPopupOpen(false)}
          setPopupOpen={setPopupOpen}
        />
      </div>
      <div className={styles.footer}>
        <Footer />
      </div>
    </>
  );
};

export default Profile;
