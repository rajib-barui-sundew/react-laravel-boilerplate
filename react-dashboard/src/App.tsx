import { BrowserRouter as Router, Routes, Route } from "react-router";
import SignIn from "./backend/pages/AuthPages/SignIn";
import SignUp from "./backend/pages/AuthPages/SignUp";
import AdminLogin from "./frontend/pages/AdminLogin";
import NotFound from "./backend/pages/OtherPage/NotFound";
import UserProfiles from "./backend/pages/UserProfiles";
import Videos from "./backend/pages/UiElements/Videos";
import Images from "./backend/pages/UiElements/Images";
import Alerts from "./backend/pages/UiElements/Alerts";
import Badges from "./backend/pages/UiElements/Badges";
import Avatars from "./backend/pages/UiElements/Avatars";
import Buttons from "./backend/pages/UiElements/Buttons";
import LineChart from "./backend/pages/Charts/LineChart";
import BarChart from "./backend/pages/Charts/BarChart";
import Calendar from "./backend/pages/Calendar";
import BasicTables from "./backend/pages/Tables/BasicTables";
import FormElements from "./backend/pages/Forms/FormElements";
import Blank from "./backend/pages/Blank";
import AppLayout from './backend/layout/AppLayout';
import { ScrollToTop } from './backend/components/common/ScrollToTop';
import Home from './backend/pages/Dashboard/Home';
import Backup from './backend/pages/Dashboard/Backup';
import ProtectedRoute from './backend/components/auth/ProtectedRoute';

export default function App() {
  return (
    <>
      <Router>
        <ScrollToTop />
        <Routes>
          {/* Protected Dashboard Layout */}
          <Route element={<ProtectedRoute />}>
            <Route element={<AppLayout />}>
              <Route index path="/" element={<Home />} />
              <Route path="/backup" element={<Backup />} />

              {/* Others Page */}
              <Route path="/profile" element={<UserProfiles />} />
              <Route path="/calendar" element={<Calendar />} />
              <Route path="/blank" element={<Blank />} />

              {/* Forms */}
              <Route path="/form-elements" element={<FormElements />} />

              {/* Tables */}
              <Route path="/basic-tables" element={<BasicTables />} />

              {/* Ui Elements */}
              <Route path="/alerts" element={<Alerts />} />
              <Route path="/avatars" element={<Avatars />} />
              <Route path="/badge" element={<Badges />} />
              <Route path="/buttons" element={<Buttons />} />
              <Route path="/images" element={<Images />} />
              <Route path="/videos" element={<Videos />} />

              {/* Charts */}
              <Route path="/line-chart" element={<LineChart />} />
              <Route path="/bar-chart" element={<BarChart />} />
            </Route>
          </Route>

          {/* Admin Auth Layout (frontend basic page) */}
          <Route path="/admin/signin" element={<AdminLogin />} />
          <Route path="/admin/signup" element={<SignUp />} />
          {/* User Auth Routes */}
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
          {/* Fallback Route */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </>
  );
}
