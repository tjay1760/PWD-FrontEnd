import React from "react";
import HeroImg from "../../assets/Form Image.png";
const Hero = ({onRegisterClick, onLoginClick}) => {
  return (
    <div className="flex gap-10 justify-between hero-container px-36" id="home">
      <div className="infos my-auto max-w-fit">
        <h1 className="font-bold text-6xl font-serif mb-5">
          Empowering Accessibility through Digital Transformation
        </h1>
        <p>
          Register, Verify, and Access Services Seamlessly - For All persons
          with Disability in Kenya
        </p>
        <div className="buttons flex flex-col gap-4 mt-4">
            <button className="bg-blue-800 text-white py-2 px-4 rounded-3xl max-w-fit"
            onClick={onRegisterClick}>
            Register Now as a PWD/Guardian
        </button>
        <button className="bg-green-500 text-white py-2 px-4 rounded-3xl max-w-fit"
        onClick={onLoginClick}>
          Medical and County Officer Login
        </button>
        <a className="bg-white border-2 border-black text-black py-2 px-4 rounded-3xl max-w-fit" href="#verify">
          Verify Certificate
        </a>
      </div>

        </div>

      <div className="hero-pic">
        <img src={HeroImg} alt="Hero" />
      </div>
    </div>
  );
};

export default Hero;
