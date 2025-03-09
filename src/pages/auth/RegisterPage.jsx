import FormFiled from "@components/FormFiled";
import TextInput from "@components/FormInputs/TextInput";
import { Alert, Button } from "@mui/material";
import { openSnackbar } from "@redux/slices/snackbarSlice";
import { useRegisterMutation } from "@services/rootApi";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

const RegisterPage = () => {
  const navigate = useNavigate();
  const [register, { data = {}, error, isError, isSuccess }] =
    useRegisterMutation();
  const dispatch = useDispatch();

  function onSubmit(formData) {
    register(formData);
  }

  const formSchema = yup.object().shape({
    fullName: yup.string().required("Required"),
    email: yup
      .string()
      .matches(
        /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
        "Email is not valid",
      )
      .required(),
    password: yup.string().required("Required"),
  });

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(formSchema),
  });

  useEffect(() => {
    if (isSuccess) {
      dispatch(openSnackbar({ message: data.message }));
      navigate("/login");
    }
  }, [isSuccess, data.message, navigate, dispatch]);

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
      <form className="flex flex-col gap-4" onSubmit={handleSubmit(onSubmit)}>
        <FormFiled
          name="fullName"
          label="Full Name"
          control={control}
          Component={TextInput}
          placeholder={"Username"}
          error={errors["fullName"]}
        />
        <FormFiled
          name="email"
          label="Email"
          control={control}
          Component={TextInput}
          placeholder={"Email"}
          error={errors["email"]}
        />
        <FormFiled
          name="password"
          label="Password"
          control={control}
          Component={TextInput}
          type="password"
          placeholder={"Password"}
          error={errors["password"]}
        />
        <Button variant="contained" type="submit">
          Sign up
        </Button>
        {isError && <Alert severity="error">{error?.data?.message}</Alert>}
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
