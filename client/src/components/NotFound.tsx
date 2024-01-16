import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <div className="flex flex-col h-screen items-center justify-center relative overflow-hidden">
      {/* Stars background */}
      <div className="absolute inset-0 bg-black opacity-75 z-0">
        {[...Array(50)].map((_, index) => (
          <div
            key={index}
            className="absolute w-1 h-1 bg-white rounded-full"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animation: `twinkle ${(Math.random() * 1.5 + 0.5).toFixed(2)}s linear infinite`,
            }}
          ></div>
        ))}
      </div>

      <div className="relative z-10 text-white">
      <h1 className="text-4xl font-bold mb-4">
            Houston, we have a problem.
      </h1>
      <p className="text-lg mb-2">The page you are looking for doesn't exist.</p>
      <p className="text-md italic mb-8">Imagine how secure it is.</p>
      <Link to="/" className="text-lg px-6 py-3 bg-white text-black rounded-full hover:bg-gray-300 transition duration-300">
        Back to the Game
      </Link>
      </div>
    </div>
  );
};

export default NotFound;
