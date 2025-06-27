import React from "react";
import HeroImg from "../../assets/Form Image.png";
const Hero = () => {
  return (
    <div className="flex gap-10 justify-between hero-container px-36">
      <div className="infos mt-36 max-w-fit">
        <h1 className="font-bold text-4xl">
          Empowering Accessibility through Digital Transformation
        </h1>
        <p>
          Register, Verify, and Access Services Seamlessly - For All persons
          with Disability in Kenya
        </p>
        <div className="buttons flex flex-col gap-4 mt-4">
            <button className="bg-blue-500 text-white py-2 px-4 rounded-3xl max-w-fit">
            Register Now as a PWD/Guardian
        </button>
        <button className="bg-green-500 text-white py-2 px-4 rounded-3xl max-w-fit">
          Medical and County Officer Login
        </button>
        <button className="bg-white border-2 border-black text-black py-2 px-4 rounded-3xl max-w-fit">
          Verify Certificate
        </button>
      </div>

        </div>

      <div className="hero-pic">
        <img src={HeroImg} alt="Hero" />
      </div>
    </div>
  );
};

export default Hero;
