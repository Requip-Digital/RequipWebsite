"use client";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";

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
  Airjet: ["Toyota", "Picanol", "Tsudokoma"],
  Rapier: ["Picanol", "Somet", "Vamatex", "ITEMA"],
};

// ✅ Brand → Technology → Model mapping
const brandModelMap: Record<string, Record<string, string[]>> = {
  Toyota: { Airjet: ["JAT 610", "JAT 710", "JAT 810", "JAT 910"] },
  Picanol: {
    Airjet: ["OmniPlus", "OmniPlus 800", "OmniPlus Summun", "OmniPlus i connect"],
    Rapier: ["GTM", "GTM AS", "Optimax", "OptiMax-i", "GTX Plus", "GT Max", "Gamma X"],
  },
  Tsudokoma: {
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

export default function BuyMachineForm() {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setValue,
    reset,
    watch,
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
        toast.success("Inquiry submitted successfully!");
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
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="w-full max-w-4xl mx-auto"
    >
      {/* Background Elements */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        {/* Grid Pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_50%,black,transparent)]"></div>
        
        {/* Animated Orbs */}
        <motion.div
          className="absolute top-10 left-10 w-40 h-40 bg-amber-500/5 rounded-full blur-2xl"
          animate={{
            scale: [1, 1.1, 1],
            opacity: [0.2, 0.3, 0.2],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div
          className="absolute bottom-10 right-10 w-32 h-32 bg-blue-500/5 rounded-full blur-2xl"
          animate={{
            scale: [1.1, 1, 1.1],
            opacity: [0.3, 0.2, 0.3],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2
          }}
        />
      </div>

      <div className="text-center mb-8">
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-4xl font-bold bg-gradient-to-r from-[#0B3B61] via-[#0B3B61] to-amber-500 bg-clip-text text-transparent mb-4"
        >
          Get Your Machine Quote
        </motion.h2>
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-gray-600 text-lg"
        >
          Fill out the form below and our experts will contact you within 24 hours
        </motion.p>
      </div>

      <motion.form 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.3 }}
        onSubmit={handleSubmit(onSubmit)} 
        className="space-y-8 relative z-10"
      >
        {/* Technology Selection */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <label className="block text-sm font-semibold text-gray-700 mb-3">
            Technology
          </label>
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
            className="w-full px-4 py-3 bg-white/90 backdrop-blur-sm border border-gray-300/80 rounded-2xl focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all duration-300 shadow-sm hover:shadow-md"
          >
            <option value="">Select Technology</option>
            {Object.keys(technologyBrandMap).map((tech) => (
              <option key={tech} value={tech}>
                {tech}
              </option>
            ))}
          </select>
        </motion.div>

        {/* Brand Selection */}
        {filteredBrands.length > 0 && (
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
          >
            <label className="block text-sm font-semibold text-gray-700 mb-3">
              Select Brand
            </label>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
              {filteredBrands.map((brand) => (
                <motion.button
                  type="button"
                  key={brand}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => {
                    setSelectedBrand(brand);
                    setValue("brand", brand);
                    setSelectedModel(null);
                    setValue("model", "");
                    setValue("sheddingSystem", "");
                  }}
                  className={`p-4 rounded-2xl border-2 transition-all duration-300 backdrop-blur-sm ${
                    selectedBrand === brand
                      ? "bg-gradient-to-r from-amber-500 to-amber-600 text-white border-amber-500 shadow-lg"
                      : "bg-white/90 border-gray-300/80 hover:border-amber-500 hover:shadow-md"
                  }`}
                >
                  <span className="font-medium">{brand}</span>
                </motion.button>
              ))}
            </div>
          </motion.div>
        )}

        {/* Model Selection */}
        {selectedBrand && filteredModels.length > 0 && (
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            <label className="block text-sm font-semibold text-gray-700 mb-3">
              Select Model
            </label>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
              {filteredModels.map((model) => (
                <motion.button
                  type="button"
                  key={model}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => {
                    setSelectedModel(model);
                    setValue("model", model);
                  }}
                  className={`p-3 rounded-xl border-2 transition-all duration-300 backdrop-blur-sm ${
                    selectedModel === model
                      ? "bg-gradient-to-r from-amber-500 to-amber-600 text-white border-amber-500 shadow-lg"
                      : "bg-white/90 border-gray-300/80 hover:border-amber-500 hover:shadow-md"
                  }`}
                >
                  <span className="text-sm font-medium">{model}</span>
                </motion.button>
              ))}
            </div>
          </motion.div>
        )}

        {/* Specifications Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Width */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.7 }}
          >
            <label className="block text-sm font-semibold text-gray-700 mb-3">
              Width (cm)
            </label>
            <select
              {...register("width")}
              className="w-full px-4 py-3 bg-white/90 backdrop-blur-sm border border-gray-300/80 rounded-2xl focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all duration-300 shadow-sm hover:shadow-md"
            >
              <option value="">Select Width</option>
              {[190, 210, 220, 230, 260, 280, 290, 340, 360, 390].map((w) => (
                <option key={w} value={w}>
                  {w} cm
                </option>
              ))}
            </select>
          </motion.div>

          {/* Shedding System */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
          >
            <label className="block text-sm font-semibold text-gray-700 mb-3">
              Shedding System
            </label>
            <select
              {...register("sheddingSystem")}
              disabled={!selectedTechnology}
              className="w-full px-4 py-3 bg-white/90 backdrop-blur-sm border border-gray-300/80 rounded-2xl focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all duration-300 shadow-sm hover:shadow-md disabled:bg-gray-100/80 disabled:text-gray-500"
            >
              <option value="">Select System</option>
              {filteredSheddingSystems.map((system) => (
                <option key={system} value={system}>
                  {system}
                </option>
              ))}
            </select>
          </motion.div>
        </div>

        {/* Contact Information */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.9 }}
          className="bg-gradient-to-r from-cyan-50/80 to-blue-50/80 backdrop-blur-sm rounded-2xl p-6 border border-blue-200/50 shadow-sm"
        >
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Contact Information</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Full Name *
              </label>
              <input
                {...register("name")}
                className="w-full px-4 py-3 bg-white/90 backdrop-blur-sm border border-gray-300/80 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all duration-300 shadow-sm hover:shadow-md"
                placeholder="Enter your name"
              />
              {errors.name && (
                <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Phone Number *
              </label>
              <input
                {...register("phone")}
                className="w-full px-4 py-3 bg-white/90 backdrop-blur-sm border border-gray-300/80 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all duration-300 shadow-sm hover:shadow-md"
                placeholder="Enter your phone"
              />
              {errors.phone && (
                <p className="text-red-500 text-sm mt-1">{errors.phone.message}</p>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email Address *
              </label>
              <input
                {...register("email")}
                className="w-full px-4 py-3 bg-white/90 backdrop-blur-sm border border-gray-300/80 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all duration-300 shadow-sm hover:shadow-md"
                placeholder="Enter your email"
              />
              {errors.email && (
                <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
              )}
            </div>
          </div>
        </motion.div>

        {/* Additional Information */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.0 }}
        >
          <label className="block text-sm font-semibold text-gray-700 mb-3">
            Additional Requirements
          </label>
          <textarea
            {...register("additionalInfo")}
            rows={4}
            placeholder="Tell us about any specific requirements, preferred year of manufacture, budget range, or other details..."
            className="w-full px-4 py-3 bg-white/90 backdrop-blur-sm border border-gray-300/80 rounded-2xl focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all duration-300 resize-none shadow-sm hover:shadow-md"
          />
        </motion.div>

        {/* Submit Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.1 }}
          className="pt-4"
        >
          <motion.button
            type="submit"
            disabled={isSubmitting}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="w-full bg-gradient-to-r from-[#0B3B61] to-[#0B3B61] hover:from-amber-600 hover:to-amber-500 text-white py-4 rounded-2xl font-bold text-lg shadow-xl hover:shadow-2xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed relative overflow-hidden group"
          >
            {/* Button Background Effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-amber-500 to-amber-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            
            <span className="relative z-10 flex items-center justify-center">
              {isSubmitting ? (
                <>
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Processing...
                </>
              ) : (
                "Submit Inquiry"
              )}
            </span>
          </motion.button>
          
          <p className="text-center text-gray-500 text-sm mt-4">
            Our expert will contact you within 24 hours with the best options
          </p>
        </motion.div>
      </motion.form>
    </motion.div>
  );
}