import FormFiled from "@components/FormFiled";
import TextInput from "@components/FormInputs/TextInput";
import { Button } from "@mui/material";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";

const RegisterPage = () => {
  const { control } = useForm();
  return (
    <div>
      <div className="mb-3 flex flex-col items-start text-dark-100">
        <p className="mb-1 text-center text-2xl font-bold">
          Adventure starts here 🚀
        </p>
        <p className="mb-2 opacity-80">
          Make your app management easy and fun!
        </p>
      </div>
      <form className="flex flex-col gap-4">
        <FormFiled
          name="fullname"
          label="Full Name"
          control={control}
          Component={TextInput}
          placeholder={"Username"}
        />
        <FormFiled
          name="email"
          label="Email"
          control={control}
          Component={TextInput}
          placeholder={"Email"}
        />
        <FormFiled
          name="password"
          label="Password"
          control={control}
          Component={TextInput}
          type="password"
          placeholder={"Password"}
        />
        <Button variant="contained">Sign up</Button>
      </form>
      <p className="mt-4 text-center">
        Already have an account?{" "}
        <Link to={"/login"} className="text-blue-500">
          Sign in instead
        </Link>
      </p>
    </div>
  );
};

export default RegisterPage;
