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
        "background-image": `radial-gradient(ellipse, #0000, #0007),
        linear-gradient(0deg, #9703, #9501),url('https://advisoropedia.in/wp-content/uploads/2024/02/Affordable-homes-in-thriving-communities-1.png')`,
        "background-repeat": "no-repeat",
        "background-attachment": "fixed",
        "background-position": "center",
        height: "30rem",
      }}
      className="bg-blend-multiply"
    >
      <Navbar />
      <h3 className="text-5xl font-bold text-slate-50 pt-20 pl-8">
        Creative & Innovative Ideas
      </h3>
      <h3 className="text-sm font-bold text-slate-50 pt-3.5 pl-10">
        All Industries - One Solution
      </h3>
    </div>
  );
};

export default Homepage;
