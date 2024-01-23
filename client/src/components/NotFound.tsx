import { Link } from 'react-router-dom';
import background from '../assets/background.gif';

const NotFound = () => {
  const backgroundStyle = {
    backgroundImage: `url(${background})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
  };

  return (
    <div className="flex flex-col h-view items-center justify-center relative overflow-hidden" style={backgroundStyle}>
      <div className="flex flex-col h-screen justify-center items-center z-10 text-white">
        
        <p className="w-96 mb-5 text-center bg-clip-text text-transparent bg-gradient-to-r from-red-500 to-gray-400 text-4xl font-semibold tracking-wide">Houston, we have a problem!</p>
        <div className="w-96 mb-1 text-center bg-clip-text text-transparent bg-gradient-to-r from-red-500 to-gray-400 text-9xl font-extrabold tracking-widest">404</div>
        <div className="w-96 mb-20 text-center text-white text-4xl font-bold tracking-wide">Page not found</div>
        <Link to="/" className="text-3xl font-bold animate ease-in-out hover:scale-105 px-6 py-3 bg-clip-text text-transparent bg-gradient-to-r from-orange-500 to-white rounded-full transition duration-300">
          Go back home
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
