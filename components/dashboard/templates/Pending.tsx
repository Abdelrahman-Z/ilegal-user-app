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
  useGetPendingTemplatesQuery,
  useDeleteTemplateMutation,
  useApproveTemplateMutation,
  useRejectTemplateMutation,
} from "@/redux/services/api";
import { usePathname } from "next/navigation";
import { FaCheck, FaTimes, FaTrashAlt } from "react-icons/fa";
import toast from "react-hot-toast";
import { isFetchBaseQueryError } from "@/redux/store";

export const Pending = () => {
  const path = usePathname();
  const [page, setPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState(searchTerm);
  const limit = 5;
  const [rejectReason, setRejectReason] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [deleteId, setDeleteId] = useState("");
  const [rejectId, setRejectId] = useState("");
  const [deleteTemplate, { isLoading: isLoadingDelete , isSuccess: isDeleted, error: deletionError}] =
  useDeleteTemplateMutation();
  const [approveTemplate, {isSuccess: isApproved, error:approvalError}] = useApproveTemplateMutation();
  const [rejectTemplate, {isSuccess: isRejected, error: rejectionError}] = useRejectTemplateMutation();
  const [isModalRejectOpen, setIsModalRejectOpen] = useState(false);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm);
    }, 500);

    return () => clearTimeout(handler);
  }, [searchTerm]);

  const { data, error, isLoading } = useGetPendingTemplatesQuery({
    page,
    limit,
  });
  
 // Handle error toast
 useEffect(() => {
  if (deletionError && isFetchBaseQueryError(deletionError)) {
    const errorMessage =
      deletionError.data && typeof deletionError.data === "object" && "message" in deletionError.data
        ? (deletionError.data as { message: string }).message
        : "An error occurred while deleting the template.";
    toast.error(errorMessage);
  }
  if (approvalError && isFetchBaseQueryError(approvalError)) {
    const errorMessage =
      approvalError.data && typeof approvalError.data === "object" && "message" in approvalError.data
        ? (approvalError.data as { message: string }).message
        : "An error occurred while deleting the template.";
    toast.error(errorMessage);
  }
  if (rejectionError && isFetchBaseQueryError(rejectionError)) {
    const errorMessage =
      rejectionError.data && typeof rejectionError.data === "object" && "message" in rejectionError.data
        ? (rejectionError.data as { message: string }).message
        : "An error occurred while deleting the template.";
    toast.error(errorMessage);
  }
}, [deletionError, approvalError, rejectionError]);

// Handle success toast
useEffect(() => {
  if (isDeleted) {
    toast.success("Template Deleted successfully!");
  }
  if (isApproved) {
    toast.success("Template Approved successfully!");
  }
  if (isRejected) {
    toast.success("Template Rejected successfully!");
  }
}, [isDeleted, isApproved, isRejected]);

  useEffect(() => {
    setPage(1);
  }, [debouncedSearchTerm]);
  
  if (isLoading) return <p>Loading templates...</p>;
  if (error) return <p>Error loading templates.</p>;

  const templates = data?.data || [];
  const totalPages = data?.metadata?.totalPages || 1;

  const handleDeleteClick = () => {
    setIsModalOpen(true);
  };

  const handleConfirmDelete = async () => {
    try {
      await deleteTemplate(deleteId);
      setIsModalOpen(false);
    } catch (error) {
      console.error("Error deleting template:", error);
    }
  };

  const handleRejectTemplate = async (rejectId: string, rejectReason: string) => {
    try {
      // Make sure you pass the correct body structure
      await rejectTemplate({
        id: rejectId,
        body: { rejectReason } // Ensure body is correctly formatted
      });
  
      // Optionally, handle after rejection (e.g., show a success message, refetch data, etc.)
    } catch (error) {
      console.error("Error rejecting template:", error);
    }
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
              {/* APPROVE */}
              <button className=" bg-white p-2 rounded-xl w-fit"
              onClick={() => approveTemplate(template.id)}>
                <FaCheck style={{ color: "green", fontSize: "24px" }} />
              </button>

              {/* REJECT */}
              <button className=" bg-white p-2 w-fit rounded-xl"
              onClick={ ()=>{ 
                setIsModalRejectOpen(true);
                setRejectId(template.id)
              }}>
                <FaTimes style={{ color: "red", fontSize: "24px" }} />
              </button>

              {/* VIEW */}
              <Link
                href={`${path}/${template.id}?pre=false`}
                className=" bg-white p-2 rounded-xl"
              >
                View
              </Link>

              {/* DELETE */}
              <button
                onClick={() => {
                  handleDeleteClick();
                  setDeleteId(template.id);
                }}
              >
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
                {isLoading ? "Deleting..." : "Yes, Delete"}
              </button>
              <button
                onClick={()=> setIsModalOpen(false)}
                className="bg-gray-300 px-4 py-2 rounded-md"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* REJECT MODAL */}
      {isModalRejectOpen && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm">
            <h2 className="text-xl mb-4">Reason of Rejection?</h2>
            <Input placeholder="write the reason of rejection" onChange={(e)=> setRejectReason(e.target.value)} className="mb-4"/>
            <div className="flex justify-center gap-4">
              <button
                onClick={() => {
                  setIsModalRejectOpen(false);
                  handleRejectTemplate(rejectId, rejectReason);
                }}
                className="bg-red-600 text-white px-4 py-2 rounded-md"
              >
                Confirm Rejection
              </button>
              <button
                onClick={()=> setIsModalRejectOpen(false)}
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
