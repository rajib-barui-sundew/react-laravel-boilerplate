import PageMeta from "../../../common/components/PageMeta";
import AdminAuthLayout from "../../layout/AdminAuthLayout";
import AdminSignInForm from "../../components/auth/AdminSignInForm";

export default function AdminLogin() {
  return (
    <>
      <PageMeta
        title="Admin Sign In | Dashboard"
        description="Admin sign in page"
      />
      <AdminAuthLayout>
        <AdminSignInForm isAdmin={true} />
      </AdminAuthLayout>
    </>
  );
}
