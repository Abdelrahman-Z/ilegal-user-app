"use client";
import React, { useState, useEffect } from "react";
import {
  Card,
  CardHeader,
  CardFooter,
  Image,
  Pagination,
  Input,
  Button,
  Link,
} from "@nextui-org/react";
import {
  useGetApprovedTemplatesQuery,
  useDeleteTemplateMutation,
} from "@/redux/services/api";
import { usePathname } from "next/navigation";
import { FaTrashAlt } from "react-icons/fa";
import { isFetchBaseQueryError } from "@/redux/store";
import toast from "react-hot-toast";

export const Approved = () => {
  const path = usePathname();
  const [page, setPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState(searchTerm);
  const limit = 5;
    const [deleteId, setDeleteId] = useState("");
  
  const [isModalOpen, setIsModalOpen] = useState(false); 
  const [deleteTemplate, {isLoading: isLoadingDelete, error:deletionError, isSuccess: isDeleted}] = useDeleteTemplateMutation(); 
  

  // Debounce search term
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm);
    }, 500);

    return () => clearTimeout(handler);
  }, [searchTerm]);

  // Fetch templates with pagination and search
  const { data, error, isLoading } = useGetApprovedTemplatesQuery({
    page,
    limit,
  });

  // Reset to page 1 when search term changes
  useEffect(() => {
    setPage(1);
  }, [debouncedSearchTerm]);
// Handle error toast
useEffect(() => {
  if (deletionError && isFetchBaseQueryError(deletionError)) {
    const errorMessage =
      deletionError.data && typeof deletionError.data === "object" && "message" in deletionError.data
        ? (deletionError.data as { message: string }).message
        : "An error occurred while deleting the template.";
    toast.error(errorMessage);
  }
}, [deletionError]);

useEffect(() => {
  if (isDeleted) {
    toast.success("Template Deleted successfully!");
  }
  
}, [isDeleted]);
  if (isLoading) return <p>Loading templates...</p>;
  if (error) return <p>Error loading templates.</p>;

  const templates = data?.data || [];
  const totalPages = data?.metadata?.totalPages || 1;
  const handleDeleteClick = () => {
    setIsModalOpen(true); // Open modal when delete button is clicked
  };

   const handleConfirmDelete = async () => {
  try {
    await deleteTemplate(deleteId); // Delete the template
    setIsModalOpen(false);
  } catch (error) {
    console.error("Error deleting template:", error);
  }
};


  const handleCloseModal = () => {
    setIsModalOpen(false); // Close the modal if user cancels
  };
  return (
    <div className="flex flex-col gap-5 w-full bg-white p-5 rounded-xl">
      {/* Template Cards */}
      <div className="gap-4 grid">
        {templates.map((template: any) => (
          <Card
            key={template.id}
            className="flex flex-row bg-gradient-to-r from-deepBlue to-lightBlue justify-between p-2"
          >
            <div className="flex items-center">
              <Image
                removeWrapper
                alt={`Template ${template.id}`}
                className="w-10 h-10 object-cover rounded-full"
                src={template.imageUrl || "https://via.placeholder.com/300"}
              />
              <CardHeader className="flex-col !items-start">
                <p className="text-tiny text-white/60 uppercase font-bold">
                  Template Name
                </p>
                <h4 className="text-white font-medium text-small">
                  {template.name}
                </h4>
                <p className="text-tiny text-white/60">
                  Language: {template.language}
                </p>
              </CardHeader>
            </div>

            <CardFooter className="flex justify-end items-center w-fit gap-2">
              <Link
                href={`${path}/${template.id}?pre=false`}
                className=" bg-white p-2 rounded-xl"
              >
                View
              </Link>
              <button onClick={()=> {
                              handleDeleteClick();
                              setDeleteId(template.id);
                              }}>
                              <FaTrashAlt className="text-2xl text-red-700" />
                            </button>
            </CardFooter>
          </Card>
        ))}
      </div>

      {/* Pagination */}
      <div className="flex justify-center">
        <Pagination
          isCompact
          showControls
          showShadow
          color="primary"
          page={page}
          total={totalPages}
          onChange={(newPage) => setPage(newPage)}
        />
      </div>
      {isModalOpen && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm">
            <h2 className="text-xl mb-4">Are you sure you want to delete?</h2>
            <div className="flex justify-center gap-4">
              <button 
                onClick={handleConfirmDelete} 
                className="bg-red-600 text-white px-4 py-2 rounded-md"
                disabled={isLoadingDelete}
              >
                {isLoading ? 'Deleting...' : 'Yes, Delete'}
              </button>
              <button 
                onClick={handleCloseModal} 
                className="bg-gray-300 px-4 py-2 rounded-md"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
