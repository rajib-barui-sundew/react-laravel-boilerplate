import { Route } from "react-router";
import BasicTables from "../../pages/Tables/BasicTables";

export const TableRoutes = () => [
  <Route key="basic-tables" path="basic-tables" element={<BasicTables />} />
];
