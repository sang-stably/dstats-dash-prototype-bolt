import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="mt-16 pb-8 flex justify-center">
      <img 
        src="https://app.testnet.dtrinity.org/dlend/dTrinity-White-Logo.png"
        alt="dTrinity Logo"
        className="h-8 opacity-80 hover:opacity-100 transition-opacity"
      />
    </footer>
  );
};

export default Footer;