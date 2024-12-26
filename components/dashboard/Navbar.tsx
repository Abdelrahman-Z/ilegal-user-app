import { Input } from "@nextui-org/react";
import React from "react";
import { FaBell, FaSearch } from "react-icons/fa";

const Navbar = () => {
  return (
    <div className="bg-deepBlue text-white shadow-md p-4 flex items-center justify-between">
      {/* Greeting */}
      <h1 className="text-lg font-semibold">Good Morning, Name</h1>

      {/* Search and Notification */}
      <div className="flex items-center space-x-4">
        <Input
          endContent={<FaSearch className="text-gray-500" />}
          type="text"
          placeholder="Search"
        />
        <FaBell className="text-white text-2xl cursor-pointer hover:text-gray-200" />
      </div>
    </div>
  );
};

export default Navbar;
