import { Suspense } from "react";
import { Outlet } from "react-router-dom";
// Supports weights 100-900
import "@fontsource-variable/public-sans";
import { Alert, Snackbar } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { closeSnackbar } from "@redux/slices/snackbarSlice";

const RootLayout = () => {
  const { open, type, message } = useSelector((state) => {
    return state.snackbar;
  });

  const dispatch = useDispatch();

  return (
    <div className="text-dark-100">
      <Suspense fallback={<p>Loading...</p>}>
        <Outlet />
      </Suspense>

      <Snackbar
        open={open}
        autoHideDuration={4000}
        onClose={() => {
          dispatch(closeSnackbar());
        }}
      >
        <Alert severity={type} variant="filled" sx={{ width: "100%" }}>
          {message}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default RootLayout;
