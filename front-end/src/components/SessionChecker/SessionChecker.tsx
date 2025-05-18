'use client';

import { useEffect } from "react";
import { useAuth } from "@/app/context/auth-context";

export const SessionChecker = () => {
  const { setIsLoggedIn, setUserData } = useAuth();

  useEffect(() => {
    const checkSession = async () => {
      try {
        const res = await fetch("https://demo-deploy-gs0s.onrender.com/users/check_session", {
          credentials: "include",
        });

        if (res.ok) {
          const user = await res.json();
          setUserData(user);
          setIsLoggedIn(true);
        }
      } catch (err) {
        console.error("Error auth session:", err);
      }
    };

    checkSession();
  }, []);

  return null; 
};
