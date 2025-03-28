interface User {
  name: string;
  username: string;
  phoneNumber: string;
  email: string;
  picture?: string;
  password: string;
  role?: "User" | "Admin" | "SuperAdmin";
  isVerified: boolean;
  age: number;
}
interface Post {
    title: string;
    content: string;
    severity: number;
    author?: string;
    comments?: string[];
    upVotes?: string[];
    location: string;
    pollutionType: "Air" | "Water" | "Soil";
}

interface Campaign {
    title: string;
    description: string;
    location: string;
    date: string;
    organizer: string;
    images?: string[];
    upVotes?: string[];
}

interface LoginInputProps {
  icon: "user" | "email" | "password";
  placeholder: string;
  name: string;
  type?: string;
}