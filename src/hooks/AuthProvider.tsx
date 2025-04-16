"use client"

import { User } from "@supabase/supabase-js";
import React, { createContext, useContext } from "react";

const AuthContext = createContext<User | null>(null);

export const AuthProvider = ({ value, children }: { 
  value: User | null; 
  children: React.ReactNode; 
}) => (
  <AuthContext.Provider value={value}>
    {children}
  </AuthContext.Provider>
);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within a AuthProvider.");
  }
  return context;
}