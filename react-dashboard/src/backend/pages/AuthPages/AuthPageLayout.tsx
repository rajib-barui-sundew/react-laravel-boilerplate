import React from "react";
import { Link } from "react-router";
import GridShape from "../../components/common/GridShape";
import ThemeTogglerTwo from "../../components/common/ThemeTogglerTwo";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="relative p-6 bg-white z-1 dark:bg-gray-900 sm:p-0">
      <div className="relative flex flex-col justify-center w-full h-screen lg:flex-row dark:bg-gray-900 sm:p-0">
        <div className="relative items-center hidden w-full h-full lg:w-1/2 lg:grid overflow-hidden">
          {/* Background Image */}
          <div className="absolute inset-0 z-0">
            <img
              src="/images/grid-image/auth-side.jpg"
              alt="Authentication background"
              className="object-cover w-full h-full"
            />
            {/* Optional overlay for better text readability */}
            <div className="absolute inset-0 bg-black/30"></div>
          </div>

          <div className="relative flex items-right justify-end z-10">
            {/* <!-- ===== Common Grid Shape Start ===== --> */}
            <GridShape />
            <div className="flex flex-col items-center max-w-xs">
              <Link to="/" className="block mb-4">
                {/* <img
                  width={231}
                  height={48}
                  src="/images/logo/auth-logo.svg"
                  alt="Logo"
                /> */}
                <h1 className="text-center text-gray-400 dark:text-white/60 font-semibold text-4xl">
                  Enlight Inside
                </h1>
              </Link>
              <p className="text-center text-gray-400 dark:text-white/60">
                If you light a lamp for somebody, it will also brighten your path.
              </p>
            </div>
          </div>
        </div>
        {children}
        <div className="fixed z-50 hidden bottom-6 right-6 sm:block">
          <ThemeTogglerTwo />
        </div>
      </div>
    </div>
  );
}
