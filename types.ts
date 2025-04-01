interface User {
  name: string;
  username: string;
  email: string;
  picture?: string;
  password: string;
  role?: "User" | "Admin" | "SuperAdmin";
  isVerified: boolean;
}

interface ClientUser {
  id: string;
  name?: string | null;
  email?: string | null;
  picture?: string | null;
  role?: string;
  isEmailVerified?: boolean;
}

interface Post {
  id: string;
  title: string;
  content: string;
  image: string;
  severity: number;
  author?: string;
  comments?: string[];
  upVotes?: string[];
  location: string;
  pollutionType: "Air" | "Water" | "Soil";
  reportError?: string;
  customErrorReport?: string;
  createdAt: string;
  updatedAt: string;
}

interface Campaign {
  id: string;
  title: string;
  description: string;
  location: string;
  date: string;
  time: string;
  eventType:
    | "River Cleanup"
    | "Awareness Campaign"
    | "Water Quality Monitoring"
    | "Tree Plantation"
    | "Other";
  organiser: string;
  image: string;
  upVotes?: string[];
  reportErrors?:
    | "Spam"
    | "Inappropriate"
    | "Hate Speech"
    | "Violence"
    | "False Information"
    | "Other";
  customErrorReport?: string;
}

interface LoginInputProps {
  icon: "user" | "email" | "password";
  placeholder: string;
  name: string;
  type?: string;
}

interface SignInProps {
  providers: any[];
  callbackUrl: string;
  csrfToken: string;
}

interface SignupFormProps {
  name: string;
  email: string;
  username: string;
  profilePicture: string;
  password: string;
  conf_password: string;
  success: string;
  error: string;
}

interface LoginFormProps {
  email: string;
  password: string;
  success: string;
  error: string;
}
