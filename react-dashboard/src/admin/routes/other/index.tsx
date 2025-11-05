import { Route } from "react-router";
import UserProfiles from "../../pages/UserProfiles";
import Calendar from "../../pages/Calendar";
import Blank from "../../pages/Blank";

export const OtherRoutes = () => [
  <Route key="profile" path="profile" element={<UserProfiles />} />,
  <Route key="calendar" path="calendar" element={<Calendar />} />,
  <Route key="blank" path="blank" element={<Blank />} />
];
