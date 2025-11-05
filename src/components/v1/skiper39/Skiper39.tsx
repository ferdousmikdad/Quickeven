import React from "react";
import CrowdCanvas from "./CrowdCanvas";

const Skiper39 = () => {
  return (
    <div className="relative h-screen w-full bg-white">
      <div className="absolute top-1/4 left-1/2 transform -translate-x-1/2 z-10 text-center">
        <img
          src="/images/peeps/Online_Learning.png"
          alt="Online Learning"
          className="w-32 h-32 mx-auto mb-6 object-contain"
        />
        <h1 className="text-7xl font-bold text-gray-800 mb-6">Quickeven</h1>
        <p className="text-xl text-gray-600">
          by{' '}
          <a
            href="https://www.facebook.com/ferdousmikdad/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-600 underline hover:no-underline transition-colors"
          >
            Ferdous Mikdad
          </a>
        </p>
      </div>

      <div className="absolute bottom-0 h-[75vh] w-screen">
        <CrowdCanvas src="/images/peeps/all-peeps.png" rows={8} cols={12} />
      </div>
    </div>
  );
};

export default Skiper39;