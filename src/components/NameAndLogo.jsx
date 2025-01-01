import React from 'react';

const NameAndLogo = () => {
  return (
    <div className="flex flex-row items-center m-3 md:m-6">
      <img
        className="w-10 h-10 mx-4 md:w-16 md:h-16"
        src="logo110.png"
        alt="Logo"
      />
      <div className="text-lg font-bold text-black md:text-4xl">
        Phòng khám X
      </div>
    </div>
  );
};

export default NameAndLogo;
