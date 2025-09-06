"use client";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

const formSchema = z.object({
  technology: z.string().optional(),
  brand: z.string().optional(),
  model: z.string().optional(),
  width: z.string().optional(),
  shieldingSystem: z.string().optional(),
  additionalInfo: z.string().optional(),
  name: z.string().min(1, "Name is required"),
  phone: z.string().min(10, "Phone must be at least 10 digits"),
  email: z.string().email("Invalid email address"),
});

type FormData = z.infer<typeof formSchema>;

const brandModelMap: Record<string, string[]> = {
  Toyota: ["JAT 610", "JAT 710", "JAT 810", "JAT 910"],
  Picanol: ["OmniPlus", "OmniPlus 800", "OmniPlus Summun", "OmniPlus i"],
  Tsudakoma: ["ZAX", "ZAX E", "ZAX N", "ZAX 9100", "ZAX 9200i connect"],
  Somet: ["Thema Super Excel", "Thema Excel", "SM92", "SM93", "Thema 11"],
  Vamatex: ["Leonardo Silver 501", "Leonardo T710", "Leonardo Silver HS", "Silver Dyna","Silver DT", "C 401", "P 401", "P1001 es", "K88", "Lenonardo", "SP 1151"],
  ITEMA: ["", "", "", ""],
};

export default function BuyForm() {
  const router = useRouter();
  const { register, handleSubmit, formState: { errors }, setValue, reset } =
    useForm<FormData>({ resolver: zodResolver(formSchema) });

  const [selectedBrand, setSelectedBrand] = useState<string | null>(null);
  const [selectedModel, setSelectedModel] = useState<string | null>(null);

  const onSubmit = async (data: FormData) => {
    try {
      const res = await fetch("/api/buy", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (res.ok) {
        reset();
        setSelectedBrand(null);
        setSelectedModel(null);
        router.push("/success?type=buy");
      } else {
        toast.error("Failed to submit form. Please try again.");
      }
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong. Please try again.");
    }
  };

  return (
    <div className="w-full max-w-3xl mx-auto p-6 font-Helvetica">
      <h2 className="text-4xl font-bold text-blue-600 mb-2 text-left">Buy a Machine</h2>
      <p className="text-sm text-gray-500 mb-6 text-left">
        Fill in the form to let us know your requirements.  
        Our team will get back to you with the best options within 24 hours.
      </p>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">

        {/* 1. Technology */}
        <div>
          <label className="block text-sm text-gray-700">Technology</label>
          <select
            {...register("technology")}
            className="w-full mt-1 p-2 border rounded-md focus:ring-2 focus:ring-blue-600"
          >
            <option value="">Select</option>
            <option value="Airjet">Airjet</option>
            <option value="Rapier">Rapier</option>
            <option value="Terry Airjet">Terry Airjet</option>
            <option value="Projectile">Projectile</option>
          </select>
        </div>

        {/* 2. Brand */}
        <div>
          <label className="block text-sm text-gray-700 mb-2">Select Brand</label>
          <div className="flex gap-3 flex-wrap">
            {Object.keys(brandModelMap).map((brand) => (
              <button
                type="button"
                key={brand}
                onClick={() => {
                  setSelectedBrand(brand);
                  setValue("brand", brand);
                  setSelectedModel(null);
                }}
                className={`px-4 py-2 border rounded-md ${
                  selectedBrand === brand ? "bg-blue-600 text-white" : "bg-white"
                }`}
              >
                {brand}
              </button>
            ))}
          </div>
        </div>

        {/* 3. Model */}
        {selectedBrand && (
          <div>
            <label className="block text-sm text-gray-700 mb-2">Select Model</label>
            <div className="flex gap-3 flex-wrap">
              {brandModelMap[selectedBrand].map((model) => (
                <button
                  type="button"
                  key={model}
                  onClick={() => {
                    setSelectedModel(model);
                    setValue("model", model);
                  }}
                  className={`px-4 py-2 border rounded-md ${
                    selectedModel === model ? "bg-blue-600 text-white" : "bg-white"
                  }`}
                >
                  {model}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* 4. Width */}
        <div>
          <label className="block text-sm text-gray-700">Width (cm)</label>
          <select
            {...register("width")}
            className="w-full mt-1 p-2 border rounded-md focus:ring-2 focus:ring-blue-600"
          >
            <option value="">Select</option>
            {[190, 210, 220, 230, 260, 280, 290, 340, 360, 390].map((w) => (
              <option key={w} value={w}>{w}</option>
            ))}
          </select>
        </div>

        {/* 5. Shedding System */}
        <div>
          <label className="block text-sm text-gray-700">Shedding System</label>
          <select
            {...register("shieldingSystem")}
            className="w-full mt-1 p-2 border rounded-md focus:ring-2 focus:ring-blue-600"
          >
            <option value="">Select</option>
            <option value="Cam">Cam</option>
            <option value="Dobby">Dobby</option>
            <option value="Jacquard">Jacquard</option>
            <option value="E-shedding">E-shedding</option>
            <option value="Crank">Crank</option>
          </select>
        </div>

        {/* 6-8. Name, Phone, Email */}
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <label className="block text-sm text-gray-700">Full Name</label>
            <input
              {...register("name")}
              className="w-full mt-1 p-2 border rounded-md focus:ring-2 focus:ring-blue-600"
            />
            {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>}
          </div>
          <div className="flex-1">
            <label className="block text-sm text-gray-700">Phone Number</label>
            <input
              {...register("phone")}
              className="w-full mt-1 p-2 border rounded-md focus:ring-2 focus:ring-blue-600"
            />
            {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone.message}</p>}
          </div>
          <div className="flex-1">
            <label className="block text-sm text-gray-700">Email</label>
            <input
              {...register("email")}
              className="w-full mt-1 p-2 border rounded-md focus:ring-2 focus:ring-blue-600"
            />
            {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
          </div>
        </div>

        {/* 9. Additional Info */}
        <div>
          <label className="block text-sm font-bold text-gray-700">Additional Info</label>
          <textarea
            {...register("additionalInfo")}
            rows={4}
            placeholder="Any extra requirements or details..."
            className="w-full mt-1 p-2 border rounded-md focus:ring-2 focus:ring-blue-600"
          />
        </div>

        {/* Submit */}
        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-800 text-white py-3 rounded-md font-bold transition"
        >
          Submit Inquiry
        </button>
      </form>
    </div>
  );
}
