import React from 'react';
import '../../index.css';

function Button({ text, handler, className = '' }) {
  return (
    <button
      className={`bg-purple-700 rounded-full shadow-lg text-white flex items-center justify-center px-4 py-2 
                  hover:bg-purple-500 focus:ring-2 focus:ring-purple-300 active:bg-purple-800 
                  text-sm sm:text-base md:text-lg ${className}`}
      onClick={handler}
    >
      <p className="mx-2">{text}</p>
    </button>
  );
}

export default Button;
