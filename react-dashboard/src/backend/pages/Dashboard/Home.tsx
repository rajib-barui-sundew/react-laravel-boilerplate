import PageMeta from "../../components/common/PageMeta";

export default function Home() {
  return (
    <>
      <PageMeta
        title="Dashboard | TailAdmin - React.js Admin Dashboard Template"
        description="This is the dashboard page for TailAdmin - React.js Tailwind CSS Admin Dashboard Template"
      />
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-800 dark:text-white/90">
            Welcome to Dashboard
          </h1>
          <p className="mt-2 text-gray-500 dark:text-gray-400">
            Your blank dashboard page
          </p>
        </div>
      </div>
    </>
  );
}
