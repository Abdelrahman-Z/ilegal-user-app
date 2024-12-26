"use client";
import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Input, Button } from "@nextui-org/react";
import Link from "next/link";
import { useLoginMutation } from "@/redux/services/api";
import { setToken } from "@/utils";
import { isFetchBaseQueryError } from "@/redux/store";
import { useParams } from "next/navigation";

// Define the validation schema using Yup
const schema = yup.object().shape({
  email: yup
    .string()
    .required("Email is required")
    .email("Invalid email format"),
  password: yup
    .string()
    .required("Password is required")
    .min(6, "Password must be at least 6 characters"),
});

// Create a type from the Yup schema
type FormData = yup.InferType<typeof schema>;

export default function LoginForm() {
  const { locale } = useParams(); // Use locale hook
  const [, { isLoading, error }] = useLoginMutation(); // Use login mutation hook

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: yupResolver(schema),
  });

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    try {
      // const response = await login(data).unwrap(); // Unwrap to get the result directly
      // console.log("Login successful", response);
      // // Store token in cookies for 7 days
      // setToken("token", response.access_token, 7);
      // Navigate to the home page upon successful login
      // window.location.reload();
      window.location.href = `/${locale}/dashboard`;
    } catch (err) {
      console.error("Login failed:", err);
    }
  };

  return (
    <div className="flex items-center justify-center">
      <div className="bg-gradient-to-b from-deepBlue to-lightBlue text-white rounded-lg shadow-lg p-8 w-96">
        <h2 className="text-2xl font-bold mb-6 text-center">Sign in Form</h2>
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
                input: "text-white",
              }}
              fullWidth
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">
                {errors.email.message}
              </p>
            )}
          </div>

          {/* Password Field */}
          <div>
            <Input
              {...register("password")}
              id="password"
              type="password"
              label="Password"
              color={errors.password ? "danger" : "default"}
              variant="underlined"
              classNames={{
                label: "text-white",
                input: "text-white",
              }}
              fullWidth
            />
            {errors.password && (
              <p className="text-red-500 text-sm mt-1">
                {errors.password.message}
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
              {isLoading ? "Logging in..." : "Continue"}
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

        {/* Link to Create Account */}
        <div className="mt-4 text-center">
          <p className="text-white">
            Forget password?{" "}
            <Link
              href={`/${locale}/reset-password`}
              className="text-fuschia_maked hover:underline"
            >
              Reset your password
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
