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
import Router from "next/router";
import axios from "axios";

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

  const { email, password, error } = user;

  useEffect(() => {
    const checkSession = async () => {
      const session = await getSession();
      console.log("session", session);
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
      Router.push(callbackUrl || "/");
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
          console.log(err);
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
      {/* <Header country={country} /> */}
      <div className="relative min-h-screen overflow-hidden flex justify-center">
        <div className="p-12 last:mt-12 md:last:mt-0">
          <div className="flex items-center justify-between max-w-[300px]">
            <div className="w-[50px] h-[50px] border border-gray-400 rounded-full grid place-items-center cursor-pointer hover:border-blue-500">
              <BiLeftArrowAlt className="w-[20px] h-[20px] text-gray-800 hover:text-blue-500" />
            </div>
            <span className="font-semibold text-sm">
              We'd be happy to join us!{" "}
              <Link href="/">
                <span className="text-blue-500 border-b border-blue-500 pb-[5px]">
                  Go Store
                </span>
              </Link>
            </span>
          </div>
          <div className="mt-4">
            <h1 className="text-[50px] m-0">Sign in</h1>
            <p className="text-gray-500">
              Get access to one of the best Eshopping services in the world.
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
                        className="mt-2 text-blue-500 border-b border-blue-500 pb-[2px] hover:text-blue-700 hover:border-blue-700"
                        onClick={(e) => {
                          e.preventDefault();
                          handleSendEmail(email);
                        }}
                      >
                        Resend Email
                      </button>
                    )}

                  {user.success && (
                    <div className="text-green-500 text-sm mt-2">
                      {user.success}
                    </div>
                  )}
                  <div className="text-gray-600 pt-4 text-sm hover:text-blue-500 hover:border-b hover:border-blue-500">
                    <Link href="/auth/forgot">Forgot password?</Link>
                  </div>
                </Form>
              )}
            </Formik>
            <div className="mt-4">
              <span className="relative text-gray-600 pl-32">
                Or continue with
              </span>
              <div className="mt-4 flex flex-col gap-4 pl-12">
                {providers.map((provider) => {
                  if (provider.name === "Credentials") return null;
                  return (
                    <div key={provider.name}>
                      <button
                        className="w-[290px] h-[50px] border border-gray-400 rounded-full flex items-center pl-4 gap-2 bg-transparent cursor-pointer"
                        onClick={() => signIn(provider.id)}
                      >
                        <img
                          src={`../../icons/${provider.name}.png`}
                          alt=""
                          className="w-9"
                        />
                        Sign in with {provider.name}
                      </button>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer/>
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
