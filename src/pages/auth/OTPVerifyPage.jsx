import FormFiled from "@components/FormFiled";
import OTPInput from "@components/FormInputs/OTPInput";
import { Button } from "@mui/material";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";

const OTPVerifyPage = () => {
  const { control } = useForm();

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
        <form className="flex flex-col gap-4">
          <FormFiled
            name="otp"
            label="Type your 6 digit security code"
            control={control}
            Component={OTPInput}
          />

          <Button variant="contained">Verify my account</Button>
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
