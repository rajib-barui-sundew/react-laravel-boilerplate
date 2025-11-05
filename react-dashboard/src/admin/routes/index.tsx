import { Route } from "react-router";
import AppLayout from '../layout/AppLayout';
import Home from '../pages/Dashboard/Home';
import Backup from '../pages/Dashboard/Backup';
import ProtectedRoute from '../components/auth/ProtectedRoute';
import UserProfiles from '../pages/UserProfiles';
import Calendar from '../pages/Calendar';
import Blank from '../pages/Blank';
import FormElements from '../pages/Forms/FormElements';
import BasicTables from '../pages/Tables/BasicTables';
import Videos from '../pages/UiElements/Videos';
import Images from '../pages/UiElements/Images';
import Alerts from '../pages/UiElements/Alerts';
import Badges from '../pages/UiElements/Badges';
import Avatars from '../pages/UiElements/Avatars';
import Buttons from '../pages/UiElements/Buttons';
import LineChart from '../pages/Charts/LineChart';
import BarChart from '../pages/Charts/BarChart';
import SignUp from '../pages/AuthPages/AdminSignUp';
import UserLogin from '../pages/AuthPages/AdminLogin';

export const AdminRoutes = () => [
  <Route key="admin-signin" path="/admin/signin" element={<UserLogin />} />,
  <Route key="admin-signup" path="/admin/signup" element={<SignUp />} />,
  <Route key="protected" element={<ProtectedRoute />}>
    <Route key="app" element={<AppLayout />}>
      <Route key="admin" path="admin">
        <Route key="dashboard" path="dashboard" element={<Home />} />
        <Route key="backup" path="backup" element={<Backup />} />
        <Route key="profile" path="profile" element={<UserProfiles />} />
        <Route key="calendar" path="calendar" element={<Calendar />} />
        <Route key="blank" path="blank" element={<Blank />} />
        <Route key="form-elements" path="form-elements" element={<FormElements />} />
        <Route key="basic-tables" path="basic-tables" element={<BasicTables />} />
        <Route key="alerts" path="alerts" element={<Alerts />} />
        <Route key="avatars" path="avatars" element={<Avatars />} />
        <Route key="badge" path="badge" element={<Badges />} />
        <Route key="buttons" path="buttons" element={<Buttons />} />
        <Route key="images" path="images" element={<Images />} />
        <Route key="videos" path="videos" element={<Videos />} />
        <Route key="line-chart" path="line-chart" element={<LineChart />} />
        <Route key="bar-chart" path="bar-chart" element={<BarChart />} />
      </Route>
    </Route>
  </Route>
];
