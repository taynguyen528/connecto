import { Outlet } from "react-router-dom";
import { useGetAuthUserQuery } from "@services/rootApi";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { saveUserInfo } from "@redux/slices/authSlice";
import Header from "@components/Header";
import Loading from "@components/Loading";
import SocketProvider from "@context/SocketProvider";

const ProtectedLayout = () => {
  const res = useGetAuthUserQuery();
  const dispatch = useDispatch();

  useEffect(() => {
    if (res.isSuccess) {
      dispatch(saveUserInfo(res.data));
    }
  }, [res.isSuccess, res.data, dispatch]);

  if (res.isLoading) {
    return <Loading />;
  }

  return (
    <SocketProvider>
      <div>
        <Header />
        <div className="bg-dark-200">
          <Outlet />
        </div>
      </div>
    </SocketProvider>
  );
};

export default ProtectedLayout;
