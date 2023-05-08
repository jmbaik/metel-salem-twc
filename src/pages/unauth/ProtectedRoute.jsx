import { adminUserState } from "@/atom/adminUserState";
import React from "react";
import { Navigate } from "react-router-dom";
import { useRecoilValue } from "recoil";

export default function ProtectedRoute({ children }) {
  const user = useRecoilValue(adminUserState);
  if (!user) {
    return <Navigate to="/login" />;
  }
  return children;
}
