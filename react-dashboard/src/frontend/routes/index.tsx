import { Route } from "react-router";
import SignIn from "../pages/SignIn";
import SignUp from "../pages/SignUp";
import AdminLogin from "../../admin/pages/AuthPages/AdminLogin";
import AdminSignUp from "../../admin/pages/AuthPages/AdminSignUp";
import NotFound from "../../admin/pages/OtherPage/NotFound";

export const FrontendRoutes = () => [
  <Route key="signin" path="/signin" element={<SignIn />} />,
  <Route key="signup" path="/signup" element={<SignUp />} />,
  <Route key="admin-signin" path="/admin/signin" element={<AdminLogin />} />,
  <Route key="admin-signup" path="/admin/signup" element={<AdminSignUp />} />,
  <Route key="notfound" path="*" element={<NotFound />} />
];
