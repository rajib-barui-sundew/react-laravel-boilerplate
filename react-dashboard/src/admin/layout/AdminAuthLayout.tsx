import React from "react";
import ThemeTogglerTwo from "../../common/components/ThemeTogglerTwo";

interface AdminAuthLayoutProps {
  children: React.ReactNode;
}

export default function AdminAuthLayout({ children }: AdminAuthLayoutProps) {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="w-full max-w-md p-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg">
        {children}
      </div>
      <div className="fixed bottom-6 right-6">
        <ThemeTogglerTwo />
      </div>
    </div>
  );
}
