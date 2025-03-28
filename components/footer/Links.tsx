import Link from "next/link";

interface LinkItem {
  name: string;
  link: string;
}

interface LinkGroup {
  heading: string;
  links: LinkItem[];
}

const links: LinkGroup[] = [
  {
    heading: "SHOPPAY",
    links: [
      { name: "About us", link: "" },
      { name: "Contact us", link: "" },
      { name: "Social Responsibility", link: "" },
    ],
  },
  {
    heading: "HELP & SUPPORT",
    links: [
      { name: "Shipping Info", link: "" },
      { name: "Returns", link: "" },
      { name: "How To Order", link: "" },
      { name: "How To Track", link: "" },
      { name: "Size Guide", link: "" },
    ],
  },
  {
    heading: "Customer service",
    links: [
      { name: "Customer service", link: "" },
      { name: "Terms and Conditions", link: "" },
      { name: "Consumers (Transactions)", link: "" },
      { name: "Take our feedback survey", link: "" },
    ],
  },
];

export default function Links() {
  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
      {links.map((linkGroup, i) => (
        <ul key={i}>
          <b className="uppercase">{linkGroup.heading}</b>
          {linkGroup.links.map((link, j) => (
            <li key={j} className="text-sm text-gray-600 hover:underline">
              <Link href={link.link}>{link.name}</Link>
            </li>
          ))}
        </ul>
      ))}
    </div>
  );
}
