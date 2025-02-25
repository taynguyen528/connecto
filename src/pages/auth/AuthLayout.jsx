import { Suspense } from "react";
import { Outlet } from "react-router-dom";

const AuthLayout = () => {
  return (
    <>
      <div className="flex h-screen items-center justify-center bg-dark-200">
        <div className="h-fit w-[450px] rounded-sm bg-white px-8 py-10">
          <img src="/logo.png" alt="logo" className="mx-auto mb-6" />
          <Suspense fallback={<p>Loading...</p>}>
            <Outlet />
          </Suspense>
        </div>
      </div>
    </>
  );
};

export default AuthLayout;
