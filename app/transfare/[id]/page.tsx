"use client";
import { usePreviewDocumentQuery } from "@/redux/services/api";
import { useParams, useSearchParams } from "next/navigation";
import React, { useEffect, useRef, useState } from "react";
import SignatureCanvas from "react-signature-canvas";
import SignaturePad from "react-signature-canvas";
import { PDFDocument } from "pdf-lib";
import { isFetchBaseQueryError } from "@/redux/store";
import toast from "react-hot-toast";

const Page = () => {
  const { id } = useParams();
  const params = useSearchParams();
  const otp = params.get("otp");

  const { data, error, isLoading } = usePreviewDocumentQuery({ id, otp });

  const [pdfUrl, setPdfUrl] = useState<string>("");
  const signatureRef = useRef<SignatureCanvas>(null);

  useEffect(() => {
    if (data) {
      // Convert Blob to URL
      const pdfBlob = new Blob([data], { type: "application/pdf" });
      const url = URL.createObjectURL(pdfBlob);
      setPdfUrl(url);
    }
  }, [data]);

  const handleSaveSignature = async () => {
    if (signatureRef.current && pdfUrl) {
      const signatureDataUrl = signatureRef.current
        .getTrimmedCanvas()
        .toDataURL("image/png");
      const pdfBytes = await fetch(pdfUrl).then((res) => res.arrayBuffer());
      const pdfDoc = await PDFDocument.load(pdfBytes);
      const pngImage = await pdfDoc.embedPng(signatureDataUrl);
      const page = pdfDoc.getPage(0);
      const { width, height } = page.getSize();

      page.drawImage(pngImage, {
        x: width / 2 - 50,
        y: height / 2 - 50,
        width: 100,
        height: 50,
      });

      const newPdfBytes = await pdfDoc.save();
      const blob = new Blob([newPdfBytes], { type: "application/pdf" });
      const newUrl = URL.createObjectURL(blob);
      window.open(newUrl); // Open signed PDF in new tab
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

      <div className="ml-5">
        <h2 className="text-white">Sign Here:</h2>
        {/* @ts-expect-error type error */}
        <SignaturePad
          ref={signatureRef}
          canvasProps={{ className: "sigCanvas" }}
        />
        <button
          onClick={handleSaveSignature}
          className="mt-2 bg-blue-500 text-white px-4 py-2 rounded"
        >
          Save Signature
        </button>
      </div>
    </div>
  );
};

export default Page;
