import Footer from "@/components/footer";
import { BiLeftArrowAlt } from "react-icons/bi";
import Link from "next/link";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import LoginInput from "../../components/inputs/loginInput";
import { useState, ChangeEvent, useEffect } from "react";
import CircledIconBtn from "@/components/buttons/CircledIconButton";
import {
  getCsrfToken,
  getProviders,
  getSession,
  signIn,
} from "next-auth/react";
import DotLoaderSpinner from "../../components/loaders/dotLoader";
import Router, { useRouter } from "next/router";
import axios from "axios";
import Navbar from "@/components/Navbar";
import { useToast } from "@/contexts/toast/toastContext";

const initialValues: LoginFormProps = {
  email: "",
  password: "",
  success: "",
  error: "",
};

export default function SignIn({
  providers,
  callbackUrl,
  csrfToken,
}: SignInProps) {
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState<LoginFormProps>(initialValues);
  const router = useRouter();
  const toast = useToast();

  useEffect(() => {
    if (router.query.reason === "protected") {
      toast.open({
        message: {
          heading: "Authentication Required",
          content: "You need to sign in first.",
        },
        duration: 5000,
        position: "top-center",
        color: "error",
      });
    }
  }, [router.query]);
  const { email, password, error } = user;

  useEffect(() => {
    const checkSession = async () => {
      const session = await getSession();
      if (session) {
        Router.push("/");
      }
    };
    checkSession();
  }, []);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const loginValidation = Yup.object({
    email: Yup.string()
      .required("Email address is required.")
      .email("Please enter a valid email address."),
    password: Yup.string().required("Please enter a password"),
  });

  const signInHandler = async () => {
    setLoading(true);
    const options = {
      redirect: false,
      email: email,
      password: password,
    };
    const res = await signIn("credentials", options);
    setUser({ ...user, success: "", error: "" });
    setLoading(false);
    if (res?.error) {
      setLoading(false);
      setUser({ ...user, error: res?.error });
    } else {
      const redirectUrl = router.query.callbackUrl || "/";
      Router.push(redirectUrl as string);
    }
  };

  const handleSendEmail = async (email: string) => {
    try {
      await axios
        .post("/api/auth/sendEmail", { email })
        .then((res) => {
          console.log(res);
        })
        .catch((err) => {
          setUser({
            ...user,
            error: err.response?.data?.message || "An error occurred",
          });
        });

      setUser({ ...user, error: "", success: "Email sent successfully" });
    } catch (error: any) {
      setUser({ ...user, error: error.message });
    }
  };

  return (
    <>
      {loading && <DotLoaderSpinner loading={loading} />}
      <Navbar />
      <div className="relative min-h-screen bg-gray-50 flex justify-center items-center">
        <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-md">
          <div className="flex items-center justify-between mb-6">
            <div
              className="w-10 h-10 border border-gray-300 rounded-full flex items-center justify-center cursor-pointer hover:border-blue-500"
              onClick={() => router.push("/")}
            >
              <BiLeftArrowAlt className="text-gray-600 hover:text-blue-500" />
            </div>
            <span className="text-sm text-gray-600">
              New here?{" "}
              <Link href="/auth/signup">
                <span className="text-blue-500 hover:underline">
                  Create an account
                </span>
              </Link>
            </span>
          </div>
          <h1 className="text-2xl font-bold text-gray-800 mb-4">Sign In</h1>
          <p className="text-sm text-gray-500 mb-6">
            Access your account and explore our services.
          </p>
          <Formik
            enableReinitialize
            initialValues={{
              email,
              password,
            }}
            validationSchema={loginValidation}
            onSubmit={signInHandler}
          >
            {() => (
              <Form method="post" action="/api/auth/signin/email">
                <input
                  type="hidden"
                  name="csrfToken"
                  defaultValue={csrfToken}
                />
                <LoginInput
                  type="text"
                  name="email"
                  icon="email"
                  placeholder="Email Address"
                  onChange={handleChange}
                />
                <LoginInput
                  type="password"
                  name="password"
                  icon="password"
                  placeholder="Password"
                  onChange={handleChange}
                />
                <CircledIconBtn type="submit" text="Sign in" />
                {error && (
                  <div className="text-red-500 text-sm mt-2">{error}</div>
                )}

                {error &&
                  error ===
                    "Account not verified , please check your email" && (
                    <button
                      type="button"
                      className="mt-2 text-blue-500 hover:underline"
                      onClick={(e) => {
                        e.preventDefault();
                        handleSendEmail(email);
                      }}
                    >
                      Resend Verification Email
                    </button>
                  )}

                {user.success && (
                  <div className="text-green-500 text-sm mt-2">
                    {user.success}
                  </div>
                )}
                <div className="text-gray-600 text-sm mt-4">
                  <Link href="/auth/forgot" className="hover:underline">
                    Forgot password?
                  </Link>
                </div>
              </Form>
            )}
          </Formik>
          <div className="mt-6">
            <span className="block text-center text-gray-500 mb-4">
              Or continue with
            </span>
            <div className="flex flex-col gap-4">
              {providers.map((provider) => {
                if (provider.name === "Credentials") return null;
                return (
                  <button
                    key={provider.name}
                    className="w-full flex items-center justify-center border border-gray-300 rounded-lg py-2 hover:bg-gray-100"
                    onClick={() => signIn(provider.id)}
                  >
                    <img
                      src={`../../icons/${provider.name}.png`}
                      alt={provider.name}
                      className="w-6 h-6 mr-2"
                    />
                    Sign in with {provider.name}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export async function getServerSideProps(context: any) {
  const { req, query } = context;
  const session = await getSession({ req });
  if (session) {
    return { redirect: { destination: query?.callbackUrl || "/" } };
  }
  const csrfToken = (await getCsrfToken(context)) || null;
  const rawProviders = await getProviders();

  const providers = rawProviders ? Object.values(rawProviders) : [];
  return {
    props: {
      providers,
      csrfToken,
      callbackUrl: query?.callbackUrl || "/",
    },
  };
}
