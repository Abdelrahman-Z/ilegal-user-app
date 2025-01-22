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
  Spinner,
} from "@nextui-org/react";
import { useForm, Controller } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  useLazyGetAllRolesQuery,
  useLazyGetUserByIdQuery,
  useAssignRolesMutation,
} from "@/redux/services/api";
import { LuPlus } from "react-icons/lu";
import { isFetchBaseQueryError } from "@/redux/store";

interface AddRoleProps {
  userId: string; // User ID
}

// Yup schema for validation
const schema = yup.object({
  roleIds: yup
    .array()
    .of(yup.string().required("Role ID is required")) // Ensures all array items are valid strings
    .min(1, "Please select at least one role.") // Ensures at least one role is selected
    .required("Role IDs are required"), // Ensures the field itself is not undefined
});

export const AddRole: React.FC<AddRoleProps> = ({ userId }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [searchValue, setSearchValue] = useState(""); // Search input value
  const [debouncedSearchValue, setDebouncedSearchValue] = useState(""); // Debounced value

  // Lazy fetch roles and user data
  const [
    fetchRoles,
    { data: roles = [], isLoading: rolesLoading, isError: rolesError },
  ] = useLazyGetAllRolesQuery();
  const [
    fetchUserRoles,
    {
      data: userRolesData,
      isLoading: userRolesLoading,
      isError: userRolesError,
    },
  ] = useLazyGetUserByIdQuery();

  // Mutation for assigning roles
  const [assignRoles, { isLoading: saving, isError: saveError }] =
    useAssignRolesMutation();

  // React Hook Form
  const {
    control,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: { roleIds: [] },
  });

  // Update selected roles based on user roles
  useEffect(() => {
    if (userRolesData?.userRole) {
      const userRoleIds = userRolesData.userRole.map((role) => role.roleId);
      setValue("roleIds", userRoleIds);
    }
  }, [userRolesData, setValue]);

  // Debounce the search input
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearchValue(searchValue);
    }, 300); // 300ms debounce delay
    return () => {
      clearTimeout(handler);
    };
  }, [searchValue]);

  // Fetch roles whenever the debounced search value changes
  useEffect(() => {
    if (isOpen) {
      fetchRoles({ search: debouncedSearchValue });
    }
  }, [debouncedSearchValue, fetchRoles, isOpen]);

  // Fetch data when modal opens
  const handleOpen = () => {
    onOpen(); // Open modal
    fetchUserRoles(userId); // Fetch user roles
    fetchRoles({ search: "" }); // Fetch all roles initially
  };

  // Handle form submission
  const onSubmit = handleSubmit(async (data) => {
    try {
      await assignRoles({ userId, roleIds: data.roleIds }).unwrap();
      reset();
      onClose();
    } catch (err) {
      console.error("Error assigning roles:", err);
    }
  });

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
        isOpen={isOpen}
        scrollBehavior="inside"
        onOpenChange={onClose}
      >
        <ModalContent>
          <form onSubmit={onSubmit}>
            <ModalHeader>Assign Roles to User</ModalHeader>
            <ModalBody>
              {rolesError || userRolesError ? (
                <p className="text-red-500">Failed to fetch data.</p>
              ) : rolesLoading || userRolesLoading ? (
                <Spinner />
              ) : (
                <>
                  {/* Search Input */}
                  <Input
                    placeholder="Search roles..."
                    value={searchValue}
                    onChange={(e) => setSearchValue(e.target.value)}
                    className="mb-4"
                  />

                  {/* Role List with Checkboxes */}
                  <Controller
                    name="roleIds"
                    control={control}
                    render={({ field }) => (
                      <CheckboxGroup
                        {...field}
                        value={field.value}
                        onValueChange={(selected) => field.onChange(selected)}
                        label="Available Roles"
                      >
                        {roles.map((role) => (
                          <Checkbox key={role.id} value={role.id}>
                            {role.name}
                          </Checkbox>
                        ))}
                      </CheckboxGroup>
                    )}
                  />
                  {errors.roleIds && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.roleIds.message}
                    </p>
                  )}
                </>
              )}
              {saveError && isFetchBaseQueryError(saveError) && (
                <div className="mt-4">
                  <p className="text-red-500 text-sm">
                    {saveError.data &&
                    typeof saveError.data === "object" &&
                    "message" in saveError.data
                      ? (saveError.data as { message: string }).message
                      : "An error occurred. Please try again."}
                  </p>
                </div>
              )}
            </ModalBody>

            <ModalFooter>
              <Button color="danger" variant="flat" onPress={onClose}>
                Cancel
              </Button>
              <Button color="primary" type="submit" isLoading={saving}>
                Save
              </Button>
            </ModalFooter>
          </form>
        </ModalContent>
      </Modal>
    </>
  );
};
