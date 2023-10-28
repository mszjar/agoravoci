"use client";

import { useRouter } from "next/navigation";
import { twMerge } from "tailwind-merge";
import Button from "./Button";
import useAuthModal from "@/hooks/useAuthModal";
import { useUser } from "@/hooks/useUser";
import { usePathname } from "next/navigation";
import { useMemo } from "react";
import { BiSearch } from "react-icons/bi";
import { AiFillHeart } from "react-icons/ai";
import NavbarItem from "./NavbarItem";
import Image from "next/image";
import Link from "next/link";


interface NavbarProps {
  className?: string;
}

const Navbar: React.FC<NavbarProps> = ({
  className
}) => {
  const authModal = useAuthModal();
  const router = useRouter();

  const { user } = useUser();

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
                width="35"
                height="35"
              />
              </Link>
              <div className='flex justify-between items-center'>
                <Link href='/'>
                  <h1 className='text-black text-xl font-semibold'>
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
                  className="rounded-full cursor-pointer"
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
                  bg-slate-200
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
