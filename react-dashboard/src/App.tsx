import { BrowserRouter as Router, Routes } from "react-router";
import { ScrollToTop } from './common/components/ScrollToTop';
import { AdminRoutes } from './admin/routes';
import { FrontendRoutes } from './frontend/routes';

export default function App() {
  return (
    <>
      <Router>
        <ScrollToTop />
        <Routes>
          {AdminRoutes()}
          {FrontendRoutes()}
        </Routes>
      </Router>
    </>
  );
}
