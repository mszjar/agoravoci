"use client";

import { useRouter } from "next/navigation";
import { twMerge } from "tailwind-merge";
import Button from "./Button";
import useAuthModal from "@/hooks/useAuthModal";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { useUser } from "@/hooks/useUser";
// import { FaUserAlt } from "react-icons/fa";
import toast from "react-hot-toast";
import usePlayer from "@/hooks/usePlayer";
import { usePathname } from "next/navigation";
import { useMemo } from "react";
// import { HiHome } from "react-icons/hi";
import { BiSearch } from "react-icons/bi";
import { AiFillHeart } from "react-icons/ai";
import { AiOutlinePlus } from "react-icons/ai";
import NavbarItem from "./NavbarItem";
import Image from "next/image";
import Link from "next/link";
import useUploadModal from "@/hooks/useUploadModal";
import useSubscribeModal from "@/hooks/useSubscribeModal";


interface NavbarProps {
  className?: string;
}

const Navbar: React.FC<NavbarProps> = ({
  className
}) => {
  const player = usePlayer();
  const authModal = useAuthModal();
  const router = useRouter();

  const supabaseClient = useSupabaseClient();
  const { user, subscription } = useUser();

  const handleLogout = async () => {
    const { error } = await supabaseClient.auth.signOut();
    player.reset();
    router.refresh();

    if (error) {
      toast.error(error.message);
    } else {
      toast.success("Logged out!");
    }
  }

  const pathname = usePathname();

  const routes = useMemo(
    () => [
      {
        icon: BiSearch,
        label: "Search",
        active: pathname === "/search",
        href: "/search",
      },
      {
        icon: AiFillHeart,
        label: "Liked",
        active: pathname === "/liked",
        href: "/liked",
      },
    ],
    [pathname]
  );

  const subscribeModal = useSubscribeModal();
  const uploadModal = useUploadModal();

  const onClick = () => {
    if (!user) {
      return authModal.onOpen();
    }

    if (!subscription) {
      return subscribeModal.onOpen();
    }

    return uploadModal.onOpen();
  };

  return (
    <div
      className={twMerge(`
        h-[70px]
        pt-4
        px-6
      `, className)}
    >
      <div className="
        w-full
        flex
        items-center
        justify-between
      ">
        <div className="
          flex
          justify-between
          items-center
          gap-x-4
        ">
          <div className="flex items-center gap-2">
            <Link href='/'>
              <Image
                src="/images/logo.svg"
                alt="logo"
                width="45"
                height="45"
              />
              </Link>
              <div className='flex justify-between items-center'>
                <Link href='/'>
                  <h1 className='text-black text-2xl font-semibold'>
                    Agoravoci
                  </h1>
                </Link>
              </div>
            </div>
          </div>

          <div>
          { user ? (
            <div className="flex gap-x-4 items-center">
              {/* Navbar Items */}
              <div className="flex justify-items-end gap-x-2 items-center">
                  {routes.map((item) => (
                    <NavbarItem key={item.label} {...item}/>
                  ))}
                  <AiOutlinePlus
                    onClick={onClick}
                    size={26}
                    className="flex
                    flex-row
                    h-auto
                    items-center
                    w-full
                    gap-x-4
                    text-md
                    font-medium
                    cursor-pointer
                    hover:text-gray-500
                    transition
                    text-neutral-100
                    py-1`
                    "
                  />
              </div>
              <div
                onClick={() => router.push("/account")}
              >
                {/* User image */}
                <Image
                  src={user.user_metadata.avatar_url ?? "/images/liked.png"}
                  alt="user"
                  width="45"
                  height="45"
                  className="rounded-full"
                >
                </Image>
              </div>
            </div>
          ) : (
            <div className="flex gap-x-4 items-center">
              <div>
                <Button
                  onClick={authModal.onOpen}
                  className="
                  bg-transparent
                  text-gray-200
                  font-small
                ">
                  Sign up
                </Button>
              </div>
              <div>
                <Button
                  onClick={authModal.onOpen}
                  className="
                  bg-gray-200
                  px-2
                  py-2
                ">
                  Log in
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
   );
}

export default Navbar;
