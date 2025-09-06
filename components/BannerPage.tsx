"use client";

interface PageBannerProps {
  title: string;
  image: string;
}

export default function PageBanner({ title, image }: PageBannerProps) {
  return (
    <div className="relative w-full h-64">
      {/* Banner Image */}
      <img
        src={image}
        alt={title}
        className="w-full h-full object-cover"
      />

      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
        <h1 className="text-white text-4xl font-bold drop-shadow-lg">
          {title}
        </h1>
      </div>
    </div>
  );
}
