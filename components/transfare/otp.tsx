'use client'
import { useValidateOtpForDocumentMutation } from "@/redux/services/api";
import { isFetchBaseQueryError } from "@/redux/store";
import { yupResolver } from "@hookform/resolvers/yup";
import { Button } from "@heroui/react";
import { useRouter } from "next/navigation";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import OTPInput from "react-otp-input";
import * as yup from "yup";


// Define the validation schema using Yup
const schema = yup.object().shape({
    otp: yup
      .string()
      .required("OTP is required")
      .length(6, "OTP must be 6 digits"),
  });
  
  // Create a type from the Yup schema
  type OTPFormData = yup.InferType<typeof schema>;

export const Otp = () => {
  const router = useRouter()
    const [verifyOtp, { isLoading, error }] = useValidateOtpForDocumentMutation(); // Use the OTP verification mutation hook
  
    const {
      control,
      handleSubmit,
      formState: { errors },
    } = useForm<OTPFormData>({
      resolver: yupResolver(schema),
    });
  
    const onSubmit: SubmitHandler<OTPFormData> = async (data) => {
      try {
        const response = await verifyOtp({ otp: data.otp }).unwrap();
        toast.success("OTP verified successfully.");
        router.push(`/transfare/${response.documentId}?otp=${data.otp}`)
      } catch (err) {
        console.error("OTP verification failed:", err); // Handle OTP verification error
      }
    };
  
  
    if (error && isFetchBaseQueryError(error)) {
      const errorMessage =
        error.data &&
        typeof error.data === "object" &&
        "message" in error.data
          ? (error.data as { message: string }).message
          : "An error occurred. Please try again.";
      toast.error(errorMessage);
    }
  
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="max-w-md w-full p-6 bg-white shadow-md rounded-lg">
        <form onSubmit={handleSubmit(onSubmit)}>
          {/* OTP Field */}
          <div className="mb-4">
            <label htmlFor="otp" className="block text-gray-700 mb-2">
              Enter OTP
            </label>
            <Controller
              name="otp"
              control={control}
              render={({ field }) => (
                <OTPInput
                  value={field.value || ""}
                  onChange={field.onChange}
                  numInputs={6}
                  shouldAutoFocus
                  containerStyle={"flex justify-between"}
                  inputStyle={{
                    width: "2.5rem",
                    height: "2.5rem",
                    margin: "0 0.25rem",
                    fontSize: "1.5rem",
                    borderRadius: "0.25rem",
                    border: "1px solid #ced4da",
                  }}
                  renderInput={(props) => (
                    <input
                      {...props}
                      style={{
                        ...props.style,
                        boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)", // Example additional style
                      }}
                    />
                  )}
                />
              )}
            />
            {errors.otp && (
              <p className="text-red-500 text-sm mt-1">{errors.otp.message}</p>
            )}
          </div>

          {/* Submit Button */}
          <Button
            type="submit"
            color="primary"
            fullWidth
            isDisabled={isLoading}
            isLoading={isLoading}
          >
            {isLoading ? "Verifying..." : "Verify OTP"}
          </Button>
        </form>
      </div>
    </div>
  );
};
