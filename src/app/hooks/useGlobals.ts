import { createContext, useContext } from "react";
import { Member } from "../../lib/types/member";

// Global context turi — authMember va uni yangilash funksiyasi
interface GlobalInterface {
  authMember: Member | null;
  setAuthMember: (member: Member | null) => void;
  orderBuilder: Date;
  setOrderBuilder: (input: Date) => void;
}

// Context yaratish — boshlang'ich qiymat undefined
export const GlobalContext = createContext<GlobalInterface | undefined>(
  undefined
);

// Custom hook — istalgan komponentda GlobalContext ga kirish uchun
export const useGlobals = (): GlobalInterface => {
  const context = useContext(GlobalContext);

  // Agar GlobalProvider ichida bo'lmasa xato chiqaradi
  if (context === undefined) {
    throw new Error("useGlobals must be used within GlobalProvider");
  }

  return context;
};