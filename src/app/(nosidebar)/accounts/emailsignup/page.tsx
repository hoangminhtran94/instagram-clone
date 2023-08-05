"use client";
import { FC, FormEvent } from "react";
import Link from "next/link";
import Image from "next/image";
import FloatingInput from "@/components/UI/InputComponents/FloatingInput";
import { useAuthContext } from "@/context/authContext";

const EmailSignup = () => {
  const authContext = useAuthContext();
  const signup = async (e: FormEvent) => {
    e.preventDefault();
    const formdata = new FormData(e.target as HTMLFormElement);

    try {
      const res = await fetch("/api/auth/register", {
        body: formdata,
        method: "POST",
      });
      if (res.ok) {
        const data = await res.json();
        console.log(data);
        authContext.login(data.user, data.token);
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="flex flex-col w-[350px] gap-5">
      <div className=" p-10 border flex flex-col gap-3 ">
        <div className="w-[70%] mx-auto h-[100px] relative">
          <Image
            className=" object-contain"
            src="/images/fontbolt.png"
            alt="logo"
            fill
          />
        </div>
        <div className="flex flex-col gap-4">
          <p className=" text-center">
            Sign up to see photos and videos from your friends.
          </p>
          <button className="btn-primary-light">Login with Facebook</button>
        </div>
        <div className="flex items-center">
          <div className="h-[1px] bg-slate-400 flex-1"></div>
          <div className="px-2">OR</div>
          <div className="h-[1px] bg-slate-400 flex-1"></div>
        </div>
        <div>
          <form className="flex flex-col gap-2" onSubmit={signup}>
            <FloatingInput name="email" label="Mobile Number or Email" />
            <FloatingInput name="fullName" label="Full Name" />
            <FloatingInput name="username" label="Username" />
            <FloatingInput name="password" label="Password" />
            <p className="text-xs text-slate-500 text-center">
              People who use our service may have uploaded your contact
              information to Instagram.
              <a className="text-slate-800" href="/help" target="_blank">
                Learn More
              </a>
            </p>
            <p className="text-xs text-slate-500 text-center">
              By signing up, you agree to our Terms ,{" "}
              <a className="text-slate-800" href="/help" target="_blank">
                Privacy Policy and Cookies Policy
              </a>{" "}
              .
            </p>
            <button className="btn-primary-light">Sign up</button>
          </form>
        </div>
      </div>
      <div className="p-10 border text-sm text-center">
        Have an account?{" "}
        <Link className=" text-cyan-500 " href="/login">
          Log in
        </Link>
      </div>
    </div>
  );
};
export default EmailSignup;
