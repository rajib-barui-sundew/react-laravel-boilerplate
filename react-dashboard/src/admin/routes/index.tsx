import { Route } from "react-router";
import AppLayout from '../layout/AppLayout';
import Home from '../pages/Dashboard/Home';
import Backup from '../pages/Dashboard/Backup';
import ProtectedRoute from '../components/auth/ProtectedRoute';
import { UiRoutes } from './ui';
import { ChartRoutes } from './charts';
import { OtherRoutes } from './other';
import { FormRoutes } from './forms';
import { TableRoutes } from './tables';

export const AdminRoutes = () => [
  <Route key="protected" element={<ProtectedRoute />}>
    <Route key="app" element={<AppLayout />}>
      <Route key="admin" path="admin">
        <Route key="dashboard" path="dashboard" element={<Home />} />
        <Route key="backup" path="backup" element={<Backup />} />
        ...OtherRoutes()
        ...FormRoutes()
        ...TableRoutes()
        ...UiRoutes()
        ...ChartRoutes()
      </Route>
    </Route>
  </Route>
];
