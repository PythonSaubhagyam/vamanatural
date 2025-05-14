import { createBrowserRouter, Navigate } from "react-router-dom";
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
import StoreLocator from "../pages/StoreLocator";
import InspireSupport from "../pages/InspireSupport";
import FAQS from "../pages/FAQS";
import BlogList from "../pages/BlogList";
import Blog from "../pages/Blog";
import TermsAndConditions from "../pages/TermsAndConditions";
import ShippingPolicy from "../pages/ShippingPolicy";
import ReturnRefundPolicy from "../pages/ReturnRefundPolicy";
import ContactUs from "../pages/ContactUs";
import ConsultOurVaidya from "../pages/ConsultOurVaidya";
import CustomerProfile from "../pages/CustomerProfile";
import AboutUs from "../pages/AboutUs";
import UpdateProfileForm from "../pages/forms/UpdateProfileForm";
import CreateAddress from "../pages/forms/CreateAddress";
import CustomerOrderDetails from "../pages/CustomerOrderDetails";
import BookAppointment from "../pages/BookAppointment";
import Reviews from "../pages/Reviews";
import GiftVoucher from "../pages/GiftVoucher";
import PrivacyPolicy from "../pages/PrivacyPolicy";
import Event from "../pages/Event";
import Bussiness from "../pages/Bussiness";
import Export from "../pages/Export";
import OrganicLiving from "../pages/OrganicLiving";
import Franchise from "../pages/Franchise";


const Router = createBrowserRouter([
  { path: "/", element: <Home />, errorElement: <ErrorPage /> },
  { path: "/shop", element: <Shop />, errorElement: <ErrorPage /> },
  { path: "/products/:productId/:productName", element: <ProductDetails />, errorElement: <ErrorPage /> },
  { path: "/products/:productId/reviews/:productName", element: <Reviews />, errorElement: <ErrorPage /> },
  { path: "/privacy-policy", element: <PrivacyPolicy />, errorElement: <ErrorPage /> },
  { path: "/cart", element: <Cart />, errorElement: <ErrorPage /> },
  { path: "/wishlist", element: <Wishlist />, errorElement: <ErrorPage /> },
  { path: "/checkout", element: <Checkout />, errorElement: <ErrorPage /> },
  { path: "/store-locator", element: <StoreLocator />, errorElement: <ErrorPage /> },
  { path: "/inspire-and-support", element: <InspireSupport />, errorElement: <ErrorPage /> },
  { path: "/gift-voucher", element: <GiftVoucher />, errorElement: <ErrorPage /> },
  { path: "/about-us", element: <AboutUs />, errorElement: <ErrorPage /> },
  { path: "/blogs", element: <BlogList />, errorElement: <ErrorPage /> },
  { path: "/event", element: <Event />, errorElement: <ErrorPage /> },
  { path: "/bussiness", element: <Bussiness />, errorElement: <ErrorPage /> },
  { path: "/franchise", element: <Franchise />, errorElement: <ErrorPage /> },
  { path: "/exports", element: <Export />, errorElement: <ErrorPage /> },
  { path: "/organic-living", element: <OrganicLiving />, errorElement: <ErrorPage /> },
  { path: "/blogs/:blogId/:blogName", element: <Blog />, errorElement: <ErrorPage /> },
  { path: "/contact-us", element: <ContactUs />, errorElement: <ErrorPage /> },
  { path: "/subscription-plans", element: <SubscriptionPlans />, errorElement: <ErrorPage /> },
  { path: "/subscription-payment", element: <SubscriptionPayment />, errorElement: <ErrorPage /> },
  { path: "/consult-our-vaidya", element: <ConsultOurVaidya />, errorElement: <ErrorPage /> },
  { path: "/consult-our-vaidya/schedule-appointment", element: <BookAppointment />, errorElement: <ErrorPage /> },
  { path: "/return-and-refund-policy", element: <ReturnRefundPolicy />, errorElement: <ErrorPage /> },
  { path: "/shipping-policy", element: <ShippingPolicy />, errorElement: <ErrorPage /> },
  { path: "/terms-and-conditions", element: <TermsAndConditions />, errorElement: <ErrorPage /> },
  { path: "/faq", element: <FAQS />, errorElement: <ErrorPage /> },
  { path: "/signup", element: <SignUp />, errorElement: <ErrorPage /> },
  { path: "/reset-password", element: <ResetPassword />, errorElement: <ErrorPage /> },
  { path: "/reset-password/:resetUUID", element: <ResetPasswordForm />, errorElement: <ErrorPage /> },
  { path: "/login", element: <Login />, errorElement: <ErrorPage /> },
  { path: "/update-password", element: <ChangePassword />, errorElement: <ErrorPage /> },
  { path: "/profile", element: <CustomerProfile />, errorElement: <ErrorPage /> },
  { path: "/profile/edit", element: <UpdateProfileForm />, errorElement: <ErrorPage /> },
  { path: "/profile/addresses/add", element: <CreateAddress />, errorElement: <ErrorPage /> },
  { path: "/profile/addresses/:addressId/edit", element: <CreateAddress />, errorElement: <ErrorPage /> },
  { path: "/orders/:orderId", element: <CustomerOrderDetails />, errorElement: <ErrorPage /> },
  { path: "/page-not-found", element: <ErrorPage /> },
  { path: "*", element: <Navigate to="/page-not-found" replace /> },
]);

export default Router;
