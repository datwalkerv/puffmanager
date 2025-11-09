"use client";

import { useSession, signOut } from "@/lib/auth/auth-client";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { toast } from "sonner";
import { UserIcon } from "lucide-react";

export default function Navbar() {
  const { data: session } = useSession();
  const router = useRouter();

  return (
    <nav className="w-full p-4 flex justify-around items-center border-b border-white/10 sticky top-0 bg-dark/50 backdrop-blur-md z-50">
      <Link href="/" className="flex items-center gap-2">
        <h1 className="text-xl font-header text-white/80">puff</h1>
      </Link>
      {session ? (
        <div className="flex gap-4 items-center text-white/80 text-sm">
          <Link href="/portfolio">Portfolio</Link>
          <Link href="/process">Process</Link>
          <Link href="/review">Review</Link>
          <Link href="/pricing">Pricing</Link>
          <UserIcon
            className="w-auto h-5"
            onClick={() => {
              signOut();
              toast.success("Signed out");
              router.push("/");
              router.refresh();
            }}
          />
        </div>
      ) : (
        <div className="flex gap-4 items-center text-white/80 text-sm">
          <Link href="/#portfolio">Portfolio</Link>
          <Link href="/#process">Process</Link>
          <Link href="/#review">Review</Link>
          <Link href="/#pricing">Pricing</Link>
          <Link href="/login">
            <UserIcon className="w-auto h-5" />
          </Link>
        </div>
      )}
    </nav>
  );
}
