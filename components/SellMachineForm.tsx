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
      <div className="w-full max-w-2xl mx-auto p-6 rounded-2xl shadow-sm border border-green-200 bg-green-50/80 backdrop-blur-sm">
        <div className="text-center">
          <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-green-100 mb-4">
            <svg className="h-8 w-8 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h3 className="text-xl font-bold text-green-800 mb-2">Submission Successful!</h3>
          <p className="text-green-600 text-sm">Your machine listing has been submitted successfully.</p>
          <p className="text-green-500 text-sm mt-1">Redirecting to success page...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-2xl mx-auto p-4 sm:p-6 rounded-2xl shadow-sm border border-blue-100 bg-white font-Helvetica">
      {/* Header - Mobile Optimized */}
      <div className="text-center mb-6">
        <h2 className="text-2xl sm:text-3xl font-bold text-[#0B3B61] mb-3">
          Sell Your Machine
        </h2>
        <p className="text-xs sm:text-sm text-gray-600 max-w-md mx-auto leading-relaxed">
          Fill out the form below to post your machine for selling. We'll get back to you within 24 hours.
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        {/* Machine Details Section */}
        <div className="bg-blue-50/50 p-4 sm:p-5 rounded-xl border border-blue-100">
          <h3 className="text-base sm:text-lg font-semibold text-[#0B3B61] mb-4 flex items-center">
            <svg className="w-4 h-4 sm:w-5 sm:h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H7z" clipRule="evenodd" />
            </svg>
            Machine Details
          </h3>
          
          <div className="space-y-4">
            {/* Brand & Model - Stack on mobile */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Brand <span className="text-red-500">*</span>
                </label>
                <input
                  {...register("brand")}
                  className={`w-full p-3 text-sm border rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all duration-200 ${
                    errors.brand ? "border-red-400 bg-red-50/50" : "border-gray-300"
                  }`}
                  placeholder="Enter brand name"
                />
                {errors.brand && (
                  <p className="text-red-500 text-xs mt-2 flex items-center">
                    <svg className="w-3 h-3 mr-1 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                    </svg>
                    {errors.brand.message}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Model <span className="text-red-500">*</span>
                </label>
                <input
                  {...register("model")}
                  className={`w-full p-3 text-sm border rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all duration-200 ${
                    errors.model ? "border-red-400 bg-red-50/50" : "border-gray-300"
                  }`}
                  placeholder="Enter model name"
                />
                {errors.model && (
                  <p className="text-red-500 text-xs mt-2 flex items-center">
                    <svg className="w-3 h-3 mr-1 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                    </svg>
                    {errors.model.message}
                  </p>
                )}
              </div>
            </div>

            {/* Technology, Width, Shedding System - Stack on mobile */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Technology
                </label>
                <input
                  {...register("technology")}
                  className="w-full p-3 text-sm border border-gray-300 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all duration-200"
                  placeholder="e.g. Airjet, Rapier"
                />
                {errors.technology && (
                  <p className="text-red-500 text-xs mt-2">{errors.technology.message}</p>
                )}
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Width
                </label>
                <input
                  {...register("width")}
                  className="w-full p-3 text-sm border border-gray-300 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all duration-200"
                  placeholder="e.g. 220 cm"
                />
                {errors.width && (
                  <p className="text-red-500 text-xs mt-2">{errors.width.message}</p>
                )}
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Shedding System
                </label>
                <input
                  {...register("sheddingSystem")}
                  className="w-full p-3 text-sm border border-gray-300 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all duration-200"
                  placeholder="e.g. Dobby, Jacquard"
                />
                {errors.sheddingSystem && (
                  <p className="text-red-500 text-xs mt-2">{errors.sheddingSystem.message}</p>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Contact Information Section */}
        <div className="bg-blue-50/50 p-4 sm:p-5 rounded-xl border border-blue-100">
          <h3 className="text-base sm:text-lg font-semibold text-[#0B3B61] mb-4 flex items-center">
            <svg className="w-4 h-4 sm:w-5 sm:h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
              <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
            </svg>
            Contact Information
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="sm:col-span-3 md:col-span-1">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Full Name <span className="text-red-500">*</span>
              </label>
              <input
                {...register("name")}
                className={`w-full p-3 text-sm border rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all duration-200 ${
                  errors.name ? "border-red-400 bg-red-50/50" : "border-gray-300"
                }`}
                placeholder="Enter your full name"
              />
              {errors.name && (
                <p className="text-red-500 text-xs mt-2 flex items-center">
                  <svg className="w-3 h-3 mr-1 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                  </svg>
                  {errors.name.message}
                </p>
              )}
            </div>
            
            <div className="sm:col-span-3 md:col-span-1">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email <span className="text-red-500">*</span>
              </label>
              <input
                type="email"
                {...register("email")}
                className={`w-full p-3 text-sm border rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all duration-200 ${
                  errors.email ? "border-red-400 bg-red-50/50" : "border-gray-300"
                }`}
                placeholder="your.email@example.com"
              />
              {errors.email && (
                <p className="text-red-500 text-xs mt-2 flex items-center">
                  <svg className="w-3 h-3 mr-1 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                  </svg>
                  {errors.email.message}
                </p>
              )}
            </div>
            
            <div className="sm:col-span-3 md:col-span-1">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Phone Number <span className="text-red-500">*</span>
              </label>
              <input
                {...register("phone")}
                className={`w-full p-3 text-sm border rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all duration-200 ${
                  errors.phone ? "border-red-400 bg-red-50/50" : "border-gray-300"
                }`}
                placeholder="e.g. +1 234 567 8900"
              />
              {errors.phone && (
                <p className="text-red-500 text-xs mt-2 flex items-center">
                  <svg className="w-3 h-3 mr-1 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                  </svg>
                  {errors.phone.message}
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Additional Info */}
        <div className="bg-gray-50/50 p-4 rounded-xl border border-gray-100">
          <label className="block text-sm font-medium text-gray-700 mb-3">
            Additional Information
          </label>
          <textarea
            {...register("additionalInfo")}
            rows={4}
            placeholder="Tell us more about your machine's condition, age, maintenance history, or any special features..."
            className="w-full p-3 text-sm border border-gray-300 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all duration-200 resize-vertical bg-white"
          />
          <div className="flex justify-between text-xs text-gray-500 mt-2">
            <span className="text-gray-400">Optional details that can help sell your machine faster</span>
            <span className={additionalInfoValue.length > 450 ? "text-amber-600 font-medium" : "text-gray-400"}>
              {additionalInfoValue.length}/500
            </span>
          </div>
          {errors.additionalInfo && (
            <p className="text-red-500 text-xs mt-2">{errors.additionalInfo.message}</p>
          )}
        </div>

        {/* Action Buttons - Stack on mobile */}
        <div className="flex flex-col sm:flex-row gap-3 pt-2">
          <button
            type="button"
            onClick={handleReset}
            disabled={isSubmitting || !isDirty}
            className="px-6 py-3.5 border border-gray-300 text-gray-700 rounded-xl font-medium hover:bg-gray-50 active:scale-95 transition-all duration-200 disabled:opacity-40 disabled:cursor-not-allowed disabled:active:scale-100 flex-1 text-sm"
          >
            Clear Form
          </button>
          <button
            type="submit"
            disabled={isSubmitting || !isDirty || !isValid}
            className="px-6 py-3.5 bg-[#0B3B61] hover:bg-amber-600 text-white rounded-xl font-medium transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:active:scale-100 flex-1 flex items-center justify-center text-sm shadow-sm hover:shadow-md"
          >
            {isSubmitting ? (
              <>
                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
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
        <div className="text-center pt-2">
          <p className={`text-xs ${
            !isDirty ? "text-gray-400" : 
            !isValid ? "text-amber-600" : 
            "text-green-600"
          }`}>
            {!isDirty ? "Fill in the form to list your machine" : 
             !isValid ? "Please fix the errors above" : 
             "✓ Ready to submit!"}
          </p>
        </div>
      </form>
    </div>
  );
}