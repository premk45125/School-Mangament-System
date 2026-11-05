/**
 * AuthContext — lightweight role + session store.
 *
 * Role is kept in React state (and optionally in localStorage when
 * "Remember me" is checked) so every page can read it without prop-drilling.
 * Supabase handles the real auth session; we layer the portal role on top.
 */
import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import { supabase } from "@/integrations/supabase/client";

export type PortalRole =
  | "accountant"
  | "admin"
  | "teacher"
  | "student-parent"
  | "head";

export const ROLE_LABELS: Record<PortalRole, string> = {
  accountant: "Accountant",
  admin: "Admin",
  teacher: "Teacher",
  "student-parent": "Student / Parent",
  head: "Head / Management",
};

const STORAGE_KEY = "gps_portal_role";

interface AuthState {
  /** Supabase user email (null when signed out) */
  email: string | null;
  /** Selected portal role (null when signed out) */
  role: PortalRole | null;
  /** Dashboard route for the current role */
  dashboardPath: string | null;
}

interface AuthContextValue extends AuthState {
  /** Persist role after a successful Supabase sign-in */
  setRole: (role: PortalRole, remember: boolean) => void;
  /** Sign out from Supabase + clear role */
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextValue | null>(null);

function roleToDashboardPath(role: PortalRole): string {
  const map: Record<PortalRole, string> = {
    accountant: "/dashboard/accountant",
    admin: "/dashboard/admin",
    teacher: "/dashboard/teacher",
    "student-parent": "/dashboard/student-parent",
    head: "/dashboard/head",
  };
  return map[role];
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [email, setEmail] = useState<string | null>(null);
  const [role, setRoleState] = useState<PortalRole | null>(() => {
    // Rehydrate from localStorage on first load
    try {
      const saved = localStorage.getItem(STORAGE_KEY) as PortalRole | null;
      return saved ?? null;
    } catch {
      return null;
    }
  });

  // Keep email in sync with the Supabase session
  useEffect(() => {
    let mounted = true;
    supabase.auth.getSession().then(({ data }) => {
      if (mounted) setEmail(data.session?.user.email ?? null);
    });
    const { data } = supabase.auth.onAuthStateChange((_event, session) => {
      setEmail(session?.user.email ?? null);
      // If Supabase signs the user out, clear the role too
      if (!session) setRoleState(null);
    });
    return () => {
      mounted = false;
      data.subscription.unsubscribe();
    };
  }, []);

  function setRole(newRole: PortalRole, remember: boolean) {
    setRoleState(newRole);
    if (remember) {
      localStorage.setItem(STORAGE_KEY, newRole);
    } else {
      localStorage.removeItem(STORAGE_KEY);
    }
  }

  async function signOut() {
    await supabase.auth.signOut();
    setRoleState(null);
    localStorage.removeItem(STORAGE_KEY);
  }

  return (
    <AuthContext.Provider
      value={{
        email,
        role,
        dashboardPath: role ? roleToDashboardPath(role) : null,
        setRole,
        signOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used inside <AuthProvider>");
  return ctx;
}
