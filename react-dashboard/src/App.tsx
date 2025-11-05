import { BrowserRouter as Router, Routes, Route } from "react-router";
import SignIn from "./admin/pages/AuthPages/SignIn";
import SignUp from "./admin/pages/AuthPages/SignUp";
import UserLogin from "./frontend/pages/auth/UserLogin";
import NotFound from "./admin/pages/OtherPage/NotFound";
import UserProfiles from "./admin/pages/UserProfiles";
import Videos from "./admin/pages/UiElements/Videos";
import Images from "./admin/pages/UiElements/Images";
import Alerts from "./admin/pages/UiElements/Alerts";
import Badges from "./admin/pages/UiElements/Badges";
import Avatars from "./admin/pages/UiElements/Avatars";
import Buttons from "./admin/pages/UiElements/Buttons";
import LineChart from "./admin/pages/Charts/LineChart";
import BarChart from "./admin/pages/Charts/BarChart";
import Calendar from "./admin/pages/Calendar";
import BasicTables from "./admin/pages/Tables/BasicTables";
import FormElements from "./admin/pages/Forms/FormElements";
import Blank from "./admin/pages/Blank";
import AppLayout from './admin/layout/AppLayout';
import { ScrollToTop } from './admin/components/common/ScrollToTop';
import Home from './admin/pages/Dashboard/Home';
import Backup from './admin/pages/Dashboard/Backup';
import ProtectedRoute from './admin/components/auth/ProtectedRoute';

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
          <Route path="/admin/signin" element={<UserLogin />} />
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
