import { logOut as logOutAction } from "@redux/slices/authSlice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

export const useLogout = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const logOut = () => {
    dispatch(logOutAction());
    navigate("/login", { replace: true });
  };

  return { logOut };
};
