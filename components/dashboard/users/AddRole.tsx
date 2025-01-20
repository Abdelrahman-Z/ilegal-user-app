import React, { useState, useEffect } from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Input,
  CheckboxGroup,
  Checkbox,
  useDisclosure,
} from "@nextui-org/react";
import { useFetchRolesQuery } from "@/redux/services/api";

export const AddRole: React.FC = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [selectedRoles, setSelectedRoles] = useState<string[]>([]);
  const [searchValue, setSearchValue] = useState("");

  // Fetch roles using RTK Query
  const { data: roles = [], isLoading, isError } = useFetchRolesQuery();

  // Filter roles based on search value
  const filteredRoles = roles.filter((role) =>
    role.name.toLowerCase().includes(searchValue.toLowerCase())
  );

  const handleSave = () => {
    console.log("Selected Roles:", selectedRoles);
    onClose();
  };

  return (
    <>
      {/* Open Modal Button */}
      <Button color="primary" onPress={onOpen}>
        Add Role
      </Button>

      {/* Modal */}
      <Modal isOpen={isOpen} onOpenChange={onClose}>
        <ModalContent>
          <ModalHeader>Select Roles</ModalHeader>
          <ModalBody>
            {/* Search Input */}
            <Input
              placeholder="Search Roles"
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              isClearable
              label="Search"
            />

            {/* Roles List with Checkboxes */}
            {isError ? (
              <p className="text-red-500">Failed to fetch roles.</p>
            ) : isLoading ? (
              <p>Loading roles...</p>
            ) : (
              <CheckboxGroup
                color="warning"
                value={selectedRoles}
                onValueChange={setSelectedRoles}
                label="Available Roles"
              >
                {filteredRoles.map((role) => (
                  <Checkbox key={role.id} value={role.id}>
                    {role.name}
                  </Checkbox>
                ))}
              </CheckboxGroup>
            )}
          </ModalBody>

          <ModalFooter>
            <Button color="danger" variant="flat" onPress={onClose}>
              Cancel
            </Button>
            <Button color="primary" onPress={handleSave}>
              Save
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};
