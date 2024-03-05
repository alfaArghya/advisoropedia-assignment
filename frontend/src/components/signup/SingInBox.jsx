import React from "react";

const SingInBox = () => {
  return (
    <>
      <div className=" w-80 h-11 mt-2 rounded-lg bg-base-300 flex flex-row items-center justify-center">
        <p className="pr-2 text-black">Already have a account?</p>{" "}
        <a
          href="#"
          className="text-[#B43041] font-semibold hover:underline decoration-[#B43041] "
        >
          Sign in
        </a>
      </div>
    </>
  );
};

export default SingInBox;
