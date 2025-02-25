import { Suspense } from "react";
import { Outlet } from "react-router-dom";
// Supports weights 100-900
import "@fontsource-variable/public-sans";

const RootLayout = () => {
    return (
        <div>
            <Suspense fallback={<p>Loading...</p>}>
                <Outlet />
            </Suspense>
        </div>
    );
};

export default RootLayout;
