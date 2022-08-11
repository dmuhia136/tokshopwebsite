import React from "react";
import { useLocation, Navigate } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { user } from "shared/recoil/user";
import Swal from "sweetalert2";

export const RequireAuth: React.FC<{ children: JSX.Element }> = ({
  children,
}) => {
  const { token, shopId, _id } = useRecoilValue<any>(user);

  let location = useLocation();
  if (token?.length < 1 || token === undefined) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
};

export const AuthStatus: React.FC<{ children: JSX.Element }> = ({
  children,
}) => {
  const userObj = useRecoilValue<any>(user);

  let location = useLocation();
  if (userObj?.token?.length > 1) {
    Swal.fire({
      icon: "info",
      title: "you are logged in😁",
      timer: 1500,
    });
    return <Navigate to="/" state={{ from: location }} replace />;
  }

  return children;
};
