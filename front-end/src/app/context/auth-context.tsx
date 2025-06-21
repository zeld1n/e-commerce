'use client';

import React, { createContext, useContext, useState, ReactNode } from 'react';

type UserData = {
    username: string;
    firstName: string;
    lastName: string;
    email: string;
    addressStreet: string;
    addressZipCode: string;
    addressCity: string;
    addressCountry: string;
    imageUrl?: string;
    lastSeen: string;
    role: string;
  };
  
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
      await fetch("http://localhost:8080/users/logout", {
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
