import { signOut } from "next-auth/react";

export default function Home() {
  return (
    <div>
      <h1>Home</h1>
      <button onClick={() => signOut()}>Hii</button>
    </div>
  );
}
