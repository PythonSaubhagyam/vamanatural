import { createBrowserRouter } from "react-router-dom";
import { Navigate } from "react-router-dom";
import ErrorPage from "../pages/ErrorPage";
import Home from "../pages/Home";
import Login from "../pages/Login";
import SignUp from "../pages/SignUp";
import ResetPassword from "../pages/ResetPassword";
import ResetPasswordForm from "../pages/forms/ResetPasswordForm";
import ChangePassword from "../pages/ChangePassword";
import Shop from "../pages/Shop";
import ProductDetails from "../pages/ProductDetails";
import Cart from "../pages/Cart";
import Wishlist from "../pages/Wishlist";
import Checkout from "../pages/Checkout";
import SubscriptionPlans from "../pages/SubscriptionPlans";
import SubscriptionPayment from "../pages/SubscriptionPayment";
import SurveyForm from "../pages/SurveyForm";
import StoreLocator from "../pages/StoreLocator";
import InspireSupport from "../pages/InspireSupport";
import FAQS from "../pages/FAQS";
import Franchise from "../pages/Franchise";
import BlogList from "../pages/BlogList";
import Blog from "../pages/Blog";
import TermsAndConditions from "../pages/TermsAndConditions";
import ShippingPolicy from "../pages/ShippingPolicy";
import ReturnRefundPolicy from "../pages/ReturnRefundPolicy";
import Testimonials from "../pages/Testimonials";
import ContactUs from "../pages/ContactUs";
import ConsultOurVaidya from "../pages/ConsultOurVaidya";
import OrganicLiving from "../pages/OrganicLiving";
import CustomerProfile from "../pages/CustomerProfile";
import AboutUs from "../pages/AboutUs";
import Appreciation from "../pages/Appreciation";
import Resources from "../pages/Resources";
import UpdateProfileForm from "../pages/forms/UpdateProfileForm";
import CreateAddress from "../pages/forms/CreateAddress";
import CustomerOrderDetails from "../pages/CustomerOrderDetails";
import BookAppointment from "../pages/BookAppointment";
import Reviews from "../pages/Reviews";
import GiftVoucher from "../pages/GiftVoucher";
import LoginSystem from "../pages/LoginSystem";
import Bussiness from "../pages/Bussiness";
import Export from "../pages/Export";

const Router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/shop",
    element: <Shop />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/products/:productId",
    element: <ProductDetails />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/products/:productId/reviews",
    element: <Reviews />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/cart",
    element: <Cart />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/wishlist",
    element: <Wishlist />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/checkout",
    element: <Checkout />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/survey/:surveyId",
    element: <SurveyForm />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/store-locator",
    element: <StoreLocator />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/inspire-and-support",
    element: <InspireSupport />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/gift-voucher",
    element: <GiftVoucher />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/franchise",
    element: <Franchise />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/organic-living",
    element: <OrganicLiving />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/about-us",
    element: <AboutUs />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/blogs",
    element: <BlogList />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/blogs/:blogId/",
    element: <Blog />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/contact-us",
    element: <ContactUs />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/exports",
    element: <Export />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/bussiness",
    element: <Bussiness />,
    errorElement: <ErrorPage />,
  },

  {
    path: "/subscription-plans",
    element: <SubscriptionPlans />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/subscription-payment",
    element: <SubscriptionPayment />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/consult-our-vaidya",
    element: <ConsultOurVaidya />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/consult-our-vaidya/schedule-appointment",
    element: <BookAppointment />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/appreciation",
    element: <Appreciation />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/resources",
    element: <Resources />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/return-and-refund-policy",
    element: <ReturnRefundPolicy />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/shipping-policy",
    element: <ShippingPolicy />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/terms-and-conditions",
    element: <TermsAndConditions />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/testimonials",
    element: <Testimonials />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/faq",
    element: <FAQS />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/signup",
    element: <SignUp />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/reset-password",
    element: <ResetPassword />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/login",
    element: <Login />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/update-password",
    element: <ChangePassword />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/profile",
    element: <CustomerProfile />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/profile/edit/",
    element: <UpdateProfileForm />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/profile/addresses/add",
    element: <CreateAddress />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/profile/addresses/:addressId/edit/",
    element: <CreateAddress />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/orders/:orderId",
    element: <CustomerOrderDetails />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/login-system",
    element: <LoginSystem />,
    errorElement: <ErrorPage />,
  },

  {
    path: "/shop",
    element: <Shop />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/products/:productId",
    element: <ProductDetails />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/products/:productId/reviews",
    element: <Reviews />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/cart",
    element: <Cart />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/wishlist",
    element: <Wishlist />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/checkout",
    element: <Checkout />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/survey/:surveyId",
    element: <SurveyForm />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/store-locator",
    element: <StoreLocator />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/inspire-and-support",
    element: <InspireSupport />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/gift-voucher",
    element: <GiftVoucher />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/franchise",
    element: <Franchise />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/organic-living",
    element: <OrganicLiving />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/about-us",
    element: <AboutUs />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/blogs",
    element: <BlogList />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/blogs/:blogId/",
    element: <Blog />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/contact-us",
    element: <ContactUs />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/subscription-plans",
    element: <SubscriptionPlans />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/subscription-payment",
    element: <SubscriptionPayment />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/consult-our-vaidya",
    element: <ConsultOurVaidya />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/consult-our-vaidya/schedule-appointment",
    element: <BookAppointment />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/appreciation",
    element: <Appreciation />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/resources",
    element: <Resources />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/return-and-refund-policy",
    element: <ReturnRefundPolicy />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/shipping-policy",
    element: <ShippingPolicy />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/terms-and-conditions",
    element: <TermsAndConditions />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/testimonials",
    element: <Testimonials />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/faq",
    element: <FAQS />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/signup",
    element: <SignUp />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/reset-password",
    element: <ResetPassword />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/reset-password/:resetUUID",
    element: <ResetPasswordForm />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/login",
    element: <Login />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/update-password",
    element: <ChangePassword />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/profile",
    element: <CustomerProfile />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/profile/edit/",
    element: <UpdateProfileForm />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/profile/addresses/add",
    element: <CreateAddress />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/profile/addresses/:addressId/edit/",
    element: <CreateAddress />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/orders/:orderId",
    element: <CustomerOrderDetails />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/login-system",
    element: <LoginSystem />,
    errorElement: <ErrorPage />,
  },

  {
    path: "page-not-found",
    element: <ErrorPage />,
  },
  {
    path: "*",
    element: <Navigate to="/page-not-found" replace />,
  },
]);

export default Router;
