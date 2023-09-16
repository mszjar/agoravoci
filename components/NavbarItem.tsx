import Link from 'next/link';
import { IconType } from 'react-icons';
import { twMerge } from 'tailwind-merge';

interface NavbarItemProps {
  icon: IconType;
  label: string;
  active?: boolean;
  href: string;
}

const NavbarItem: React.FC<NavbarItemProps> = ({
  icon: Icon,
  label,
  active,
  href
}) => {
  return (
    <Link
      href={href}
      className={twMerge(`
        flex
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
        py-1`,
        active && "text-gray-500"
        )
      }
    >
      <Icon size={26} />
      <p className="hidden truncate w-100">{label}</p>
    </Link>
   );
}

export default NavbarItem;
