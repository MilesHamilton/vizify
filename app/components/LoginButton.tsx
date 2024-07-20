"use client";
import Link from "next/link";
const LoginButton = () => {
  const handleLogin = () => {
    window.location.href = "/api/auth/spotify-auth";
  };

  return (
    <Link href={"/api/auth/spotify-auth"}>
      <button onClick={handleLogin}>Login</button>
    </Link>
  );
};

export default LoginButton;
