import { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState("");
  const [showCart, setShowCart] = useState(false);
  const [selectedAddress, setSelectedAddress] = useState(null);

  const handleCart = () => {
    setShowCart((prev) => !prev);
  };

  const logIn = (name) => {
    setIsLoggedIn(true);
    setUserName(name);
    localStorage.setItem("name", name);
  };

  const logOut = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("name");
    localStorage.removeItem("userId");
    setIsLoggedIn(false);
    setUserName("");
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    const name = localStorage.getItem("name");

    if (token && name) {
      setIsLoggedIn(true);
      setUserName(name);
    } else {
      localStorage.removeItem("name");
      localStorage.removeItem("userId");
      localStorage.removeItem("Address");
      localStorage.removeItem("addressId");
      localStorage.removeItem("cartUserId");
      localStorage.removeItem("totalAmount");
      localStorage.removeItem("title");
    }
  }, []);

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn,
        userName,
        logIn,
        logOut,
        showCart,
        handleCart,
        setShowCart,
        selectedAddress,
        setSelectedAddress,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
