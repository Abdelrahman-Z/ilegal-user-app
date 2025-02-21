"use client";
import { usePreviewDocumentQuery } from "@/redux/services/api";
import { useParams, useSearchParams } from "next/navigation";
import React, { useEffect, useRef, useState } from "react";
import SignatureCanvas from "react-signature-canvas";
import { PDFDocument } from "pdf-lib";
import { isFetchBaseQueryError } from "@/redux/store";
import toast from "react-hot-toast";

const Page = () => {
  const { id } = useParams();
  const params = useSearchParams();
  const otp = params.get("otp");
  const { data, error, isLoading } = usePreviewDocumentQuery({ id, otp });
  const [pdfUrl, setPdfUrl] = useState<string>("");
  const [pdfBytes, setPdfBytes] = useState<ArrayBuffer | null>(null);
  const [, setPageCount] = useState(0);
  const signatureRef = useRef<SignatureCanvas>(null);
  
  useEffect(() => {
    if (data) {
      // Convert Blob to URL
      const pdfBlob = new Blob([data], { type: "application/pdf" });
      const url = URL.createObjectURL(pdfBlob);
      setPdfUrl(url);
      
      // Store the PDF bytes and get page count
      const reader = new FileReader();
      reader.onload = async () => {
        if (reader.result instanceof ArrayBuffer) {
          setPdfBytes(reader.result);
          
          // Get page count
          try {
            const pdfDoc = await PDFDocument.load(reader.result);
            setPageCount(pdfDoc.getPageCount());
          } catch (err) {
            console.error("Error counting pages:", err);
          }
        }
      };
      reader.readAsArrayBuffer(pdfBlob);
    }
  }, [data]);

  const handleClearSignature = () => {
    if (signatureRef.current) {
      signatureRef.current.clear();
    }
  };

  const handleSaveSignature = async () => {
    if (!signatureRef.current || !pdfBytes) {
      toast.error("Please draw a signature first");
      return;
    }

    try {
      // Get signature as PNG directly
      const signatureDataUrl = signatureRef.current.toDataURL("image/png");
      if (!signatureDataUrl) {
        toast.error("Please draw a signature first");
        return;
      }
      // Load the PDF document
      const pdfDoc = await PDFDocument.load(pdfBytes);
      
      // Get the last page
      const pageCount = pdfDoc.getPageCount();
      const lastPageIndex = pageCount - 1;
      const lastPage = pdfDoc.getPage(lastPageIndex);
      
      // Embed the signature image
      const signatureImage = await pdfDoc.embedPng(signatureDataUrl);
      
      // Get dimensions of the signature and the page
      const { width: sigWidth, height: sigHeight } = signatureImage.size();
      const { width: pageWidth } = lastPage.getSize();
      
      // Calculate appropriate size for signature (about 1/5 of page width)
      const targetWidth = pageWidth / 5;
      const scaleFactor = targetWidth / sigWidth;
      const scaledWidth = sigWidth * scaleFactor;
      const scaledHeight = sigHeight * scaleFactor;
      
      // Position at bottom right with margins
      const marginX = 50; // 50 points from right edge
      const marginY = 50; // 50 points from bottom edge
      const xPosition = pageWidth - scaledWidth - marginX;
      const yPosition = marginY;
      
      // Draw the signature on the last page
      lastPage.drawImage(signatureImage, {
        x: xPosition,
        y: yPosition,
        width: scaledWidth,
        height: scaledHeight,
      });
      
      // Save the modified PDF
      const modifiedPdfBytes = await pdfDoc.save();
      
      // Create a Blob and open in new tab
      const blob = new Blob([modifiedPdfBytes], { type: "application/pdf" });
      const signedPdfUrl = URL.createObjectURL(blob);
      window.open(signedPdfUrl);
      
      toast.success(`PDF signed successfully`);
    } catch (err) {
      console.error("Error signing PDF:", err);
      toast.error("Failed to sign PDF");
    }
  };

  if (isLoading) return <div>Loading...</div>;
  
  if (error && isFetchBaseQueryError(error)) {
    const errorMessage =
      error.data && typeof error.data === "object" && "message" in error.data
        ? (error.data as { message: string }).message
        : "An error occurred. Please try again.";
    toast.error(errorMessage);
  }

  return (
    <div className="bg-[#333333] flex items-start h-screen">
      <div className="h-full w-full">
        {pdfUrl ? (
          <iframe src={pdfUrl} className="w-full h-full"></iframe>
        ) : (
          <p>Failed to load PDF</p>
        )}
      </div>
      <div className="bg-[#444444] p-4 ml-5 flex flex-col" style={{ width: "300px" }}>
        <h2 className="text-white mb-2">Draw Your Signature:</h2>
        <div className="bg-white rounded">
          {/* @ts-expect-error error */}
          <SignatureCanvas
            ref={signatureRef}
            canvasProps={{
              className: "sigCanvas",
              width: 280,
              height: 150,
              style: { border: "1px solid #999" }
            }}
          />
        </div>
        <div className="mt-2 flex space-x-2">
          <button
            onClick={handleClearSignature}
            className="bg-gray-600 text-white px-4 py-2 rounded flex-1"
          >
            Clear
          </button>
          <button
            onClick={handleSaveSignature}
            className="bg-blue-600 text-white px-4 py-2 rounded flex-1"
          >
            Sign PDF
          </button>
        </div>
      </div>
    </div>
  );
};

export default Page;