import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';

const Sidebar = () => {
  const [width, setWidth] = useState(15); // Initial sidebar width

  const handleResize = () => {
   
    setWidth(width === 15 ? 5 : 15);
    
  };

  return (
    <div
      className="min-h-screen bg-white text-black px-6 py-2 shadow-lg shadow-black   top-16 z-0 transition-all duration-300"
      style={{ width: `${width}rem` }}
    >
      <div className="text-right justify-end flex m-3">
        <FontAwesomeIcon
          icon={faBars}
          className="text-2xl text-gray-700 hover:text-blue-500 cursor-pointer"
          onClick={handleResize} // Toggle sidebar width on click
        />
      </div>
      <ul className="p-2 flex flex-col gap-3 top-6">
        <li className="relative group flex gap-3 flex-col">
          <p className="truncate hover:cursor-pointer">My Cards</p>
          <p className="truncate hover:cursor-pointer">
            <Link to="/add">Add Cards</Link>
            </p>
          <p className="truncate hover:cursor-pointer">Profile</p>
          <p className="truncate hover:cursor-pointer">Logout</p>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
