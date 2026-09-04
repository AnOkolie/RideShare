import { useEffect, useRef } from "react";
import { logout } from "../utils/aws/logout";

const INACTIVITY_LENGTH = 60 * 60 * 1000;

export function useUserActivity() {
  const timeoutRef = useRef<number | null>(null);
  const hasLoggedOut = useRef(false);

  useEffect(() => {
    const handleLogout = async () => {
      if (hasLoggedOut.current) return;

      hasLoggedOut.current = true;
      console.log("Logging out due to inactivity");

      await logout();
    };

    const resetTimeout = () => {
      if (hasLoggedOut.current) return;

      if (timeoutRef.current !== null) {
        window.clearTimeout(timeoutRef.current);
      }

      timeoutRef.current = window.setTimeout(handleLogout, INACTIVITY_LENGTH);
    };

    window.addEventListener("pointerdown", resetTimeout);
    window.addEventListener("keydown", resetTimeout);
    window.addEventListener("scroll", resetTimeout);

    resetTimeout(); // Start the one-hour countdown on mount.

    return () => {
      window.removeEventListener("pointerdown", resetTimeout);
      window.removeEventListener("keydown", resetTimeout);
      window.removeEventListener("scroll", resetTimeout);

      if (timeoutRef.current !== null) {
        window.clearTimeout(timeoutRef.current);
      }
    };
  }, []);
}
