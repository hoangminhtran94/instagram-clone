import Image from "next/image";
import Link from "next/link";
const TopReelItem = () => {
  return (
    <Link href={"#"} className="flex flex-col items-center  gap-3">
      <Image
        width={80}
        height={80}
        className=" w-14 h-14 rounded-full object-cover shadow-sm "
        src={
          "https://images.unsplash.com/photo-1532339142463-fd0a8979791a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1740&q=80"
        }
        alt={"random-image"}
      />

      <p className="text-sm">minhhoang</p>
    </Link>
  );
};
export default TopReelItem;
