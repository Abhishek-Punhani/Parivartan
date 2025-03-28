import Link from "next/link";
import { IoLocationSharp } from "react-icons/io5";

interface CopyrightProps {
  country: { name: string };
}

const data = [
  { name: "Privacy Center", link: "" },
  { name: "Privacy & Cookie Policy", link: "" },
  { name: "Manage Cookies", link: "" },
  { name: "Terms & Conditions", link: "" },
  { name: "Copyright Notice", link: "" },
];

export default function Copyright({ country }: CopyrightProps) {
  return (
    <div>
      <section className="text-sm text-gray-600">
        ©2022 SHOPPAY All Rights Reserved.
      </section>
      <section>
        <ul className="flex flex-wrap items-center gap-4 mt-2">
          {data.map((link, i) => (
            <li key={i} className="text-sm underline">
              <Link href={link.link}>{link.name}</Link>
            </li>
          ))}
          <li className="flex items-center text-sm">
            <IoLocationSharp className="mr-1" /> {country.name}
          </li>
        </ul>
      </section>
    </div>
  );
}
