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
