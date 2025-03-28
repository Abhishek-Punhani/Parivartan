import { BiRightArrowAlt } from "react-icons/bi";

interface CircledIconBtnProps {
  type: "button" | "submit" | "reset";
  text: string;
}

export default function CircledIconBtn({ type, text }: CircledIconBtnProps) {
  return (
    <button
      type={type}
      className="relative w-[220px] h-[55px] font-semibold text-white bg-blue-500 rounded-full cursor-pointer border-none outline-none"
    >
      {text}
      <div className="absolute top-[7.5px] right-[5px] w-[40px] h-[40px] bg-gray-200 rounded-full grid place-items-center">
        <BiRightArrowAlt className="text-blue-500" />
      </div>
    </button>
  );
}
