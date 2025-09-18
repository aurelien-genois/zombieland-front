import { Route, Routes } from "react-router";
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

export default function LayoutFront() {
  return (
    <>
      <HeaderFront />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/activities" element={<ActivitiesPage />} />
          <Route path="/activity/:slug" element={<ActivityPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/register/confirmation" element={<RegisterConfirmationPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/account" element={<AccountPage />} />
          <Route path="/checkout" element={<CheckoutPage />} />
          <Route path="/checkout/confirmation" element={<CheckoutConfirmationPage />} />
          <Route path="/order/:id" element={<OrderPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/privacy" element={<PrivacyPage />} />
          <Route path="/legal" element={<LegalPage />} />
        </Routes>
      <FooterFront />
    </>
  )
}