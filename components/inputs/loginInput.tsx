import { BiUser } from "react-icons/bi";
import { SiMinutemailer } from "react-icons/si";
import { IoKeyOutline, IoCalendarNumberOutline } from "react-icons/io5";
import { ErrorMessage, useField } from "formik";

interface LoginInputProps {
  icon: "user" | "email" | "password" | "age";
  placeholder: string;
  name: string;
  type?: string;
  className?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function LoginInput({
  icon,
  placeholder,
  onChange,
  ...props
}: LoginInputProps) {
  const [field, meta] = useField(props);

  return (
    <div className="relative max-w-[380px] w-full my-2">
      <div
        className={`relative bg-gray-200 h-[55px] rounded-full grid grid-cols-[15%_85%] items-center px-4 ${
          meta.touched && meta.error ? "bg-red-100" : ""
        }`}
      >
        {icon === "user" ? (
          <BiUser
            className={`w-6 h-6 ${
              meta.touched && meta.error ? "text-red-500" : "text-gray-400"
            }`}
          />
        ) : icon === "email" ? (
          <SiMinutemailer
            className={`w-6 h-6 ${
              meta.touched && meta.error ? "text-red-500" : "text-gray-400"
            }`}
          />
        ) : icon === "password" ? (
          <IoKeyOutline
            className={`w-6 h-6 ${
              meta.touched && meta.error ? "text-red-500" : "text-gray-400"
            }`}
          />
        ) : icon === "age" ? (
          <IoCalendarNumberOutline
            className={`w-6 h-6 ${
              meta.touched && meta.error ? "text-red-500" : "text-gray-400"
            }`}
          />
        ) : null}
        <input
          type={props.type}
          placeholder={placeholder}
          {...field}
          {...props}
          onChange={(e) => {
            field.onChange(e);
            if (onChange) onChange(e);
          }}
          className={`bg-transparent outline-none border-none font-semibold text-lg text-gray-800 placeholder-gray-400 ${
            meta.touched && meta.error ? "text-red-500 placeholder-red-500" : ""
          }`}
        />
      </div>
    </div>
  );
}
