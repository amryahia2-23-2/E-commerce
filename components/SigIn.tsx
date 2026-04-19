"use client";
import { useAuth, UserButton, SignInButton } from "@clerk/nextjs";


export default function AuthButtons() {
  const { isSignedIn } = useAuth();

  return isSignedIn ? (
   
      <UserButton />
      
  ) : (
    <SignInButton mode="modal">
      <button className="text-sm font-medium hover:text-darkColor hoverEffect">
        Login
      </button>
    </SignInButton>
  );
}