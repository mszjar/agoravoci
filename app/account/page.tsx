import AccountContent from "./components/AccountContent";
import EndSession from "./components/EndSession";
import UploadContent from "./components/UploadContent";

const Account = () => {
  return (
    <div className="
      bg-gradient-to-b
    from-slate-100
      rounded-xl
      h-full
      w-full
      overflow-hidden
      overflow-y-auto
    ">
      <UploadContent/>
      <AccountContent/>
      <EndSession/>
    </div>
   );
}

export default Account;
