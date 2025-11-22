"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { signIn } from "@/lib/auth/auth-client";
import Link from "next/link";

const loginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(1, "Password is required"),
});

type LoginData = z.infer<typeof loginSchema>;

export default function LoginPage() {
    const router = useRouter();
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginData>({
    resolver: zodResolver(loginSchema),
  });

  async function onSubmit(data: LoginData) {
    setLoading(true);
    try {
      const result = await signIn.email({
        email: data.email,
        password: data.password,
      });

      if (result.error) {
        toast.error(result.error.message || "Unable to sign in");
      } else {
        toast.success("Signed in");
        router.push("/dashboard");
        router.refresh();
      }
    } catch (err: any) {
      console.error(err);
      toast.error(err?.message || "An unexpected error occurred");
    } finally {
      setLoading(false);
    }
  }

  return (
    <Card className="w-full max-w-sm bg-white/5">
      <CardHeader>
        <CardTitle className="text-center font-black">Sign In</CardTitle>
      </CardHeader>

      <form onSubmit={handleSubmit(onSubmit)}>
        <CardContent>
          <div className="flex flex-col gap-6">
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="balag@puffcontent.hu"
                {...register("email")}
              />
              {errors.email && (
                <p className="text-sm text-red-400">{errors.email.message}</p>
              )}
            </div>

            <div className="grid gap-2">
              <Label htmlFor="password">Password</Label>
              <Input id="password" type="password" {...register("password")} />
              {errors.password && (
                <p className="text-sm text-red-400">
                  {errors.password.message}
                </p>
              )}
            </div>
            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? "Signing in…" : "Sign In"}
            </Button>
          </div>
        </CardContent>

        <CardFooter className="flex-col gap-2 mt-6">
            <CardDescription className="text-center text-sm">
                Don't have an account?{" "}
                <Link href="/register" className="text-yellow hover:underline">
                    Sign up
                </Link>
            </CardDescription>
        </CardFooter>
      </form>
    </Card>
  );
}