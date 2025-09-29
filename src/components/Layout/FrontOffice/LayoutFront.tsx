import { Navigate, Route, Routes } from "react-router";
import FooterFront from "./Footer/FooterFront";
import HeaderFront from "@/components/Layout/FrontOffice/Header/HeaderFront";
import HomePage from "@/pages/FrontOffice/_HomePage/HomePage";
import ActivitiesPage from "@/pages/FrontOffice/ActivitiesPage/ActivitiesPage";
import ActivityPage from "@/pages/FrontOffice/ActivityPage/ActivityPage";
import RegisterPage from "@/pages/FrontOffice/RegisterPage/RegisterPage";
import RegisterConfirmationPage from "@/pages/FrontOffice/RegisterConfirmationPage/RegisterConfirmationPage";
import LoginPage from "@/pages/FrontOffice/LoginPage/LoginPage";
import AccountPage from "@/pages/FrontOffice/AccountPage/AccountPage";
import CheckoutPage from "@/pages/FrontOffice/CheckoutPage/CheckoutPage";
import CheckoutConfirmationPage from "@/pages/FrontOffice/CheckoutConfirmationPage/CheckoutConfirmationPage";
import OrderPage from "@/pages/FrontOffice/OrderPage/OrderPage";
import ContactPage from "@/pages/FrontOffice/ContactPage/ContactPage";
import PrivacyPage from "@/pages/FrontOffice/PrivacyPage/PrivacyPage";
import LegalPage from "@/pages/FrontOffice/LegalPage/LegalPage";
import Main from "./Main/Main";

import { useAppSelector } from "@/hooks/redux";
import ResetPassword from "@/pages/FrontOffice/ResetPassword/ResetPassword";

export default function LayoutFront() {
  const { isAuth } = useAppSelector((store) => store.userStore);

  return (
    <div className="bg-black-bg-main ">
      <HeaderFront />
      <Main>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/activities" element={<ActivitiesPage />} />
          <Route path="/activity/:slug" element={<ActivityPage />} />
          <Route
            path="/register"
            element={!isAuth ? <RegisterPage /> : <Navigate to="/" replace />}
          />
          <Route
            path="/register/confirmation"
            element={
              !isAuth ? (
                <RegisterConfirmationPage />
              ) : (
                <Navigate to="/" replace />
              )
            }
          />
          <Route
            path="/login"
            element={!isAuth ? <LoginPage /> : <Navigate to="/" replace />}
          />
          <Route
            path="/account"
            element={
              isAuth ? <AccountPage /> : <Navigate to="/login" replace />
            }
          />
          <Route path="/checkout" element={<CheckoutPage />} />
          <Route
            path="/checkout/confirmation/:id"
            element={<CheckoutConfirmationPage />}
          />
          <Route 
            path="/order/:id"
            element={
                isAuth ? <OrderPage /> : <Navigate to="/login" replace />}
          />
          <Route path="/reset-password" element={<ResetPassword />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/privacy" element={<PrivacyPage />} />
          <Route path="/legal" element={<LegalPage />} />
        </Routes>
      </Main>
      <FooterFront />
    </div>
  );
}
