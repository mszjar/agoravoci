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
    .eq("id", `${id}`)
    .limit(1)
    .single();

  if (error) {
    console.log(error.message);
  }

  return (data as any) || [];
};

export default getSong;
