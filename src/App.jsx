import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login/Login";
import Signup from "./pages/Signup/Signup";
import Home from "./pages/Home/Home";
import Product from "./pages/Product/Product";
import Checkout from "./pages/Checkout/Checkout";
import Payment from "./pages/Payment/Payment";
import { AuthProvider, useAuth } from "./components/Context/AuthContext";
import { Toaster } from "react-hot-toast";
import Address from "./pages/Address/Address";
import OrderSuccess from "./pages/OrderSuccess/OrderSuccess";
import Profile from "./pages/Profile/Profile";

const DefaultRoute = () => {
  const { isLoggedIn } = useAuth();

  return isLoggedIn ? (
    <Navigate to="/home" replace />
  ) : (
    <Navigate to="/login" replace />
  );
};

function App() {
  return (
    <>
      <AuthProvider>
        <BrowserRouter
          future={{ v7_startTransition: true, v7_relativeSplatPath: true }}
        >
          <Routes>
            <Route path="/" element={<DefaultRoute />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/home" element={<Home />} />
            <Route path="/product" element={<Product />} />
            <Route path="/checkout/:id" element={<Checkout />} />
            <Route path="/payment/:id" element={<Payment />} />
            <Route path="/address" element={<Address />} />
            <Route path="/orderSuccess/:id" element={<OrderSuccess />} />
            <Route path="/profile" element={<Profile />} />
          </Routes>
        </BrowserRouter>
        <Toaster />
      </AuthProvider>
    </>
  );
}

export default App;
