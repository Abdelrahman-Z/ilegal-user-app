"use client";
import React from "react";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import OTPInput from "react-otp-input";
import { Button } from "@nextui-org/react";
import { useParams, useRouter } from "next/navigation"; // Import Next.js router
import { useVerifyOtpMutation } from "@/redux/services/api"; // Import your OTP verification mutation hook
import { isFetchBaseQueryError } from "@/redux/store";

// Define the validation schema using Yup
const schema = yup.object().shape({
  otp: yup
    .string()
    .required("OTP is required")
    .length(6, "OTP must be 6 digits"),
});

// Create a type from the Yup schema
type OTPFormData = yup.InferType<typeof schema>;

export default function OTPVerificationForm() {
  const router = useRouter();
  const [verifyOtp, { isLoading, error }] = useVerifyOtpMutation(); // Use the OTP verification mutation hook
  const {locale} = useParams()

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<OTPFormData>({
    resolver: yupResolver(schema),
  });

  const onSubmit: SubmitHandler<OTPFormData> = async (data) => {
    try {
      console.log("OTP Data:", data);
      const response = await verifyOtp({ otp: data.otp }).unwrap();
      console.log(response)
      router.push(`/${locale}/reset-password`);
    } catch (err) {
      console.error("OTP verification failed:", err); // Handle OTP verification error
    }
  };

  return (
      <div className="max-w-md w-full p-6 bg-gradient-to-b mx-auto from-lightBlue to-deepBlue shadow-md rounded-lg">
        <form onSubmit={handleSubmit(onSubmit)}>
          {/* OTP Field */}
          <div className="mb-4">
            <label htmlFor="otp" className="block text-white mb-2">
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
                  containerStyle={'flex justify-between'}
                  inputStyle={{
                    width: "2.5rem",
                    height: "2.5rem",
                    margin: "0 0.25rem",
                    fontSize: "1.5rem",
                    borderRadius: "0.25rem",
                    border: "1px solid #ced4da",
                    color:'black'
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

        {/* API Error Message */}
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

        {/* Link to Resend OTP */}
        {/* <div className="mt-4 text-center">
          <p className="text-gray-600">
            Didn't receive the OTP?{" "}
            <Link
              href="/auth/resend-otp"
              className="text-blue-500 hover:underline"
            >
              Resend OTP
            </Link>
          </p>
        </div> */}
      </div>
  );
}