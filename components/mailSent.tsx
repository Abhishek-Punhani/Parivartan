interface MailSuccessProps {
  access: string;
  password?: boolean;
}

const MailSuccess: React.FC<MailSuccessProps> = ({
  access,
  password = false,
}) => {
  return (
    <>
      <div className="relative min-h-screen overflow-hidden flex justify-center items-center">
        <div className="p-12">
          <div className="flex justify-center">
            <div
              className={`${
                access === "link" ? "lg:w-1/2" : "lg:w-3/4"
              } w-full`}
            >
              {/* Success Inner */}
              <div className="text-center p-10 border border-gray-400 rounded-lg text-gray-800 shadow-md bg-white">
                <h1 className="text-[50px] font-bold text-gray-800">
                  <i className="fa fa-envelope"></i>
                  <span className="block text-xl font-semibold text-gray-800 mt-5">
                    {access === "link"
                      ? "Password Reset Link Sent!"
                      : password
                      ? "Password Reset Successfully!"
                      : "Registred Successfully!"}
                  </span>
                </h1>
                <p className="py-6 text-gray-500">
                  {access === "link"
                    ? "Please check your email for a link to reset your password. If you don't receive it in a few minutes, check your spam folder or try again."
                    : password
                    ? "Your password has been reset successfully. You can now log in with your new password."
                    : "You have successfully registered. Please login to continue."}
                </p>
                <div className="mx-auto h-[8rem] w-[8rem] rounded-full flex items-center justify-center">
                  {access === "link" ? (
                    <img
                      src="/images/check.svg"
                      className="h-full w-full rounded-full"
                      alt="check"
                    />
                  ) : (
                    <a
                      type="button"
                      href="/auth/signin"
                      className="w-full text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                    >
                      Login
                    </a>
                  )}
                </div>
              </div>
              {/* End Success Inner */}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default MailSuccess;
