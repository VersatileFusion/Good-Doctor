import React, { useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { useRouter } from "next/router";

interface ProtectedRouteProps {
  children: React.ReactNode;
  roles?: string[];
}

export default function ProtectedRoute({
  children,
  roles,
}: ProtectedRouteProps) {
  const { user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!user) {
      router.replace("/login");
    } else if (roles && user.role && !roles.includes(user.role)) {
      router.replace("/"); // or show 403 page
    }
  }, [user, roles, router]);

  if (!user) return null;
  if (roles && user.role && !roles.includes(user.role)) return null;
  return <>{children}</>;
}
