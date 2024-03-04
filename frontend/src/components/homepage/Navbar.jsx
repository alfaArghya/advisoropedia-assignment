import "./Navbar.css";

const Navbar = () => {
  return (
    <>
      <div className="navbar bg-transparent px-8">
        <div className="navbar-start">
          <a className="cursor-pointer">
            <img
              src="https://advisoropedia.in/wp-content/uploads/2024/02/cropped-White-Transparent.png"
              alt=""
              height={104}
              width={150}
            />
          </a>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="flex  text-sm text-slate-100   ">
            <li className="popup-text px-4 cursor-pointer ">
              <a>Home</a>
            </li>
            <li className="popup-text px-4 cursor-pointer ">
              <a>Blog</a>
            </li>
            <li className="popup-text px-4 cursor-pointer hover:text-white ">
              <a>About</a>
            </li>
            <li className="popup-text px-4 cursor-pointer hover:text-white ">
              <a>What We Do</a>
            </li>
            <li className="popup-text px-4 cursor-pointer hover:text-white ">
              <a>Contact Us</a>
            </li>
          </ul>
        </div>
        <div className="navbar-end">
          <a className="btn btn-ghost mr-2 text-slate-300 hover:text-white hover:bg-transparent">
            Sign In
          </a>
          <a className="btn bg-slate-300 text-black border-transparent hover:bg-slate-700 hover:text-white hover:border-transparent">
            Sign Up
          </a>
        </div>
      </div>
    </>
  );
};

export default Navbar;
