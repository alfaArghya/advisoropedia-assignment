import Navbar from "./Navbar";
const Homepage = () => {
  return (
    <div>
      <Page1 />
    </div>
  );
};

const Page1 = () => {
  return (
    <div
      style={{
        backgroundImage: `radial-gradient(ellipse, #0000, #0007),
        linear-gradient(0deg, #9703, #9501),url('https://advisoropedia.in/wp-content/uploads/2024/02/Affordable-homes-in-thriving-communities-1.png')`,
        backgroundSize: "cover",
        backgroundAttachment: "fixed",
        backgroundPosition: "center",
        height: "30rem",
      }}
      className=""
    >
      <Navbar />
      <div className="w-10/12 pl-8 mx-auto">
        <h3 className="text-5xl font-bold text-slate-50 pt-20 mx-auto">
          Creative & Innovative Ideas
        </h3>
        <h3 className="text-sm font-bold text-slate-50 pt-3.5">
          All Industries - One Solution
        </h3>
      </div>
    </div>
  );
};

export default Homepage;
