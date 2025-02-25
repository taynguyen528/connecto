import FormFiled from "@components/FormFiled";
import TextInput from "@components/FormInputs/TextInput";
import { Button } from "@mui/material";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";

const LoginPage = () => {
  const { control } = useForm();

  return (
    <div>
      <div className="mb-5 flex flex-col items-start text-dark-100">
        <p className="mb-2 text-2xl font-bold">Welcome to WeConnect! 👋</p>
        <p className="text-[14px] opacity-90">
          Please sign in to your account and start the adventure
        </p>
      </div>
      <form className="flex flex-col gap-4">
        <FormFiled
          name="email"
          label="Email or Username"
          control={control}
          Component={TextInput}
          placeholder={"Username or email"}
        />
        <FormFiled
          name="password"
          label={
            <div className="flex justify-between text-dark-100">
              <p>Password</p>
              <p className="cursor-pointer text-blue-500">Forgot Password?</p>
            </div>
          }
          control={control}
          Component={TextInput}
          type="password"
          placeholder={"Password"}
        />
        <Button variant="contained">Sign in</Button>
      </form>
      <p className="mt-4 text-center">
        New on out platform?{" "}
        <Link to={"/register"} className="text-blue-500">
          Create an account
        </Link>
      </p>
    </div>
  );
};

export default LoginPage;
