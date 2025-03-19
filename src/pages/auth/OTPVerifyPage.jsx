import FormFiled from "@components/FormFiled";
import OTPInput from "@components/FormInputs/OTPInput";
import { Button, CircularProgress } from "@mui/material";
import { login } from "@redux/slices/authSlice";
import { openSnackbar } from "@redux/slices/snackbarSlice";
import { useVerifyOTPMutation } from "@services/rootApi";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";

const OTPVerifyPage = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [verifyOTP, { data, isLoading, isError, error, isSuccess }] =
    useVerifyOTPMutation();

  const { control, handleSubmit } = useForm({
    defaultValues: {
      otp: "",
    },
  });

  const onSubmit = (formData) => {
    verifyOTP({ otp: formData.otp, email: location?.state?.email });
  };

  useEffect(() => {
    if (isError) {
      dispatch(openSnackbar({ type: "error", message: error?.data?.message }));
    }

    if (isSuccess) {
      dispatch(login(data));
      navigate("/");
    }
  }, [isError, error, dispatch, data?.message, isSuccess, navigate, data]);

  return (
    <div>
      <div className="mb-4 flex flex-col items-start text-dark-100">
        <p className="mb-3 text-center text-2xl font-bold">
          Two-Step Verification
        </p>
        <p className="mb-2 opacity-80">
          We have sent a verification code to your email. Enter the code from
          your email in the box below.
        </p>
        {/* <p className="opacity-90">******9763</p> */}
      </div>
      <div className="flex flex-col items-center text-dark-100">
        <form className="flex flex-col gap-4" onSubmit={handleSubmit(onSubmit)}>
          <FormFiled
            name="otp"
            label="Type your 6 digit security code"
            control={control}
            Component={OTPInput}
          />

          <Button variant="contained" type="submit">
            {isLoading && <CircularProgress size={15} className="ml-1" />}
            Verify my account
          </Button>
        </form>
        <p className="mt-4">
          Didn&apos;t get the code?
          <Link to={"/login"} className="text-blue-500">
            {" "}
            Resend
          </Link>
        </p>
      </div>
    </div>
  );
};

export default OTPVerifyPage;
