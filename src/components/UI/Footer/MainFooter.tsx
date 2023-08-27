import Link from "next/link";

const MainFooter = () => {
  return (
    <div className="flex flex-col items-center mb-10 mt-auto text-xs font-light">
      <div className="flex gap-2 leading-10 ">
        <Link href="#">Meta</Link>
        <Link href="#">About</Link>
        <Link href="#">Blog</Link>
        <Link href="#">Jobs</Link>
        <Link href="#">Help</Link>
        <Link href="#">Privacy</Link>
        <Link href="#">Terms</Link>
        <Link href="#">Top Accounts</Link>
        <Link href="#">Locations</Link>
      </div>
      <div className="leading-10">© 2023 Instaclone from Minh Hoang Tran</div>
    </div>
  );
};
export default MainFooter;
