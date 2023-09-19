import { User } from "@/types";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

const getUsers = async (): Promise<User[]> => {
  const supabase = createServerComponentClient({
    cookies: cookies,
  });

  const { data, error } = await supabase.from("users").select("*");

  if (error) {
    console.log(error.message);
  }

  return (data as any) || [];
};

export default getUsers;
