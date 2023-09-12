import { Song } from "@/types";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

const getSong = async (id: string): Promise<Song> => {
  const supabase = createServerComponentClient({
    cookies: cookies,
  });

  const { data, error } = await supabase
    .from("songs")
    .select()
<<<<<<< HEAD
    .eq("id", `${id}`)
    .limit(1)
    .single();
=======
    .eq("id", `${id}`);
>>>>>>> 41a69eacea808873ab6d22032b4368263cf5468d

  if (error) {
    console.log(error.message);
  }

  return (data as any) || [];
};

export default getSong;
