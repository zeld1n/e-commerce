'use client';

import { useEffect } from "react";
import { useAuth } from "@/app/context/auth-context";

export const SessionChecker = () => {
  const { setIsLoggedIn, setUserData } = useAuth();

  useEffect(() => {
    const checkSession = async () => {
      try {
        const res = await fetch("http://localhost:8080/users/check_session", {
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
  }, [setIsLoggedIn, setUserData]);

  return null; 
};
