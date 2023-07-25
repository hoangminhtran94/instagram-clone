import Image from "next/image";
const TopReels = () => {
  return (
    <div className="w-full relative pb-[100%]">
      <Image
        fill
        className="absolute top-0 right-0 object-cover rounded-md shadow-sm"
        src={
          "https://images.unsplash.com/photo-1532339142463-fd0a8979791a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1740&q=80"
        }
        alt={"random-image"}
      />
    </div>
  );
};
export default TopReels;
