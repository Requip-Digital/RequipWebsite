"use client";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation"; 

const formSchema = z.object({
  brand: z.string().min(1, "Brand is required"),
  model: z.string().min(1, "Model is required"),
  technology: z.string().optional(),
  width: z.string().optional(),
  sheddingSystem: z.string().optional(),
  additionalInfo: z.string().optional(),
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email address"),
  phone: z
    .string()
    .min(10, "Phone must be at least 10 digits")
    .max(15, "Phone number too long"),
});

type FormData = z.infer<typeof formSchema>;

export default function SellMachineForm() {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
  });

  const onSubmit = async (data: FormData) => {
    try {
      const res = await fetch("/api/sell", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (res.ok) {
        toast.success("Sell form submitted successfully!");
        reset();
        router.push("/success?type=sell"); 
      } else {
        toast.error("Failed to submit form. Please try again.");
      }
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong. Please try again.");
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto p-8 rounded-xl shadow-md border border-blue-100 font-Helvetica bg-white">
      <h2 className="text-4xl font-bold text-blue-600 mb-1 text-center">
        Sell Your Machine
      </h2>
      <p className="text-sm text-gray-500 mb-6 text-center">
        Fill out the form to post your machine for selling.
      </p>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Brand */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Brand
          </label>
          <input
            {...register("brand")}
            className="w-full mt-1 p-2 border rounded-md focus:ring-2 focus:ring-blue-600"
            placeholder="Enter brand"
          />
          {errors.brand && (
            <p className="text-red-500 text-sm mt-1">{errors.brand.message}</p>
          )}
        </div>

        {/* Model */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Model
          </label>
          <input
            {...register("model")}
            className="w-full mt-1 p-2 border rounded-md focus:ring-2 focus:ring-blue-600"
            placeholder="Enter model"
          />
          {errors.model && (
            <p className="text-red-500 text-sm mt-1">{errors.model.message}</p>
          )}
        </div>

        {/* Technology, Width, Shedding System */}
        <div className="grid md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Technology
            </label>
            <input
              {...register("technology")}
              className="w-full mt-1 p-2 border rounded-md focus:ring-2 focus:ring-blue-600"
              placeholder="e.g. Airjet"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Width
            </label>
            <input
              {...register("width")}
              className="w-full mt-1 p-2 border rounded-md focus:ring-2 focus:ring-blue-600"
              placeholder="e.g. 220"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Shedding System
            </label>
            <input
              {...register("sheddingSystem")}
              className="w-full mt-1 p-2 border rounded-md focus:ring-2 focus:ring-blue-600"
              placeholder="e.g. Dobby"
            />
          </div>
        </div>

        {/* Name, Email, Phone */}
        <div className="grid md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Full Name
            </label>
            <input
              {...register("name")}
              className="w-full mt-1 p-2 border rounded-md focus:ring-2 focus:ring-blue-600"
              placeholder="Enter your name"
            />
            {errors.name && (
              <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              {...register("email")}
              className="w-full mt-1 p-2 border rounded-md focus:ring-2 focus:ring-blue-600"
              placeholder="Enter your email"
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Phone Number
            </label>
            <input
              {...register("phone")}
              className="w-full mt-1 p-2 border rounded-md focus:ring-2 focus:ring-blue-600"
              placeholder="Enter your phone"
            />
            {errors.phone && (
              <p className="text-red-500 text-sm mt-1">{errors.phone.message}</p>
            )}
          </div>
        </div>

        {/* Additional Info */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Additional Info
          </label>
          <textarea
            {...register("additionalInfo")}
            rows={4}
            placeholder="Any extra requirements or details..."
            className="w-full mt-1 p-2 border rounded-md focus:ring-2 focus:ring-blue-600"
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-blue-600 hover:bg-blue-800 text-white py-3 rounded-md font-medium transition disabled:opacity-50"
        >
          {isSubmitting ? "Posting..." : "Post Machine"}
        </button>
      </form>
    </div>
  );
}
