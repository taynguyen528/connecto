import FormFiled from "@components/FormFiled";
import TextInput from "@components/FormInputs/TextInput";
import { yupResolver } from "@hookform/resolvers/yup";
import { Button, CircularProgress } from "@mui/material";
import { openSnackbar } from "@redux/slices/snackbarSlice";
import { useLoginMutation } from "@services/rootApi";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import * as yup from "yup";

const LoginPage = () => {
  const [login, { data = {}, isLoading, error, isError, isSuccess }] =
    useLoginMutation();
  const formSchema = yup.object().shape({
    email: yup
      .string()
      .matches(
        /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
        "Email is not valid",
      )
      .required(),
    password: yup.string().required("Required"),
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {
    control,
    formState: { errors },
    handleSubmit,
    getValues,
  } = useForm({
    resolver: yupResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  function onSubmit(formData) {
    login(formData);
  }

  useEffect(() => {
    if (isError) {
      dispatch(openSnackbar({ type: "error", message: error?.data?.message }));
    }

    if (isSuccess) {
      dispatch(openSnackbar({ message: data.message }));
      navigate("/verify-otp", {
        state: {
          email: getValues("email"),
        },
      });
    }
  }, [isError, error, dispatch, data.message, isSuccess, navigate, getValues]);

  return (
    <div>
      <div className="mb-5 flex flex-col items-start text-dark-100">
        <p className="mb-2 text-2xl font-bold">Welcome to WeConnect! 👋</p>
        <p className="text-[14px] opacity-90">
          Please sign in to your account and start the adventure
        </p>
      </div>
      <form className="flex flex-col gap-4" onSubmit={handleSubmit(onSubmit)}>
        <FormFiled
          name="email"
          label="Email or Username"
          control={control}
          Component={TextInput}
          placeholder={"Username or email"}
          error={errors["email"]}
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
          error={errors["password"]}
        />
        <Button variant="contained" type="submit">
          Sign in
          {isLoading && <CircularProgress size={15} className="ml-1" />}
        </Button>
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
