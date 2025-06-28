import React from "react";
import Hero from "./Hero";
import About from "./About";
import Navigation from "./Navigation";
import OurUsers from "./OurUsers";
import Steps from "./Steps";
import Contact from "./Contact";
import Footer from "./Footer";

const HomePage = ({onLoginClick, onRegisterClick}) => {
  return (
    <div>
      <Navigation />
      <Hero onLoginClick={onLoginClick} onRegisterClick={onRegisterClick} />
      <About />
      <Steps />
        <OurUsers />
      <Contact />
      <Footer />
    </div>
  );
};

export default HomePage;
