import { FC } from "react";
import Link from "next/link";
import Image from "next/image";
const EmailSignup = () => {
  return (
    <div>
      <div className="w-full h-[100px]">
        <Image
          className=" object-contain"
          src="/images/fontbolt.png"
          alt="logo"
          fill
        />
      </div>
      <div className="flex flex-col gap-2">
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
        <form>
          <div>
            <input placeholder="Mobile Number or Email" />
          </div>
          <div>
            <input placeholder="Fullname" />
          </div>
          <div>
            <input placeholder="Username" />
          </div>
          <div>
            <input placeholder="Password" />
          </div>
          <p>
            People who use our service may have uploaded your contact
            information to Instagram.
            <a href="/help" target="_blank">
              Learn More
            </a>
          </p>
          <p>
            By signing up, you agree to our Terms ,{" "}
            <a href="/help" target="_blank">
              Privacy Policy and Cookies Policy
            </a>{" "}
            .
          </p>
          <button className="btn-primary-light">Sign up</button>
        </form>
      </div>

      <div>
        Have an account? <Link href="/login">Log in</Link>
      </div>
    </div>
  );
};
export default EmailSignup;
