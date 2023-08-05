"use client";
import { FC, FormEvent } from "react";
import Link from "next/link";
import Image from "next/image";
import FloatingInput from "@/components/UI/InputComponents/FloatingInput";
import { useAuthContext } from "@/context/authContext";

const Login = () => {
  const authContext = useAuthContext();
  const login = async (e: FormEvent) => {
    e.preventDefault();
    const formdata = new FormData(e.target as HTMLFormElement);

    try {
      const res = await fetch("/api/auth/login", {
        body: formdata,
        method: "POST",
      });
      if (res.ok) {
        const data = await res.json();
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

        <div>
          <form className="flex flex-col gap-2" onSubmit={login}>
            <FloatingInput
              name="emailOrUsername"
              label="Phone number, username or email"
            />
            <FloatingInput name="password" label="Password" type="password" />
            <button className="btn-primary-light">Login</button>
          </form>
        </div>
        <div className="flex items-center text-sm">
          <div className="h-[1px] bg-slate-400 flex-1"></div>
          <div className="px-2 ">OR</div>
          <div className="h-[1px] bg-slate-400 flex-1"></div>
        </div>
        <div className="flex flex-col gap-4 text-xs">
          <a className=" font-bold text-blue-900 flex gap-2 items-center justify-center ">
            <svg
              className="h-[20px]"
              viewBox="0 0 48 48"
              version="1.1"
              xmlns="http://www.w3.org/2000/svg"
              xmlnsXlink="http://www.w3.org/1999/xlink"
            >
              <title>Facebook-color</title>
              <desc>Created with Sketch.</desc>
              <defs></defs>
              <g
                id="Icons"
                stroke="none"
                strokeWidth="1"
                fill="none"
                fillRule="evenodd"
              >
                <g
                  id="Color-"
                  transform="translate(-200.000000, -160.000000)"
                  fill="#4460A0"
                >
                  <path
                    d="M225.638355,208 L202.649232,208 C201.185673,208 200,206.813592 200,205.350603 L200,162.649211 C200,161.18585 201.185859,160 202.649232,160 L245.350955,160 C246.813955,160 248,161.18585 248,162.649211 L248,205.350603 C248,206.813778 246.813769,208 245.350955,208 L233.119305,208 L233.119305,189.411755 L239.358521,189.411755 L240.292755,182.167586 L233.119305,182.167586 L233.119305,177.542641 C233.119305,175.445287 233.701712,174.01601 236.70929,174.01601 L240.545311,174.014333 L240.545311,167.535091 C239.881886,167.446808 237.604784,167.24957 234.955552,167.24957 C229.424834,167.24957 225.638355,170.625526 225.638355,176.825209 L225.638355,182.167586 L219.383122,182.167586 L219.383122,189.411755 L225.638355,189.411755 L225.638355,208 L225.638355,208 Z"
                    id="Facebook"
                  ></path>
                </g>
              </g>
            </svg>
            Login with Facebook
          </a>
          <Link
            className="text-center text-indigo-900"
            href="/accounts/password/reset"
          >
            Forgot password?
          </Link>
        </div>
      </div>
      <div className="p-10 border text-sm text-center">
        {`Don't have any account? `}
        <Link className="font-bold text-cyan-800 " href="/accounts/signup">
          Sign up
        </Link>
      </div>
    </div>
  );
};
export default Login;
