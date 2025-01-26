import { useState, useRef } from "react";
import { ImageIcon } from "lucide-react";

export default function ImageUpload({ onImageUpload }) {
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef(null);

  const handleFile = (file) => {
    if (file.type.startsWith("image/")) {
      const reader = new FileReader();
      reader.onload = (e) => {
        if (typeof e.target.result === "string") {
          onImageUpload(e.target.result); // Pass base64 to parent
        }
      };
      reader.readAsDataURL(file);
    } else {
      alert("Please upload an image file");
    }
  };

  return (
    <div
      className={`flex flex-col items-center p-4 border-2 border-dashed rounded-lg ${
        isDragging
          ? "border-blue-500 bg-blue-50 dark:bg-blue-900"
          : "border-gray-300"
      }`}
      onDragOver={(e) => {
        e.preventDefault();
        setIsDragging(true);
      }}
      onDragLeave={() => setIsDragging(false)}
      onDrop={(e) => {
        e.preventDefault();
        setIsDragging(false);
        if (e.dataTransfer.files.length > 0) {
          handleFile(e.dataTransfer.files[0]);
        }
      }}
    >
      <ImageIcon className="w-8 h-8 mb-2 text-gray-400" />
      <p className="text-sm text-gray-500">
        Drag & drop an image or click to select
      </p>
      <input
        type="file"
        ref={fileInputRef}
        className="hidden"
        onChange={(e) => handleFile(e.target.files[0])}
        accept="image/*"
      />
      <button onClick={() => fileInputRef.current.click()} className="mt-2">
        Select Image
      </button>
    </div>
  );
}
