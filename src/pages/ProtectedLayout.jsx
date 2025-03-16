import { Outlet } from "react-router-dom";
import { useGetAuthUserQuery } from "@services/rootApi";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { saveUserInfo } from "@redux/slices/authSlice";
import Header from "@components/Header";

const ProtectedLayout = () => {
  const res = useGetAuthUserQuery();
  const dispatch = useDispatch();

  useEffect(() => {
    if (res.isSuccess) {
      dispatch(saveUserInfo(res.data));
    }
  }, [res.isSuccess, res.data, dispatch]);


  if (res.isLoading) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <Header />
      <Outlet />
    </div>
  );
};

export default ProtectedLayout;
