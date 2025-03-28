import Links from "./Links";
import Socials from "./Socials";
import Copyright from "./Copyright";

interface FooterProps {
  country: { name: string };
}

export default function Footer({ country }: FooterProps) {
  return (
    <footer className="bg-gray-100 w-full">
      <div className="relative w-full grid gap-12 p-4 md:grid-areas-footer md:gap-8 md:max-w-[1200px] md:mx-auto">
        <Links />
        <Socials />
        <Copyright country={country} />
      </div>
    </footer>
  );
}
