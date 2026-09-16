import { useState } from "react";
import { Upload, Pencil } from "lucide-react";
import { addPharmacyDrugs } from "../../../api/services.api";

export default function AddProduct({ onDone, onAddProduct }) {
  const [preview, setPreview] = useState(null);

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    category: "",
    composition: "",
  });

  const handleImageUpload = (e) => {
    const file = e.target.files?.[0];

    if (file) {
      setPreview(URL.createObjectURL(file));
    }
  };
  const handleSubmit = async () => {
    try {
      const response = await addPharmacyDrugs(formData);

      onAddProduct(response);
      onDone();
    } catch (error) {
      console.error("Error adding product:", error);
    }
  };

  return (
    <div className="max-w-4xl mx-auto bg-white border border-[#E8E8F0] rounded-xl p-8">
      <h2 className="text-3xl font-semibold text-[#150D5E] mb-2">
        Add New Product
      </h2>

      <p className="text-[#8D8D8D] mb-8">
        Kindly upload your product details below
      </p>

      {/* IMAGE UPLOAD */}
      <label className="h-[220px] border-2 border-dashed border-[#D9D9D9] rounded-lg flex flex-col items-center justify-center cursor-pointer mb-8">
        {preview ? (
          <img
            src={preview}
            alt="product"
            className="w-full h-full object-cover rounded-lg"
          />
        ) : (
          <>
            <Upload className="text-gray-400 mb-3" />
            <p className="text-gray-400">Upload your product image</p>
            <span className="text-sm text-gray-300">or click to browse</span>
          </>
        )}

        <input
          type="file"
          hidden
          accept="image/*"
          onChange={handleImageUpload}
        />
      </label>

      <div className="space-y-5">
        {/* PRODUCT NAME */}
        <div>
          <label className="block mb-2 text-[#8D8D8D]">Medicine Name</label>

          <input
            type="text"
            value={formData.name}
            onChange={(e) =>
              setFormData({
                ...formData,
                name: e.target.value,
              })
            }
            className="w-full bg-[#F7F7FC] rounded-lg px-4 py-4 outline-none border border-transparent focus:border-[#150D5E]"
            placeholder="Paracetamol"
          />
        </div>

        {/* CATEGORY */}
        <div>
          <label className="block mb-2 text-[#8D8D8D]">Category</label>

          <input
            type="text"
            value={formData.category}
            onChange={(e) =>
              setFormData({
                ...formData,
                category: e.target.value,
              })
            }
            className="w-full bg-[#F7F7FC] rounded-lg px-4 py-4 outline-none border border-transparent focus:border-[#150D5E]"
            placeholder="Antibiotics"
          />
        </div>

        {/* DESCRIPTION */}
        <div>
          <label className="block mb-2 text-[#8D8D8D]">
            Description / Side Effects
          </label>

          <textarea
            rows={6}
            value={formData.description}
            onChange={(e) =>
              setFormData({
                ...formData,
                description: e.target.value,
              })
            }
            className="w-full bg-[#F7F7FC] rounded-lg px-4 py-4 outline-none resize-none border border-transparent focus:border-[#150D5E]"
            placeholder="Enter product description and side effects"
          />
        </div>

        {/* PRICE */}
        <div>
          <label className="block mb-2 text-[#8D8D8D]">Price</label>

          <input
            type="text"
            value={formData.price}
            onChange={(e) =>
              setFormData({
                ...formData,
                price: e.target.value,
              })
            }
            className="w-full bg-[#F7F7FC] rounded-lg px-4 py-4 outline-none border border-transparent focus:border-[#150D5E]"
            placeholder="₦1,500"
          />
        </div>
        {/* COMPOSITION */}
        <div>
          <label className="block mb-2 text-[#8D8D8D]">Composition</label>

          <textarea
            rows={4}
            value={formData.composition}
            onChange={(e) =>
              setFormData({
                ...formData,
                composition: e.target.value,
              })
            }
            className="w-full bg-[#F7F7FC] rounded-lg px-4 py-4 outline-none resize-none border border-transparent focus:border-[#150D5E]"
            placeholder="Enter composition details"
          />
        </div>

        {/* BUTTONS */}
        <div className="flex justify-end gap-4 pt-4">
          <button
            type="button"
            onClick={onDone}
            className="px-6 py-3 border border-gray-300 rounded-lg"
          >
            Cancel
          </button>

          <button
            type="button"
            onClick={handleSubmit}
            className="px-6 py-3 bg-[#150D5E] text-white rounded-lg hover:bg-[#22157d]"
          >
            Save Product
          </button>
        </div>
      </div>
    </div>
  );
}
