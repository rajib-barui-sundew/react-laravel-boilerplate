import PageMeta from "../../components/common/PageMeta";
import AuthLayout from "./AuthPageLayout";
import SignInForm from "../../components/auth/SignInForm";

export default function AdminSignIn() {
  return (
    <>
      <PageMeta
        title="Admin Sign In | Dashboard"
        description="Admin sign in page for the dashboard"
      />
      <AuthLayout>
        <SignInForm isAdmin={true} />
      </AuthLayout>
    </>
  );
}