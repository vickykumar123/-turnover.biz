"use client";

import Link from "next/link";
import {useRouter} from "next/navigation";
import React, {useState} from "react";

function SignIn() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  async function handleSubmit(e: React.FormEvent<EventTarget>) {
    e.preventDefault();
    let userData = {
      name,
      email,
      password,
    };

    // Make call to backend to create user
    const res = await fetch("/api/sign-up", {
      method: "POST",
      body: JSON.stringify(userData),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await res.json();
    if (data) {
      router.push("/dashboard");
    }
  }
  return (
    <div className="w-full flex items-center justify-center p-3 mt-4 box-border">
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-md px-8 pt-6 pb-8 mb-4 h-[691px] w-[576px] rounded-[20px] border-[1px] border-[#C1C1C1] space-y-10 flex flex-col items-center"
      >
        <h2 className="text-center text-[32px] font-[600]">
          Create your account
        </h2>
        <div className=" h-[74px]">
          <label
            className="  text-[16px] font-[400] mb-2 flex flex-col"
            htmlFor="name"
          >
            Name
          </label>
          <input
            className={`shadow appearance-none border-[1px] border-[#C1C1C1] rounded-[6px] w-[456px] py-2 px-3  leading-tight focus:outline-none focus:shadow-outline`}
            id="name"
            type="text"
            placeholder="Name"
            onChange={(e) => {
              setName(e.target.value);
            }}
          />
        </div>

        <div className="mb-4">
          <label
            className="  text-[16px] font-[400] mb-2 flex flex-col"
            htmlFor="email"
          >
            Email
          </label>
          <input
            className={`shadow appearance-none border-[1px] border-[#C1C1C1] rounded-[6px] w-[456px] py-2 px-3  leading-tight focus:outline-none focus:shadow-outline`}
            id="email"
            type="email"
            placeholder="Email"
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
        </div>
        <div className="mb-6">
          <label
            className="  text-[16px] font-[400] mb-2 flex flex-col"
            htmlFor="password"
          >
            Password
          </label>
          <input
            className={`shadow appearance-none border-[1px] border-[#C1C1C1] rounded-[6px] w-[456px] py-2 px-3  leading-tight focus:outline-none focus:shadow-outline`}
            id="password"
            type="password"
            placeholder="***********"
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
        </div>

        <div className="flex items-center justify-between">
          <button
            className="bg-black text-white  p-2 rounded-md uppercase w-[456px]"
            type="submit"
          >
            Create Account
          </button>
        </div>
        <div>
          <Link
            href="/login"
            className="text-center text-[16px] font-[400] hover:underline"
          >
            Have an Account? <span className="font-[500]">LOGIN</span>
          </Link>
        </div>
      </form>
    </div>
  );
}

export default SignIn;
