"use client";
import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Input, Button } from "@nextui-org/react";
import { useForgetPasswordMutation } from "@/redux/services/api";
import { isFetchBaseQueryError } from "@/redux/store";
import {  useParams, useRouter } from "next/navigation";

// Define the validation schema using Yup
const schema = yup.object().shape({
  email: yup
    .string()
    .required("Email is required")
    .email("Invalid email format"),
});

// Create a type from the Yup schema
type FormData = yup.InferType<typeof schema>;

export default function ForgetPasswordForm() {
  const [forgetPassword, { isLoading, error }] = useForgetPasswordMutation(); // Use forget password mutation hook
  const { locale } = useParams();
  const router = useRouter()
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: yupResolver(schema),
  });

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    try {
      const response = await forgetPassword(data).unwrap(); // Unwrap to get the result directly
      console.log("Forget Password Request Successful", response);
      router.push(`/${locale}/otp`)
    } catch (err) {
      console.error("Forget Password Request Failed:", err);
    }
  };

  return (
    <div className="flex items-center justify-center">
      <div className="bg-gradient-to-b from-deepBlue to-lightBlue text-white rounded-lg shadow-lg p-8 w-96">
        <h2 className="text-2xl font-bold mb-6 text-center">Forget Password</h2>
        <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
          {/* Email Field */}
          <div>
            <Input
              {...register("email")}
              id="email"
              type="email"
              label="Email"
              color={errors.email ? "danger" : "default"}
              variant="underlined"
              classNames={{
                label: "text-white",
              }}
              fullWidth
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">
                {errors.email.message}
              </p>
            )}
          </div>

          {/* Submit Button */}
          <div>
            <Button
              type="submit"
              className="w-full bg-white text-black font-semibold py-2 px-4 rounded-md hover:bg-gray-200 transition"
              isDisabled={isLoading}
              isLoading={isLoading}
            >
              {isLoading ? "Sending..." : "Submit"}
            </Button>
          </div>
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
      </div>
    </div>
  );
}
