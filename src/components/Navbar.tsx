import React from 'react';
import { IoChevronDown } from 'react-icons/io5';

const Navbar: React.FC = () => {
  const currentPage = "Key Metrics";
  
  return (
    <div className="flex items-center justify-between mb-8">
      <div className="flex items-center gap-8">
        <h1 className="text-white text-3xl font-bold">dSTATS Dashboard</h1>
        <nav className="flex items-center gap-6">
          {["Key Metrics", "dUSD Collaterals", "AMO & SMO", "Treasury"].map((item) => (
            <button
              key={item}
              className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                currentPage === item
                  ? "bg-gray-800 text-white"
                  : "text-gray-400 hover:text-white"
              }`}
            >
              {item}
            </button>
          ))}
        </nav>
      </div>
      <div className="bg-gray-800 px-4 py-2 rounded-lg flex items-center gap-2 cursor-pointer hover:bg-gray-700 transition-colors">
        <img 
          src="https://fraxscan.com/assets/frax/images/svg/logos/chain-light.svg?v=24.10.4.1" 
          alt="Fraxtal" 
          className="w-5 h-5"
        />
        <span className="text-white text-sm">Fraxtal</span>
        <IoChevronDown className="text-gray-400 text-sm" />
      </div>
    </div>
  );
};

export default Navbar;