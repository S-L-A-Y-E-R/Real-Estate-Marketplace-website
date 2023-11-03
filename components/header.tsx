import { BiSearch } from "react-icons/bi";
import Navbar from "./navbar";

export default function Header() {
  return (
    <header className="bg-[#E2E8F0] shadow-xl py-5">
      <div className="container flex justify-between items-center gap-4 mx-auto">
        <div>
          <span className="font-semibold text-[#64748B] md:text-2xl">
            Trend
          </span>
          <span className="font-semibold text-[#334155] md:text-2xl">
            Estate
          </span>
        </div>
        <div className="flex items-center bg-[#F1F5F9] pr-3 rounded-lg">
          <input
            type="search"
            placeholder="Search..."
            name="search"
            className="outline-none bg-transparent py-2 px-3 w-24 md:w-full"
          />
          <button>
            <BiSearch className="text-lg" />
          </button>
        </div>
        <Navbar />
      </div>
    </header>
  );
}
