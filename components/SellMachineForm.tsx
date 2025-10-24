"use client";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { useState } from "react";

const formSchema = z.object({
  brand: z.string().min(1, "Brand is required").max(50, "Brand name too long"),
  model: z.string().min(1, "Model is required").max(50, "Model name too long"),
  technology: z.string().max(30, "Technology name too long").optional(),
  width: z.string().regex(/^\d*\.?\d*$/, "Width must be a valid number").max(10, "Width value too long").optional(),
  sheddingSystem: z.string().max(30, "Shedding system name too long").optional(),
  additionalInfo: z.string().max(500, "Additional info too long").optional(),
  name: z.string().min(1, "Name is required").max(50, "Name too long"),
  email: z.string().email("Invalid email address").max(100, "Email too long"),
  phone: z.string()
    .min(10, "Phone must be at least 10 digits")
    .max(15, "Phone number too long")
    .regex(/^[\d\s+\-()]+$/, "Phone number contains invalid characters"),
});

type FormData = z.infer<typeof formSchema>;

export default function SellMachineForm() {
  const router = useRouter();
  const [isSuccess, setIsSuccess] = useState(false);
  
  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors, isSubmitting, isDirty, isValid },
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
    mode: "onChange",
  });

  // Watch the additionalInfo field for character count
  const additionalInfoValue = watch("additionalInfo") || "";

  const onSubmit = async (data: FormData) => {
    try {
      const res = await fetch("/api/sell", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (res.ok) {
        toast.success("Sell form submitted successfully!");
        setIsSuccess(true);
        reset();
        setTimeout(() => {
          router.push("/success?type=sell");
        }, 2000);
      } else {
        const errorData = await res.json();
        toast.error(errorData.message || "Failed to submit form. Please try again.");
      }
    } catch (error) {
      console.error("Submission error:", error);
      toast.error("Network error. Please check your connection and try again.");
    }
  };

  const handleReset = () => {
    reset();
    toast.success("Form cleared!");
  };

  // Success state
  if (isSuccess) {
    return (
      <div className="w-full max-w-2xl mx-auto p-8 rounded-xl shadow-md border border-green-200 bg-green-50">
        <div className="text-center">
          <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100">
            <svg className="h-6 w-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h3 className="mt-4 text-2xl font-bold text-green-800">Submission Successful!</h3>
          <p className="mt-2 text-green-600">Your machine listing has been submitted successfully.</p>
          <p className="mt-1 text-green-600">Redirecting to success page...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-2xl mx-auto p-6 md:p-8 rounded-xl shadow-lg border border-blue-200 bg-white font-Helvetica">
      {/* Header */}
      <div className="text-center mb-8">
        <h2 className="text-3xl md:text-4xl font-bold text-[#0B3B61] mb-2">
          Sell Your Machine
        </h2>
        <p className="text-sm text-gray-600 max-w-md mx-auto">
          Fill out the form below to post your machine for selling. We'll get back to you within 24 hours.
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Machine Details Section */}
        <div className="bg-blue-50 p-4 rounded-lg border border-blue-100">
          <h3 className="text-lg font-semibold text-[#0B3B61] mb-4 flex items-center">
            Machine Details
          </h3>
          
          <div className="space-y-4">
            {/* Brand & Model */}
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Brand <span className="text-red-500">*</span>
                </label>
                <input
                  {...register("brand")}
                  className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-amber-600 focus:border-transparent transition ${
                    errors.brand ? "border-red-500" : "border-gray-300"
                  }`}
                  placeholder="Enter brand name"
                />
                {errors.brand && (
                  <p className="text-red-500 text-sm mt-1 flex items-center">
                    <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                    </svg>
                    {errors.brand.message}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Model <span className="text-red-500">*</span>
                </label>
                <input
                  {...register("model")}
                  className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-amber-600 focus:border-transparent transition ${
                    errors.model ? "border-red-500" : "border-gray-300"
                  }`}
                  placeholder="Enter model name"
                />
                {errors.model && (
                  <p className="text-red-500 text-sm mt-1 flex items-center">
                    <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                    </svg>
                    {errors.model.message}
                  </p>
                )}
              </div>
            </div>

            {/* Technology, Width, Shedding System */}
            <div className="grid md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Technology
                </label>
                <input
                  {...register("technology")}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-600 focus:border-transparent transition"
                  placeholder="e.g. Airjet, Rapier"
                />
                {errors.technology && (
                  <p className="text-red-500 text-sm mt-1">{errors.technology.message}</p>
                )}
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Width
                </label>
                <input
                  {...register("width")}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-600 focus:border-transparent transition"
                  placeholder="e.g. 220 cm"
                />
                {errors.width && (
                  <p className="text-red-500 text-sm mt-1">{errors.width.message}</p>
                )}
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Shedding System
                </label>
                <input
                  {...register("sheddingSystem")}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-600 focus:border-transparent transition"
                  placeholder="e.g. Dobby, Jacquard"
                />
                {errors.sheddingSystem && (
                  <p className="text-red-500 text-sm mt-1">{errors.sheddingSystem.message}</p>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Contact Information Section */}
        <div className="bg-blue-50 p-4 rounded-lg border border-blue-100">
          <h3 className="text-lg font-semibold text-[#0B3B61] mb-4 flex items-center">
            <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
              <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
            </svg>
            Contact Information
          </h3>

          <div className="grid md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Full Name <span className="text-red-500">*</span>
              </label>
              <input
                {...register("name")}
                className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-amber-600 focus:border-transparent transition ${
                  errors.name ? "border-red-500" : "border-gray-300"
                }`}
                placeholder="Enter your full name"
              />
              {errors.name && (
                <p className="text-red-500 text-sm mt-1 flex items-center">
                  <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                  </svg>
                  {errors.name.message}
                </p>
              )}
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email <span className="text-red-500">*</span>
              </label>
              <input
                type="email"
                {...register("email")}
                className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-amber-600 focus:border-transparent transition ${
                  errors.email ? "border-red-500" : "border-gray-300"
                }`}
                placeholder="your.email@example.com"
              />
              {errors.email && (
                <p className="text-red-500 text-sm mt-1 flex items-center">
                  <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                  </svg>
                  {errors.email.message}
                </p>
              )}
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Phone Number <span className="text-red-500">*</span>
              </label>
              <input
                {...register("phone")}
                className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-amber-600 focus:border-transparent transition ${
                  errors.phone ? "border-red-500" : "border-gray-300"
                }`}
                placeholder="e.g. +1 234 567 8900"
              />
              {errors.phone && (
                <p className="text-red-500 text-sm mt-1 flex items-center">
                  <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                  </svg>
                  {errors.phone.message}
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Additional Info */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Additional Information
          </label>
          <textarea
            {...register("additionalInfo")}
            rows={4}
            placeholder="Tell us more about your machine's condition, age, maintenance history, or any special features..."
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-600 focus:border-transparent transition resize-vertical"
          />
          <div className="flex justify-between text-xs text-gray-500 mt-1">
            <span>Optional details that can help sell your machine faster</span>
            <span>{additionalInfoValue.length}/500</span>
          </div>
          {errors.additionalInfo && (
            <p className="text-red-500 text-sm mt-1">{errors.additionalInfo.message}</p>
          )}
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 pt-4">
          <button
            type="button"
            onClick={handleReset}
            disabled={isSubmitting || !isDirty}
            className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition disabled:opacity-50 disabled:cursor-not-allowed flex-1"
          >
            Clear Form
          </button>
          <button
            type="submit"
            disabled={isSubmitting || !isDirty || !isValid}
            className="px-6 py-3 bg-[#0B3B61] hover:bg-amber-600 text-white rounded-lg font-medium transition disabled:opacity-50 disabled:cursor-not-allowed flex-1 flex items-center justify-center"
          >
            {isSubmitting ? (
              <>
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Processing...
              </>
            ) : (
              "Post Machine for Sale"
            )}
          </button>
        </div>

        {/* Form Status */}
        <div className="text-center">
          <p className="text-sm text-gray-500">
            {!isDirty ? "Fill in the form to list your machine" : 
             !isValid ? "Please fix the errors above" : 
             "Ready to submit!"}
          </p>
        </div>
      </form>
    </div>
  );
}