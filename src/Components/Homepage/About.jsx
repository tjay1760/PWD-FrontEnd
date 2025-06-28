import React from "react";
import { Light, Shield, CreditCard, Face, Folder } from "@mui/icons-material";

const About = () => {
  return (
    <div id="about" className="about bg-gray-100 px-36 text-center py-10">
      <h1 className="font-bold font-serif text-6xl text-blue-800">
        What is the PWD Registration System
      </h1>
      <p>
        The system offers a secure centralized platform for registering acessing
        and veryfying people with disabilities. it enhances service access,
        prevents fraud and promotes inclusion through digital innovation
      </p>
      <div className="cards grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 mt-8">
        <div className="card bg-white p-10 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 flex flex-col gap-6">
          <div className="bg-green-600 text-white p-4 rounded-full max-w-fit">
            <Light />
          </div>

          <p className="font-bold text-xl text-start">Centralized registration for PWDs</p>
        </div>
        <div className="card bg-white p-10 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 flex flex-col gap-6">
          <div className="bg-green-600 text-white p-4 rounded-full max-w-fit">
            <Shield />
          </div>

          <p className="font-bold text-xl text-start">Tracking and updates in real-time</p>
        </div>
        <div className="card bg-white p-10 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 flex flex-col gap-6">
          <div className="bg-green-600 text-white p-4 rounded-full max-w-fit">
            <CreditCard />
          </div>

          <p className="font-bold text-xl text-start">Credit Card symbolizes financial transactions and support.</p>
        </div>
        <div className="card bg-white p-10 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 flex flex-col gap-6">
          <div className="bg-green-600 text-white p-4 rounded-full max-w-fit">
            <Face />
          </div>

          <p className="font-bold text-xl text-start">Accessibility features for diverse impairments </p>
        </div>
        <div className="card bg-white p-10 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 flex flex-col gap-6">
          <div className="bg-green-600 text-white p-4 rounded-full max-w-fit">
            <Folder />
          </div>

          <p className="font-bold text-xl text-start">Certificate authenticity checker for organizations</p>
        </div>
      </div>
    </div>
  );
};

export default About;
