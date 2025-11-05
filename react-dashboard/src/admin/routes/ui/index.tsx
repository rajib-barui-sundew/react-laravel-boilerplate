import { Route } from "react-router";
import Videos from "../../pages/UiElements/Videos";
import Images from "../../pages/UiElements/Images";
import Alerts from "../../pages/UiElements/Alerts";
import Badges from "../../pages/UiElements/Badges";
import Avatars from "../../pages/UiElements/Avatars";
import Buttons from "../../pages/UiElements/Buttons";

export const UiRoutes = () => [
  <Route key="alerts" path="alerts" element={<Alerts />} />,
  <Route key="avatars" path="avatars" element={<Avatars />} />,
  <Route key="badge" path="badge" element={<Badges />} />,
  <Route key="buttons" path="buttons" element={<Buttons />} />,
  <Route key="images" path="images" element={<Images />} />,
  <Route key="videos" path="videos" element={<Videos />} />
];
