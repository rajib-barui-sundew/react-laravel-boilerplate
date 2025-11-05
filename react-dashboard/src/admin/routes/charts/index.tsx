import { Route } from "react-router";
import LineChart from "../../pages/Charts/LineChart";
import BarChart from "../../pages/Charts/BarChart";

export const ChartRoutes = () => [
  <Route key="line-chart" path="line-chart" element={<LineChart />} />,
  <Route key="bar-chart" path="bar-chart" element={<BarChart />} />
];
