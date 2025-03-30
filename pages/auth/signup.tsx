import Footer from "@/components/footer";
import { BiLeftArrowAlt } from "react-icons/bi";
import Link from "next/link";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import LoginInput from "../../components/inputs/loginInput";
import { useState, ChangeEvent } from "react";
import CircledIconBtn from "@/components/buttons/CircledIconButton";
import { uploadFiles } from "@/utils/upload";
import {
  getCsrfToken,
  getProviders,
  getSession,
  signIn,
} from "next-auth/react";
import axios from "axios";
import DotLoaderSpinner from "../../components/loaders/dotLoader";
import Router, { useRouter } from "next/router";
import Picture from "@/components/inputs/Picture";
import Navbar from "@/components/Navbar";

const initialValues: SignupFormProps = {
  name: "",
  email: "",
  username: "",
  password: "",
  conf_password: "",
  profilePicture: "",
  success: "",
  error: "",
};

export default function SignUp({ providers }: SignInProps) {
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState<SignupFormProps>(initialValues);
  const [picture, setPicture] = useState<File | null>(null);
  const [readablePicture, setReadablePicture] = useState("");
  const router = useRouter();
  const { name, email, password, conf_password, username, error } = user;

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const registerValidation = Yup.object({
    name: Yup.string()
      .required("What's your name?")
      .min(2, "First name must be between 2 and 16 characters.")
      .max(16, "First name must be between 2 and 16 characters.")
      .matches(/^[aA-zZ]/, "Numbers and special characters are not allowed."),
    username: Yup.string()
      .required("What's your username?")
      .min(3, "Username must be between 3 and 16 characters.")
      .max(16, "Username must be between 3 and 16 characters.")
      .matches(
        /^[a-zA-Z0-9._]+$/,
        "Username can only contain letters, numbers, periods, and underscores."
      ),
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
      let link = "";
      setLoading(true);
      if (picture) {
        const uploaded_picture = await uploadFiles([
          { file: picture, type: "image" },
        ]);
        link = uploaded_picture[0].file.secure_url as string;
        setUser({
          ...user,
          profilePicture: uploaded_picture[0].file.secure_url as string,
        });
      }
      const { data } = await axios.post("/api/auth/signup", {
        name,
        email,
        password,
        username,
        profilePicture: link,
      });
      setUser({ ...user, error: "", success: data.message });
      setLoading(false);
      Router.push("/auth/activateEmail");
    } catch (error: any) {
      setLoading(false);
      setUser({ ...user, success: "", error: error.response.data.message });
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
              Already have an account?{" "}
              <Link href="/auth/signin">
                <span className="text-blue-500 hover:underline">
                  Sign In
                </span>
              </Link>
            </span>
          </div>
          <h1 className="text-2xl font-bold text-gray-800 mb-4">Sign Up</h1>
          <p className="text-sm text-gray-500 mb-6">
            Join our community and start making a difference today.
          </p>
          <Formik
            enableReinitialize
            initialValues={{
              name,
              email,
              username,
              password,
              conf_password,
            }}
            validationSchema={registerValidation}
            onSubmit={signUpHandler}
          >
            {() => (
              <Form>
                <Picture
                  readablePicture={readablePicture}
                  setPicture={setPicture}
                  setReadablePicture={setReadablePicture}
                />
                <LoginInput
                  type="text"
                  name="username"
                  icon="user"
                  placeholder="User Name"
                  onChange={handleChange}
                />
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
                {error && (
                  <div className="text-red-500 text-sm mt-2">{error}</div>
                )}
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
                    Sign up with {provider.name}
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
