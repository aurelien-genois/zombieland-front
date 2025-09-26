import { Navigate, Route, Routes } from "react-router";
import FooterFront from "../Footer/FooterFront";
import HeaderFront from "../Header/HeaderFront";
import HomePage from "../../pages/HomePage/HomePage";
import ActivitiesPage from "../../pages/ActivitiesPage/ActivitiesPage";
import ActivityPage from "../../pages/ActivityPage/ActivityPage";
import RegisterPage from "../../pages/RegisterPage/RegisterPage";
import RegisterConfirmationPage from "../../pages/RegisterConfirmationPage/RegisterConfirmationPage";
import LoginPage from "../../pages/LoginPage/LoginPage";
import AccountPage from "../../pages/AccountPage/AccountPage";
import CheckoutPage from "../../pages/CheckoutPage/CheckoutPage";
import CheckoutConfirmationPage from "../../pages/CheckoutConfirmationPage/CheckoutConfirmationPage";
import OrderPage from "../../pages/OrderPage/OrderPage";
import ContactPage from "../../pages/ContactPage/ContactPage";
import PrivacyPage from "../../pages/PrivacyPage/PrivacyPage";
import LegalPage from "../../pages/LegalPage/LegalPage";
import Main from "../Main/Main";

import { useAppSelector } from "../../hooks/redux";
import ResetPassword from "../../pages/ResetPassword/ResetPassword";

export default function LayoutFront() {
  const { isAuth } = useAppSelector((store) => store.userStore);
  

  return (
    <div className="bg-black-bg-main ">
      <HeaderFront />
      <Main>
        <Routes>
          {/* PUBLIC ROUTES */}
          <Route path="/" element={<HomePage />} />
          <Route path="/activities" element={<ActivitiesPage />} />
          <Route path="/activity/:slug" element={<ActivityPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route
            path="/register/confirmation"
            element={<RegisterConfirmationPage />}
          />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/privacy" element={<PrivacyPage />} />
          <Route path="/legal" element={<LegalPage />} />

          {/* MEMBER ROUTES */}
          <Route path="/account" element={ isAuth ? <AccountPage /> : <LoginPage />} />
          <Route path="/checkout" element={ isAuth ? <CheckoutPage /> : <LoginPage />} />
          <Route
            path="/checkout/confirmation"
            element={ isAuth ? <CheckoutConfirmationPage /> : <LoginPage />}
          />
          <Route path="/reset-password" element={ isAuth ? <ResetPassword /> : <LoginPage />} />
          <Route path="/order/:id" element={ isAuth ? <OrderPage /> : <LoginPage />} />
        </Routes>
      </Main>
      <FooterFront />
    </div>
  );
}
