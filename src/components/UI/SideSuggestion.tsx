import Link from "next/link";
import Image from "next/image";
const SideSuggestion = () => {
  return (
    <div className="w-full flex flex-col gap-5 text-xs">
      <div className="flex gap-3">
        <p className=" text-slate-500  font-bold flex-1">Suggested for you</p>
        <Link className="px-3 font-bold" href={"#"}>
          See all
        </Link>
      </div>
      <div className="flex gap-3">
        <div>
          <Image
            width={32}
            height={32}
            src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8ODJ8fGF2YXRhcnxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=500&q=60"
            alt="profile-image"
            className=" w-8 h-8 rounded-full object-cover bg-center"
          />
        </div>
        <div className="flex-1">
          <p className="font-bold">Minh Hoang Tran</p>
          <p className="">Followed by...</p>
        </div>
        <button className="px-3 text-blue-400 font-bold">Follow</button>
      </div>
      <div className="flex gap-3">
        <div>
          <Image
            width={32}
            height={32}
            src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8ODJ8fGF2YXRhcnxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=500&q=60"
            alt="profile-image"
            className=" w-8 h-8 rounded-full object-cover bg-center"
          />
        </div>
        <div className="flex-1">
          <p className="font-bold">Minh Hoang Tran</p>
          <p className="">Followed by...</p>
        </div>
        <button className="px-3 text-blue-400 font-bold">Follow</button>
      </div>
    </div>
  );
};

export default SideSuggestion;
