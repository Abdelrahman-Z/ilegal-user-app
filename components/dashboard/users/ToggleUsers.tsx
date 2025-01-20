import React from "react";
import { Switch } from "@nextui-org/react";
import { usePatchUserStatusMutation } from "@/redux/services/api";

const ToggleUserStatus = ({ userId, isActive }: { userId: string; isActive: boolean }) => {
  const [patchUserStatus, { isLoading }] = usePatchUserStatusMutation();

  const handleToggle = async (isSelected: boolean) => {
    // const newStatus = !isSelected; // Toggle the state
    try {
      await patchUserStatus({ id: userId, activate: isSelected }).unwrap();
    } catch (error) {
      console.error("Failed to toggle user status", error);
      // Optionally revert state if the request fails
    }
  };

  return (
    <Switch
      isSelected={isActive}
      onValueChange={handleToggle}
      isDisabled={isLoading} // Disable while the request is in progress
    />
  );
};

export default ToggleUserStatus;
