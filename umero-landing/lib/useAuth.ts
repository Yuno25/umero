"use client";

import React, { createContext, useContext, useEffect, useState } from "react";

type UserType = {
  id: string;
  email: string;
  username?: string;
  lastAuthAction?: string;
};

type AuthContextType = {
  user: UserType | null;
  loading: boolean;
  refreshAuth: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<UserType | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchUser = async () => {
    try {
      const res = await fetch("/api/auth/me", {
        cache: "no-store", //VERY IMPORTANT
      });
      const data = await res.json();
      setUser(data?.user || null);
    } catch {
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  return React.createElement(
    AuthContext.Provider,
    {
      value: {
        user,
        loading,
        refreshAuth: fetchUser,
      },
    },
    children,
  );
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used inside AuthProvider");
  }

  return context;
}
