import Posts from "@/components/UI/Posts";

export default async function HomePage() {
  const posts = [{ id: 1 }, { id: 2 }, { id: 3 }];

  return (
    <div>
      <Posts posts={posts} />
    </div>
  );
}
