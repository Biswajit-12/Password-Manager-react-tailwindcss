

const Navbar = () => {
  return (
    <nav className="bg-slate-800 text-white ">
      <div className=" mycontainer flex justify-between items-center px-20 h-12 py-5">
        <div className="logo font-bold text-white text-2xl ">
          <span className="text-green-500">&lt;</span>
          Pass
          <span className="text-green-500">OP/&gt;</span>
        </div>
        {/* <ul>
          <li className="flex gap-4">
            <a className="hover:font-bold" href="/">
              Home
            </a>
            <a className="hover:font-bold" href="#">
              About
            </a>
            <a className="hover:font-bold" href="#">
              Contact
            </a>
          </li>
        </ul> */}
        <button className="text-white bg-green-700 flex my-1 rounded-full justify-between items-center ring-white ring-1">
            <img className="p-1 invert" src="/icons/github.png" alt="github logo" />
            <a href="https://github.com/Biswajit-12" target="_blank" className="font-bold px-2">GitHub</a>
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
