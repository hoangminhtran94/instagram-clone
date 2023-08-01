import Image from "next/image";
import Link from "next/link";
const Logo = () => {
  return (
    <Link className=" px-4 py-10 w-full h-fit cursor-pointer" href={"/"}>
      <Image
        src={"/images/fontbolt.png"}
        alt="logo"
        width={600}
        height={130}
        className="object-cover w-1/2 h-full"
      />
    </Link>
  );
};

export default Logo;
