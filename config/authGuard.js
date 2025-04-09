import { useEffect, useState } from "react";
import { auth } from "../credentials/android/firebaseConfig";
import { useRouter, useSegments } from "expo-router";

export function useAuthGuard() {
  const [user, setUser] = useState(null);
  const router = useRouter();
  const segments = useSegments();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((authUser) => {
      setUser(authUser);
      if (!authUser && segments[0] !== "auth") {
        router.replace("/auth/sign-in"); // Redirect unauthenticated users
      }
    });

    return () => unsubscribe();
  }, []);

  return { user };
}
