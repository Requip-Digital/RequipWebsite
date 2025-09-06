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
  sheddingSystem: z.string().optional(),
  additionalInfo: z.string().optional(),
  name: z.string().min(1, "Name is required"),
  phone: z.string().min(10, "Phone must be at least 10 digits"),
  email: z.string().email("Invalid email address"),
});

type FormData = z.infer<typeof formSchema>;

// ✅ Technology → Brand mapping
const technologyBrandMap: Record<string, string[]> = {
  Airjet: ["Toyota", "Picanol", "Tsudakoma"],
  Rapier: ["Picanol", "Somet", "Vamatex", "ITEMA"],
};

// ✅ Brand → Technology → Model mapping
const brandModelMap: Record<string, Record<string, string[]>> = {
  Toyota: { Airjet: ["JAT 610", "JAT 710", "JAT 810", "JAT 910"] },
  Picanol: {
    Airjet: ["OmniPlus", "OmniPlus 800", "OmniPlus Summun", "OmniPlus i connect"],
    Rapier: ["GTM", "GTM AS", "Optimax", "OptiMax-i", "GTX Plus", "GT Max", "Gamma X"],
  },
  Tsudakoma: {
    Airjet: ["ZAX", "ZAX E", "ZAX N", "ZAX 9100", "ZAX 9200i", "ZAX 9200i Master"],
  },
  Somet: { Rapier: ["Thema Super Excel", "Thema Excel", "SM92", "SM93", "Thema 11"] },
  Vamatex: {
    Rapier: [
      "Leonardo Silver 501",
      "Leonardo T710",
      "Leonardo Silver HS",
      "Silver Dyna",
      "Silver DT",
      "C 401",
      "P 401",
      "P1001 es",
      "K88",
      "Lenonardo",
      "SP 1151",
    ],
  },
  ITEMA: { Rapier: ["R9500", "R9000", "R8800"] },
};

// ✅ Function to dynamically determine shedding options
function getSheddingOptions(technology: string | null, brand: string | null) {
  if (!technology) return [];

  if (technology === "Airjet") {
    if (brand === "Toyota") {
      return ["Cam", "Dobby", "Crank", "Jacquard", "E-shedding"];
    }
    return ["Cam", "Dobby", "Crank", "Jacquard"];
  }

  if (technology === "Rapier") {
    return ["Cam", "Dobby", "Jacquard"];
  }

  return [];
}

export default function BuyForm() {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    reset,
  } = useForm<FormData>({ resolver: zodResolver(formSchema) });

  const [selectedTechnology, setSelectedTechnology] = useState<string | null>(null);
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
        setSelectedTechnology(null);
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

  // ✅ Dynamically filter brands by selected technology
  const filteredBrands = selectedTechnology
    ? technologyBrandMap[selectedTechnology] || []
    : Object.keys(brandModelMap);

  // ✅ Dynamically filter models by selected brand + technology
  const filteredModels =
    selectedBrand && selectedTechnology
      ? brandModelMap[selectedBrand]?.[selectedTechnology] || []
      : [];

  const filteredSheddingSystems = getSheddingOptions(
    selectedTechnology,
    selectedBrand
  );

  return (
    <div className="w-full max-w-3xl mx-auto p-6 font-Helvetica">
      <h2 className="text-4xl font-bold text-blue-600 mb-2 text-left">
        Buy a Machine
      </h2>
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
            value={selectedTechnology || ""}
            onChange={(e) => {
              const tech = e.target.value;
              setSelectedTechnology(tech || null);
              setValue("technology", tech);
              setSelectedBrand(null);
              setSelectedModel(null);
              setValue("brand", "");
              setValue("model", "");
              setValue("sheddingSystem", "");
            }}
            className="w-full mt-1 p-2 border rounded-md focus:ring-2 focus:ring-blue-600"
          >
            <option value="">Select</option>
            {Object.keys(technologyBrandMap).map((tech) => (
              <option key={tech} value={tech}>
                {tech}
              </option>
            ))}
          </select>
        </div>

        {/* 2. Brand */}
        {filteredBrands.length > 0 && (
          <div>
            <label className="block text-sm text-gray-700 mb-2">
              Select Brand
            </label>
            <div className="flex gap-3 flex-wrap">
              {filteredBrands.map((brand) => (
                <button
                  type="button"
                  key={brand}
                  onClick={() => {
                    setSelectedBrand(brand);
                    setValue("brand", brand);
                    setSelectedModel(null);
                    setValue("model", "");
                    setValue("sheddingSystem", "");
                  }}
                  className={`px-4 py-2 border rounded-md ${
                    selectedBrand === brand
                      ? "bg-blue-600 text-white"
                      : "bg-white"
                  }`}
                >
                  {brand}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* 3. Model */}
        {selectedBrand && filteredModels.length > 0 && (
          <div>
            <label className="block text-sm text-gray-700 mb-2">
              Select Model
            </label>
            <div className="flex gap-3 flex-wrap">
              {filteredModels.map((model) => (
                <button
                  type="button"
                  key={model}
                  onClick={() => {
                    setSelectedModel(model);
                    setValue("model", model);
                  }}
                  className={`px-4 py-2 border rounded-md ${
                    selectedModel === model
                      ? "bg-blue-600 text-white"
                      : "bg-white"
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
              <option key={w} value={w}>
                {w}
              </option>
            ))}
          </select>
        </div>

        {/* 5. Shedding System */}
        <div>
          <label className="block text-sm text-gray-700">Shedding System</label>
          <select
            {...register("sheddingSystem")}
            disabled={!selectedTechnology}
            className="w-full mt-1 p-2 border rounded-md focus:ring-2 focus:ring-blue-600 disabled:bg-gray-100"
          >
            <option value="">Select</option>
            {filteredSheddingSystems.map((system) => (
              <option key={system} value={system}>
                {system}
              </option>
            ))}
          </select>
        </div>

        {/* Name, Phone, Email */}
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <label className="block text-sm text-gray-700">Full Name</label>
            <input
              {...register("name")}
              className="w-full mt-1 p-2 border rounded-md focus:ring-2 focus:ring-blue-600"
            />
            {errors.name && (
              <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
            )}
          </div>
          <div className="flex-1">
            <label className="block text-sm text-gray-700">Phone Number</label>
            <input
              {...register("phone")}
              className="w-full mt-1 p-2 border rounded-md focus:ring-2 focus:ring-blue-600"
            />
            {errors.phone && (
              <p className="text-red-500 text-sm mt-1">{errors.phone.message}</p>
            )}
          </div>
          <div className="flex-1">
            <label className="block text-sm text-gray-700">Email</label>
            <input
              {...register("email")}
              className="w-full mt-1 p-2 border rounded-md focus:ring-2 focus:ring-blue-600"
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
            )}
          </div>
        </div>

        {/* Additional Info */}
        <div>
          <label className="block text-sm font-bold text-gray-700">
            Additional Info
          </label>
          <textarea
            {...register("additionalInfo")}
            rows={4}
            placeholder="Any extra requirements or details..."
            className="w-full mt-1 p-2 border rounded-md focus:ring-2 focus:ring-blue-600"
          />
        </div>

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
