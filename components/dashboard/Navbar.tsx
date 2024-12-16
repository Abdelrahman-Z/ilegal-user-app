import { Input } from "@nextui-org/react";
import React from "react";
import { FaBell, FaSearch } from "react-icons/fa";

const Navbar = () => {
  return (
    <div className="bg-white shadow-md flex justify-between items-center px-6 py-3">
      {/* Greeting */}
      <h1 className="text-lg font-semibold">Good Morning, Name</h1>

      {/* Search and Notification */}
      <div className="flex items-center space-x-4">
          <Input
            endContent={
              <FaSearch className="text-gray-500" />
            }
            type="text"
            placeholder="Search"
          />
        <FaBell className="text-gray-500 text-2xl cursor-pointer hover:text-gray-700" />
      </div>
    </div>
  );
};

export default Navbar;
