'use client'
import { removeToken } from "@/utils";
import {
  Avatar,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  Input,
} from "@nextui-org/react";
import React from "react";
import { FaBell, FaSearch } from "react-icons/fa";

const Navbar = () => {
  const signOut = () => {
    // Implement sign out logic here
    removeToken("token");
    // Redirect to the login page
    window.location.reload();
  };
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
        <Dropdown placement="bottom-end">
          <DropdownTrigger>
            <Avatar
              isBordered
              as="button"
              className="transition-transform"
              src="https://i.pravatar.cc/150?u=a042581f4e29026704d"
            />
          </DropdownTrigger>
          <DropdownMenu aria-label="User Actions" variant="flat">
            {/* <DropdownItem key="profile">
            <span className="font-semibold">Signed in as</span>
            <span className="text-gray-500">zoey@example.com</span>
          </DropdownItem> */}
            <DropdownItem key="signout" color="danger" onClick={signOut}>
              Sign Out
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>
      </div>
    </div>
  );
};

export default Navbar;
