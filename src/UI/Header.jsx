import React from 'react';

const Header = () => {
  return (
    <div className=" max-w-screen bg-blue-400 rounded-b-lg p-4 top-0 px-10 flex justify-between sticky z-10 shadow-sm shadow-blue-600">
      <div>Logo</div>
      <div className="flex gap-2">
        <input
          type="text"
          placeholder="Search here"
          className="rounded p-2 "
        />
        <button className="bg-red-600 px-3 rounded">Search</button>
      </div>
      <div>About</div>
    </div>
  );
};

export default Header;
