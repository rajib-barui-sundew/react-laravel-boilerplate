import PageMeta from "../../../common/components/PageMeta";
import AdminAuthLayout from "../../layout/AdminAuthLayout";
import SignUpForm from "../../components/auth/SignUpForm";

export default function AdminSignUp() {
  return (
    <>
      <PageMeta
        title="Admin Sign Up | Dashboard"
        description="Admin sign up page"
      />
      <AdminAuthLayout>
        <SignUpForm />
      </AdminAuthLayout>
    </>
  );
}
