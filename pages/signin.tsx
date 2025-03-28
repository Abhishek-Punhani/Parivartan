import Footer from "@/components/footer";
import { BiLeftArrowAlt } from "react-icons/bi";
import Link from "next/link";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import LoginInput from "../components/inputs/loginInput";
import { useState, ChangeEvent } from "react";
import CircledIconBtn from "@/components/buttons/CircledIconButton";
import {
  getCsrfToken,
  getProviders,
  getSession,
  signIn,
} from "next-auth/react";
import axios from "axios";
import DotLoaderSpinner from "../components/loaders/dotLoader";
import Router from "next/router";

const initialValues: UserState = {
  login_email: "",
  login_password: "",
  name: "",
  email: "",
  password: "",
  conf_password: "",
  success: "",
  error: "",
  login_error: "",
};

export default function SignIn({
  providers,
  callbackUrl,
  csrfToken,
}: SignInProps) {
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState<UserState>(initialValues);

  const {
    login_email,
    login_password,
    name,
    email,
    password,
    conf_password,
    success,
    error,
    login_error,
  } = user;

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const loginValidation = Yup.object({
    login_email: Yup.string()
      .required("Email address is required.")
      .email("Please enter a valid email address."),
    login_password: Yup.string().required("Please enter a password"),
  });

  const registerValidation = Yup.object({
    name: Yup.string()
      .required("What's your name?")
      .min(2, "First name must be between 2 and 16 characters.")
      .max(16, "First name must be between 2 and 16 characters.")
      .matches(/^[aA-zZ]/, "Numbers and special characters are not allowed."),
    email: Yup.string()
      .required(
        "You'll need this when you log in and if you ever need to reset your password."
      )
      .email("Enter a valid email address."),
    password: Yup.string()
      .required(
        "Enter a combination of at least six numbers, letters, and punctuation marks (such as ! and &)."
      )
      .min(6, "Password must be at least 6 characters.")
      .max(36, "Password can't be more than 36 characters"),
    conf_password: Yup.string()
      .required("Confirm your password.")
      .oneOf([Yup.ref("password")], "Passwords must match."),
  });

  const signUpHandler = async () => {
    try {
      setLoading(true);
      const { data } = await axios.post("/api/auth/signup", {
        name,
        email,
        password,
      });
      setUser({ ...user, error: "", success: data.message });
      setLoading(false);
      setTimeout(async () => {
        const options = {
          redirect: false,
          email: email,
          password: password,
        };
        await signIn("credentials", options);
        Router.push("/");
      }, 2000);
    } catch (error: any) {
      setLoading(false);
      setUser({ ...user, success: "", error: error.response.data.message });
    }
  };

  const signInHandler = async () => {
    setLoading(true);
    const options = {
      redirect: false,
      email: login_email,
      password: login_password,
    };
    const res = await signIn("credentials", options);
    setUser({ ...user, success: "", error: "" });
    setLoading(false);
    if (res?.error) {
      setLoading(false);
      setUser({ ...user, login_error: res?.error });
    } else {
      Router.push(callbackUrl || "/");
    }
  };

  const country = {
    name: "Morocco",
    flag: "https://cdn-icons-png.flaticon.com/512/197/197551.png?w=360",
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
                login_email,
                login_password,
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
                    name="login_email"
                    icon="email"
                    placeholder="Email Address"
                    onChange={handleChange}
                  />
                  <LoginInput
                    type="password"
                    name="login_password"
                    icon="password"
                    placeholder="Password"
                    onChange={handleChange}
                  />
                  <CircledIconBtn type="submit" text="Sign in" />
                  {login_error && (
                    <span className="text-red-500 text-sm">{login_error}</span>
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
        <div className="p-12">
          <div className="mt-4">
            <h1 className="text-[50px] m-0">Sign up</h1>
            <p className="text-gray-500">
              Get access to one of the best Eshopping services in the world.
            </p>
            <Formik
              enableReinitialize
              initialValues={{
                name,
                email,
                password,
                conf_password,
              }}
              validationSchema={registerValidation}
              onSubmit={signUpHandler}
            >
              {() => (
                <Form>
                  <LoginInput
                    type="text"
                    name="name"
                    icon="user"
                    placeholder="Full Name"
                    onChange={handleChange}
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
                  <LoginInput
                    type="password"
                    name="conf_password"
                    icon="password"
                    placeholder="Re-Type Password"
                    onChange={handleChange}
                  />
                  <CircledIconBtn type="submit" text="Sign up" />
                </Form>
              )}
            </Formik>
            <div>
              {success && <span className="text-green-500">{success}</span>}
            </div>
            <div>{error && <span className="text-red-500">{error}</span>}</div>
          </div>
        </div>
      </div>
      <Footer country={{ name: "India" }} />
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
