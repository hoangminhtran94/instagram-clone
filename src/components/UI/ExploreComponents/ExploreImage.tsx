import Image from "next/image";
const ExploreImage = () => {
  return (
    <div className="w-1/3 pb-[100%]">
      <Image
        src="https://images.unsplash.com/photo-1690151711465-2bfe4e69f241?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=822&q=80"
        fill
        alt="anImage"
      />
    </div>
  );
};

export default ExploreImage;
