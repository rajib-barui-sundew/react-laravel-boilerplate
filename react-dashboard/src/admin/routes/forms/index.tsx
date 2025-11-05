import { Route } from "react-router";
import FormElements from "../../pages/Forms/FormElements";

export const FormRoutes = () => [
  <Route key="form-elements" path="form-elements" element={<FormElements />} />
];
