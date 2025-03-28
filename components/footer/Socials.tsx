import { FaFacebookF, FaTiktok } from "react-icons/fa";
import {
  BsInstagram,
  BsTwitter,
  BsYoutube,
  BsPinterest,
  BsSnapchat,
} from "react-icons/bs";

export default function Socials() {
  return (
    <div>
      <h3 className="text-sm font-bold text-gray-800">STAY CONNECTED</h3>
      <ul className="mt-2 flex items-center gap-4">
        <li className="text-2xl text-gray-600 hover:text-blue-500">
          <a href="/" target="_blank">
            <FaFacebookF />
          </a>
        </li>
        <li className="text-2xl text-gray-600 hover:text-blue-500">
          <a href="/" target="_blank">
            <BsInstagram />
          </a>
        </li>
        <li className="text-2xl text-gray-600 hover:text-blue-500">
          <a href="/" target="_blank">
            <BsTwitter />
          </a>
        </li>
        <li className="text-2xl text-gray-600 hover:text-blue-500">
          <a href="/" target="_blank">
            <BsYoutube />
          </a>
        </li>
        <li className="text-2xl text-gray-600 hover:text-blue-500">
          <a href="/" target="_blank">
            <BsPinterest />
          </a>
        </li>
        <li className="text-2xl text-gray-600 hover:text-blue-500">
          <a href="/" target="_blank">
            <BsSnapchat />
          </a>
        </li>
        <li className="text-2xl text-gray-600 hover:text-blue-500">
          <a href="/" target="_blank">
            <FaTiktok />
          </a>
        </li>
      </ul>
    </div>
  );
}
