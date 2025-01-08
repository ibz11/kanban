import { FaCode } from "react-icons/fa";

const Navbar = () => {
    return (
        <nav className="bg-[#001524] text-white h-14 shadow-lg py-2 px-2 flex space-between gap-2">
            <div><a href="" className="text-2xl font-bold">KANBAN</a></div>
        
        <div className="flex  py-1.5 w-full justify-end">
        <a href="" className="hover:underline flex gap-2 "><FaCode className="text-xl mt-1" /> by Ibrahim</a>
        </div>


       </nav>
    );
}

export default Navbar;
