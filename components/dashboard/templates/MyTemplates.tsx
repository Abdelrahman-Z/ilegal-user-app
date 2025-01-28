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
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  useDisclosure,
} from "@nextui-org/react";
import {
  useGetAllTemplatesQuery,
  useDeleteTemplateMutation,
} from "@/redux/services/api";
import { usePathname } from "next/navigation";
import { FaTrashAlt } from "react-icons/fa";
import { isFetchBaseQueryError } from "@/redux/store";
import toast from "react-hot-toast";

export const MyTemplates = () => {
  const path = usePathname();
  const [page, setPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState(searchTerm);
  const [deleteId, setDeleteId] = useState("");
  const limit = 5;
  const [deleteTemplate, {isLoading: isLoadingDelete, error: deletionError, isSuccess:isDeleted}] = useDeleteTemplateMutation(); 
    const [isModalDeleteOpen, setIsModalDeleteOpen] = useState(false);
  // Debounce search term
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm);
    }, 500);
    
    return () => clearTimeout(handler);
  }, [searchTerm]);
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
  const { data, error, isLoading } = useGetAllTemplatesQuery({
    page,
    limit,
  });
  
  useEffect(() => {
    setPage(1);
  }, [debouncedSearchTerm]);
  
  if (isLoading) return <p>Loading templates...</p>;
  if (error) return <p>Error loading templates.</p>;
  
  const templates = data?.data || [];
  const totalPages = data?.metadata?.totalPages || 1;
  // console.log(data);
  
    
    const handleDeleteClick = () => {
      setIsModalDeleteOpen(true); 
    };
  
     const handleConfirmDelete = async () => {
    try {
      await deleteTemplate(deleteId); // Delete the template
    } catch (error) {
      console.error("Error deleting template:", error);
    }
  };


  return (
    <div className="flex flex-col gap-5 w-full bg-white p-5 rounded-xl h-fit">
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
      {/* DELETE MODAL */}
      <Modal
      isOpen={isModalDeleteOpen}
      onClose={() => setIsModalDeleteOpen(false)}
      size="lg"
      isDismissable={false}
      className="fixed inset-0 z-[1050] flex items-center justify-center bg-black/50"

    >
      <ModalContent className="relative bg-white rounded-lg p-6 z-[1051]">
      <ModalHeader>Delete Template</ModalHeader>
      <ModalBody>
        <p>Are you sure you want to delete this template?</p>
      </ModalBody>
      <ModalFooter>
        <Button
          color="primary"
          onPress={() => {
            setIsModalDeleteOpen(false);
          }}
        >
          Cancel
        </Button>
        <Button
          color="danger"
          onPress={() => {
            setIsModalDeleteOpen(false);
            handleConfirmDelete();
          }}
        >
          Delete
        </Button>
      </ModalFooter>
      </ModalContent>
    </Modal>

    </div>
  );
};
