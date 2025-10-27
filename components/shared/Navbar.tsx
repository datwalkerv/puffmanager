"use client";

import { useSession, signOut } from "@/lib/auth/auth-client";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { toast } from "sonner";

export default function Navbar() {
  const { data: session } = useSession();
  const router = useRouter();

  return (
    <nav className="w-full p-4 flex justify-around items-center border-b border-white/10">
      <Link href="/" className="flex items-center gap-2">
        <h1 className="text-2xl font-header text-yellow">puffmanager</h1>
      </Link>
      {session ? (
        <>
          <Button
            onClick={() => {
              signOut();
              toast.success("Signed out");
              router.push("/");
              router.refresh();
            }}
          >
            Sign Out
          </Button>
        </>
      ) : (
        <div className="flex gap-2">
          <Link href="/login">
            <Button>Sign In</Button>
          </Link>
          <Link href="/register">
            <Button variant="outline">Sign Up</Button>
          </Link>
        </div>
      )}
    </nav>
  );
}