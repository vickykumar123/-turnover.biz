"use client";

import Input from "@/components/ui/Input";
import {trpc} from "@/trpc/client";
import Link from "next/link";
import {useRouter} from "next/navigation";
import React, {useState} from "react";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();
  const {mutate, isPending} = trpc.auth.signIn.useMutation({
    onSuccess: () => {
      router.push("/dashboard");
      router.refresh();
    },
    onError: (err) => {
      console.log(err.message);
    },
  });

  const isLoading = isPending;

  async function handleSubmit(e: React.FormEvent<EventTarget>) {
    e.preventDefault();
    let userData = {
      email,
      password,
    };
    mutate(userData);
  }

  return (
    <div className="w-full flex items-center justify-center p-3 mt-4 box-border">
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-md px-8 pt-6 pb-8 mb-4 h-[614px] w-[576px] rounded-[20px] border-[1px] border-[#C1C1C1] space-y-10 flex flex-col items-center"
      >
        <div className="text-center text-[32px] font-[600] space-y-7">
          <section>Login</section>
          <section>
            <h2 className="text-[24px] font-[500]">
              Welcome back to ECOMMERCE
            </h2>
            <p className="text-[16px] font-[400]">
              The next gen business marketplace
            </p>
          </section>
        </div>

        <Input
          label="Email"
          onChange={(e) => {
            setEmail(e.target.value);
          }}
        />
        <Input
          label="Password"
          onChange={(e) => {
            setPassword(e.target.value);
          }}
          isPasswordInput={true}
        />

        <div className="flex items-center justify-between">
          <button
            className="bg-black text-white  p-2 rounded-md uppercase w-[456px] disabled:opacity-80"
            disabled={isLoading}
          >
            {isLoading ? "Logging..." : "Login"}
          </button>
        </div>
        <hr className="border-[1px] border-[#C1C1C1] w-[456px]" />
        <div>
          <Link
            href="/register"
            className="text-center text-[16px] font-[400] hover:underline"
          >
            Don&apos;t have an Account?{" "}
            <span className="font-[500]">SIGN UP</span>
          </Link>
        </div>
      </form>
    </div>
  );
}

export default Login;
