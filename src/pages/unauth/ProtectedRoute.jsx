import { adminUserState } from "@/atom/adminUserState";
import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useRecoilValue } from "recoil";

export default function ProtectedRoute(props) {
  const user = useRecoilValue(adminUserState);
  if (!user) {
    return <Navigate to="/login" />;
  }
  return <Outlet {...props} />;
}
