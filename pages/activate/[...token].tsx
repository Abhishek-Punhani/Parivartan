import DotLoaderSpinner from "@/components/loaders/dotLoader";
import axios from "axios";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function ActivateEmail() {
  const router = useRouter();
  const { token } = router.query;
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (token) {
      async function verifyToken() {
        try {
          const res = await axios.post("/api/auth/verify", { token });
          console.log("res", res);
          if (res.status === 200) {
            setLoading(false);
          }
        } catch (error) {
          console.error("Failed to verify token:", error);
          setLoading(false);
        }
      }
      verifyToken();
    }

    if (!loading) {
      console.log("Redirecting to signin page...");
      window.location.href = "/auth/signin";
    }
  }, [token, loading]);
  return (
    <div>
      <DotLoaderSpinner loading={loading} />
    </div>
  );
}
