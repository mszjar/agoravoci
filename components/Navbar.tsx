"use client";

import { useRouter } from "next/navigation";
import { twMerge } from "tailwind-merge";
import Button from "./Button";
import useAuthModal from "@/hooks/useAuthModal";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { useUser } from "@/hooks/useUser";
import { FaUserAlt } from "react-icons/fa";
import toast from "react-hot-toast";
import usePlayer from "@/hooks/usePlayer";
import { usePathname } from "next/navigation";
import { useMemo } from "react";
import { HiHome } from "react-icons/hi";
import { BiSearch } from "react-icons/bi";
import { AiFillHeart } from "react-icons/ai";
import NavbarItem from "./NavbarItem";
import Image from "next/image";


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
  const { user } = useUser();

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
        icon: HiHome,
        label: "Home",
        active: pathname !== "/search" && pathname !== "/liked",
        href: "/",
      },
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

  return (
    <div
      className={twMerge(`
        h-fit
        bg-gradient-to-b
        from-gray-500
        p-6
      `, className)}
    >
      <div className="
        w-full
        mb-4
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
            <Image
              src="/images/liked.png"
              alt="logo"
              width="55"
              height="55"
            />
            <p>Agoravoci</p>
          </div>
          {/* Navbar Items */}
          <div className="flex gap-x-2 items-center">
            {routes.map((item) => (
              <NavbarItem key={item.label} {...item}/>
            ))}
          </div>
          { user ? (
            <div className="flex gap-x-4 items-center">
              <Button
                onClick={handleLogout}
                className="bg-white px-6 py-2"
              >
                Logout
              </Button>
              <Button
                onClick={() => router.push("/account")}
                className="bg-white"
              >
                <FaUserAlt/>
              </Button>
            </div>
          ) : (
            <>
              <div>
                <Button
                  onClick={authModal.onOpen}
                  className="
                  bg-transparent
                  text-neutral-300
                  font-medium
                ">
                  Sign up
                </Button>
              </div>
              <div>
                <Button
                  onClick={authModal.onOpen}
                  className="
                  bg-white
                  px-6
                  py-2
                ">
                  Log in
                </Button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
   );
}

export default Navbar;
