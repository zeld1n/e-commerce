'use client';

import React, { createContext, useContext, useState, ReactNode } from 'react';
import "@/types/user"

type AuthContextType = {
  isLoggedIn: boolean;
  setIsLoggedIn: (value: boolean) => void;
  userData: UserData | null;
  setUserData: (userData: UserData | null) => void;
  logout: () => void; 
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [userData, setUserData] = useState<UserData | null>(null);

  const logout = async () => {
    try {
      await fetch("https://demo-deploy-gs0s.onrender.com/users/logout", {
        method: "POST",
        credentials: "include",
      });
    } catch (error) {
      console.error("Logout failed:", error);
    }

    setIsLoggedIn(false);
    setUserData(null);
    localStorage.removeItem("cart"); // Очистка корзины (если нужно)
  };

  return (
    <AuthContext.Provider
      value={{ isLoggedIn, setIsLoggedIn, userData, setUserData, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};


export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
