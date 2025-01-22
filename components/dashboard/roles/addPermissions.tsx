import React, { useState, useEffect } from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  CheckboxGroup,
  Checkbox,
  Input,
  useDisclosure,
} from "@nextui-org/react";
import {
  useLazyGetPermissionsQuery,
  useUpdateRolePermissionsMutation,
} from "@/redux/services/api";
import { LuPlus } from "react-icons/lu";
import { Permission, PermissionCategory } from "@/types";
import { isFetchBaseQueryError } from "@/redux/store";

interface AddPermissionsProps {
  roleId: string; // Role ID
  rolePermissions: string[]; // Preloaded permissions of the role
}

export const AddPermissions: React.FC<AddPermissionsProps> = ({
  roleId,
  rolePermissions,
}) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [selectedPermissions, setSelectedPermissions] = useState<string[]>([]);
  const [allPermissions, setAllPermissions] = useState<PermissionCategory[]>(
    []
  );
  const [searchValue, setSearchValue] = useState<string>("");

  // Lazy fetch all available permissions
  const [
    fetchPermissions,
    { data: permissionsData, isLoading: permissionsLoading },
  ] = useLazyGetPermissionsQuery();

  // Initialize role permissions when modal opens
  useEffect(() => {
    if (rolePermissions) {
      setSelectedPermissions(rolePermissions);
    }
  }, [rolePermissions]);

  // Load all permissions when fetched
  useEffect(() => {
    if (permissionsData) {
      setAllPermissions(permissionsData);
    }
  }, [permissionsData]);

  // Fetch permissions when modal opens
  const handleOpen = () => {
    onOpen();
    fetchPermissions();
  };

  // Filter permissions based on the search input
  const filteredPermissions = allPermissions
    .map((category) => ({
      ...category,
      permissions: category.permissions.filter((perm: Permission) =>
        perm.name.toLowerCase().includes(searchValue.toLowerCase())
      ),
    }))
    .filter((category) => category.permissions.length > 0);

  // Save selected permissions
  const [updateRolePermissions, { isLoading: updateLoading, error }] =
    useUpdateRolePermissionsMutation();
  const handleSave = async () => {
    try {
      await updateRolePermissions({
        roleId,
        permissionIds: selectedPermissions,
      }).unwrap();
      console.log(selectedPermissions);
      onClose();
    } catch (error) {
      console.error("Failed to update permissions:", error);
    }
  };

  return (
    <>
      {/* Open Modal Button */}
      <Button color="success" isIconOnly onPress={handleOpen}>
        <LuPlus />
      </Button>

      {/* Modal */}
      <Modal
        isDismissable={false}
        isKeyboardDismissDisabled={true}
        scrollBehavior="inside"
        size="5xl"
        isOpen={isOpen}
        onOpenChange={onClose}
      >
        <ModalContent>
          <ModalHeader>Manage Permissions</ModalHeader>
          <ModalBody>
            {/* Search Input */}
            <Input
              label="Search Permissions"
              placeholder="Search permissions..."
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              className="mb-4"
            />

            {permissionsLoading ? (
              <p>Loading permissions...</p>
            ) : (
              <CheckboxGroup
                label="Available Permissions"
                value={selectedPermissions}
                onValueChange={setSelectedPermissions}
              >
                {filteredPermissions.map((category) => (
                  <div key={category.id} className="mb-4">
                    <p className="font-bold">{category.name}</p>
                    <div className=" flex flex-col gap-1">
                      {category.permissions.map((perm: Permission) => (
                        <Checkbox key={perm.id} value={perm.id}>
                          {perm.name}
                        </Checkbox>
                      ))}
                    </div>
                  </div>
                ))}
              </CheckboxGroup>
            )}
          </ModalBody>
          {error && isFetchBaseQueryError(error) && (
            <div className="mt-4">
              <p className="text-red-500 text-sm">
                {error.data &&
                typeof error.data === "object" &&
                "message" in error.data
                  ? (error.data as { message: string }).message
                  : "An error occurred. Please try again."}
              </p>
            </div>
          )}
          <ModalFooter>
            <Button color="danger" variant="flat" onPress={onClose}>
              Cancel
            </Button>
            <Button
              color="primary"
              onPress={handleSave}
              isLoading={updateLoading}
            >
              Save
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};
