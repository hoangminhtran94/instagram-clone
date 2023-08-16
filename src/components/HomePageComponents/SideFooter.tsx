import Link from "next/link";
const SideFooter = () => {
  return (
    <footer className="flex flex-col gap-5 py-5 w-full opacity-80 text-slate-500 ">
      <nav className=" text-sm">
        <ul className="flex flex-wrap gap-1 ">
          <li>
            <Link href={"#"}>About</Link> •
          </li>
          <li>
            <Link href={"#"}>Help</Link> •
          </li>
          <li>
            <Link href={"#"}>Press</Link> •
          </li>
          <li>
            <Link href={"#"}>API</Link> •
          </li>
          <li>
            <Link href={"#"}>Jobs</Link> •
          </li>
          <li>
            <Link href={"#"}>Privacy</Link> •
          </li>
          <li>
            <Link href={"#"}>Terms</Link> •
          </li>
          <li>
            <Link href={"#"}>Locations</Link> •
          </li>
          <li>
            <Link href={"#"}>Languages</Link>
          </li>
        </ul>
      </nav>
      <div>© 2023 INSTACLONE FROM Minh Hoang Tran</div>
    </footer>
  );
};

export default SideFooter;
