import React from "react";
import Hero from "./Hero";
import About from "./About";
import Navigation from "./Navigation";
import OurUsers from "./OurUsers";
import Steps from "./Steps";
import Contact from "./Contact";
import Footer from "./Footer";

const HomePage = () => {
  return (
    <div>
      <Navigation />
      <Hero />
      <About />
      <Steps />
        <OurUsers />
      <Contact />
      <Footer />
    </div>
  );
};

export default HomePage;
