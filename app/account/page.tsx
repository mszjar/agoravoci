import AccountContent from "./components/AccountContent";
import Navbar from "@/components/Navbar";

const Account = () => {
  return (
    <div className="
      bg-neutral-900
      rounded-lg
      h-full
      w-full
      overflow-hidden
      overflow-y-auto
    ">
      <AccountContent/>
    </div>
   );
}

export default Account;
