import { signOut, signIn } from "next-auth/react";
import Link from "next/link";
import { User, LogOut, Settings, Heart, FileText, MapPin } from "lucide-react";
import { useEffect, useRef } from "react";
import { useRouter } from "next/router";

interface UserMenuProps {
  user: any;
  isOpen: Boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<Boolean>>;
}

export default function UserMenu({ user, isOpen, setIsOpen }: UserMenuProps) {
  const menuRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (
        menuRef.current &&
        !menuRef.current.contains(event.target as Node) &&
        isOpen
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [isOpen, setIsOpen]);

  if (!isOpen) return null;

  return (
    <div
      ref={menuRef}
      className="absolute top-full right-0 w-90 bg-white shadow-md z-50 flex flex-col rounded-lg border border-gray-200 overflow-hidden"
    >
      <div className="p-4 border-b border-gray-100">
        <h4 className="text-center font-semibold text-gray-800">
          Welcome to Parivartan!
        </h4>
      </div>

      {user ? (
        <>
          <div className="flex gap-4 items-center p-4 border-b border-gray-100">
            <img
              src={user?.image || "/images/default_picture.png"}
              alt="User Avatar"
              className="w-16 h-16 rounded-full object-cover border border-gray-200"
            />
            <div className="flex flex-col">
              <span className="text-gray-600 text-sm">Welcome Back,</span>
              <h3 className="text-lg font-medium text-gray-800">
                {user?.name}
              </h3>
              <span className="text-sm text-gray-500">{user?.email}</span>
            </div>
          </div>

          <ul className="text-gray-700 divide-y divide-gray-100">
            <li>
              <Link
                href="/profile"
                className="flex items-center gap-2 p-3 hover:bg-gray-50"
              >
                <User className="h-4 w-4 text-gray-500" />
                <span>My Profile</span>
              </Link>
            </li>
            <li>
              <Link
                href="/profile/events"
                className="flex items-center gap-2 p-3 hover:bg-gray-50"
              >
                <FileText className="h-4 w-4 text-gray-500" />
                <span>My Events</span>
              </Link>
            </li>
            <li>
              <Link
                href="/profile/saved"
                className="flex items-center gap-2 p-3 hover:bg-gray-50"
              >
                <Heart className="h-4 w-4 text-gray-500" />
                <span>Saved</span>
              </Link>
            </li>
            <li>
              <Link
                href="/profile/locations"
                className="flex items-center gap-2 p-3 hover:bg-gray-50"
              >
                <MapPin className="h-4 w-4 text-gray-500" />
                <span>My Locations</span>
              </Link>
            </li>
            <li>
              <Link
                href="/profile/settings"
                className="flex items-center gap-2 p-3 hover:bg-gray-50"
              >
                <Settings className="h-4 w-4 text-gray-500" />
                <span>Settings</span>
              </Link>
            </li>
            <li>
              <button
                onClick={() => {
                  signOut();
                  setIsOpen(false);
                  router.push("/");
                }}
                className="flex items-center gap-2 p-3 w-full text-left hover:bg-gray-50 text-red-500"
              >
                <LogOut className="h-4 w-4" />
                <span>Sign Out</span>
              </button>
            </li>
          </ul>
        </>
      ) : (
        <div className="p-4 flex flex-col gap-3">
          <p className="text-sm text-gray-600 mb-2">
            Sign in to track your contributions, join events, and help protect
            our rivers.
          </p>
          <button
            className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 w-full"
            onClick={() => signIn()}
          >
            Sign In
          </button>
          <Link
            href="/auth/signup"
            className="border border-green-500 text-green-500 px-4 py-2 rounded-md hover:bg-green-50 text-center w-full"
          >
            Register
          </Link>
        </div>
      )}
    </div>
  );
}
