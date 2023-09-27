import getSongs from "@/actions/getSongs";
import getUsers from "@/actions/getUsers";
import PageContent from "./components/PageContent";

// this page will always be server-side rendered, no cache
export const revalidate = 0;

export default async function Home() {
  const songs = await getSongs();

  const users = await getUsers();

  return (
    <div
      className="
      bg-gradient-to-b
      from-slate-100 to-white
      rounded-xl
      h-full
      w-full
      overflow-hidden
      overflow-y-auto
    "
    >
      <div className="mt-2 mb-7 px-6">
        <PageContent songs={songs} users={users} />
      </div>
    </div>
  );
}
