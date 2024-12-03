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
import arrowLeftImg from "../../assets/ArrowLeft.png";

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
  }, [isPopupOpen, isEditCard]);

  useEffect(() => {
    if (!localStorage.getItem("token")) {
      return;
    }
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
    if (!localStorage.getItem("token")) {
      toast.error("Please log in to continue.");
      return;
    }
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
    if (!localStorage.getItem("token")) {
      toast.error("Please log in to continue.");
      return;
    }
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
    if (!localStorage.getItem("token")) {
      toast.error("Please log in to continue.");
      return;
    }
    setPopupOpen(true);
  };

  const name = localStorage.getItem("name");

  return (
    <>
      <div className={styles.containerProfile}>
        <Nav />
        <div className={styles.allNavProfile}>
          <AllNavBar />
        </div>
        <div className={styles.checkoutNameProfile}>
          <img src={arrow} alt="Back" onClick={() => navigate(-1)} />
          <h1>My Profile</h1>
        </div>
        <div className={styles.profileContainer}>
          <div className={styles.ImageContainerProfile}>
            <div className={styles.imageProfile}>
              <img src={profileImg} alt="Profile" />
              <p>{name}</p>
            </div>
            <div className={styles.checkoutArrowProfile}>
              <div className={styles.arrowLeftProfile}>
                <img
                  src={arrowLeftImg}
                  alt="arrow-image"
                  onClick={() => navigate(-1)}
                />
              </div>
              <p>Your Profile</p>
            </div>
            <div className={styles.saveEditButtonProfile}>
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
            <div className={styles.userNameProfile}>
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
            <div className={styles.userEmailProfile}>
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
            <div className={styles.userGenderProfile}>
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
            <div className={styles.userCountryProfile}>
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

          <div className={styles.debitCardsProfile}>
            <h3>Saved Payment Methods</h3>
            <div className={styles.cardDetailsSectionProfile}>
              {userDebitCard.map((debitCard) => (
                <div className={styles.cardDetailsProfile} key={debitCard._id}>
                  <div className={styles.cardImageProfile}>
                    <img src={cardImage} alt="Card" />
                  </div>
                  <div className={styles.cardNumProfile}>
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
              <div className={styles.addCardsProfile}>
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
      <div className={styles.footerProfile}>
        <Footer />
      </div>
    </>
  );
};

export default Profile;
