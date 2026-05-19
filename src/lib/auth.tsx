import { createContext, useContext, useState, type ReactNode } from "react";

type AuthContext = {
  user: { email: string } | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<string | null>;
  signOut: () => void;
};

const ADMIN_EMAIL = import.meta.env.VITE_ADMIN_EMAIL as string;
const ADMIN_PASSWORD = import.meta.env.VITE_ADMIN_PASSWORD as string;

const AuthContext = createContext<AuthContext>({
  user: null,
  loading: false,
  signIn: async () => null,
  signOut: () => {},
});

function loadUser(): { email: string } | null {
  try {
    const stored = sessionStorage.getItem("hospiq_admin");
    return stored ? JSON.parse(stored) : null;
  } catch {
    return null;
  }
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<{ email: string } | null>(loadUser);
  const [loading] = useState(false);

  const signIn = async (email: string, password: string): Promise<string | null> => {
    if (email !== ADMIN_EMAIL || password !== ADMIN_PASSWORD) {
      return "Invalid email or password";
    }
    const u = { email };
    sessionStorage.setItem("hospiq_admin", JSON.stringify(u));
    setUser(u);
    return null;
  };

  const signOut = () => {
    sessionStorage.removeItem("hospiq_admin");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
