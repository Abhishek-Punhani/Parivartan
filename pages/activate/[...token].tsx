import DotLoaderSpinner from "@/components/loaders/dotLoader";
import { useToast } from "@/contexts/toast/toastContext";
import axios from "axios";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function ActivateEmail() {
  const router = useRouter();
  const { token } = router.query;
  const [loading, setLoading] = useState(true);
  const toast = useToast();
  useEffect(() => {
    if (token) {
      async function verifyToken() {
        try {
          const res = await axios.post("/api/auth/verify", { token });
          console.log("res", res);
          if (res.status === 200) {
            toast.open({
              message: {
                heading: "Email Verified",
                content: "You can now login to your account.",
              },
              duration: 5000,
              position: "top-center",
              color: "success",
            });
            setLoading(false);
          }
        } catch (error) {
          toast.open({
            message: {
              heading: "Error",
              content: "Failed to verify email.",
            },
            duration: 5000,
            position: "top-center",
            color: "error",
          });
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
