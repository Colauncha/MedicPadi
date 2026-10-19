import { useState, useEffect } from "react";
import {
  Upload,
  Pencil,
  Loader2,
  ChevronDown,
  AlertCircle,
  X,
} from "lucide-react";
import {
  addPharmacyDrugs,
  drugUploadPicture,
  listDrugCategories,
} from "../../../api/services.api";

export default function AddProduct({ onDone, onAddProduct, categories = [] }) {
  const [selectedFile, setSelectedFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [categoryList, setCategoryList] = useState(categories || []);
  const [isLoadingCategories, setIsLoadingCategories] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState("");

  const [formData, setFormData] = useState({
    user_id: "",
    name: "",
    description: "",
    price: "",
    composition: "",
    category_id: "",
    available: true,
    requiresPrescription: false,
    dosage: "",
    sideEffect: "",
    linkToMedWebsite: "",
  });

  // Sync categoryList with categories prop or fetch dynamically if categories is empty
  useEffect(() => {
    if (categories && categories.length > 0) {
      setCategoryList(categories);
    } else {
      let isMounted = true;
      setIsLoadingCategories(true);
      listDrugCategories()
        .then((res) => {
          if (!isMounted) return;
          let list = [];
          if (Array.isArray(res)) {
            list = res;
          } else if (res && Array.isArray(res.data)) {
            list = res.data;
          } else if (res && Array.isArray(res.categories)) {
            list = res.categories;
          } else if (res && typeof res === "object") {
            const arrayProp = Object.values(res).find((val) =>
              Array.isArray(val),
            );
            if (arrayProp) list = arrayProp;
          }
          setCategoryList(list);
        })
        .catch((err) => {
          console.error("Failed to fetch drug categories:", err);
        })
        .finally(() => {
          if (isMounted) setIsLoadingCategories(false);
        });

      return () => {
        isMounted = false;
      };
    }
  }, [categories]);

  const handleImageUpload = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      setPreview(URL.createObjectURL(file));
      setError("");
    }
  };

  const handleRemoveImage = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setSelectedFile(null);
    setPreview(null);
  };

  const userId = localStorage.getItem("userId");

  const handleSubmit = async (e) => {
    if (e) e.preventDefault();
    setError("");

    // Validations
    if (!formData.name.trim()) {
      setError("Please enter the medicine name.");
      return;
    }

    if (!formData.category_id) {
      setError("Please select a category from the dropdown.");
      return;
    }

    const cleanPrice = String(formData.price).replace(/[^0-9.]/g, "");
    if (!cleanPrice || isNaN(Number(cleanPrice))) {
      setError("Please enter a valid price.");
      return;
    }

    try {
      setIsSaving(true);

      const numericPrice = Number(cleanPrice) || 0;

      // Payload matching backend drug schema
      const payload = {
        user_id: userId,
        name: formData.name.trim(),
        description: formData.description.trim(),
        price: numericPrice,
        category_id: formData.category_id,
        dosage: formData.dosage?.trim() || "",
        sideEffect: formData.sideEffect?.trim() || "",
        linkToMedWebsite: formData.linkToMedWebsite?.trim() || "",
        composition: formData.composition?.trim() || "",
        available: Boolean(formData.available),
        requiresPrescription: Boolean(formData.requiresPrescription),
      };

      console.log("Saving drug payload:", payload);

      // 1. Call addPharmacyDrugs API
      const response = await addPharmacyDrugs(payload);
      console.log("Add Pharmacy Drug response:", response);

      // Extract drug ID from possible response formats
      const drugId =
        response?.id ||
        response?._id ||
        response?.data?.id ||
        response?.data?._id ||
        response?.drug?.id ||
        response?.drug?._id ||
        response?.data?.drug?.id;

      // 2. Call drugUploadPicture if an image was selected
      if (selectedFile && drugId) {
        try {
          const imageFormData = new FormData();
          imageFormData.append("file", selectedFile);
          imageFormData.append("image", selectedFile);
          await drugUploadPicture(drugId, imageFormData);
          console.log(
            "Drug picture uploaded successfully for drug ID:",
            drugId,
          );
        } catch (imgError) {
          console.error("Error uploading drug image:", imgError);
          // Continue gracefully since the product was created
        }
      }

      // Find selected category name for display
      const selectedCat = categoryList.find(
        (c) => String(c.id || c._id) === String(formData.category_id),
      );

      const createdProductData = {
        ...(response?.data || response || payload),
        id: drugId || response?.id,
        name: payload.name,
        price: payload.price,
        category: selectedCat?.name || "General",
        dosage: payload.dosage,
        available: payload.available,
        requiresPrescription: payload.requiresPrescription,
      };

      if (onAddProduct) {
        onAddProduct(createdProductData);
      }

      if (onDone) {
        onDone();
      }
    } catch (err) {
      console.error("Error adding product:", err);
      setError(err.message || "Failed to add product. Please try again.");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto bg-white border border-[#E8E8F0] rounded-xl p-6 sm:p-8 shadow-sm">
      <div className="flex items-center justify-between mb-2">
        <h2 className="text-2xl sm:text-3xl font-semibold text-[#150D5E]">
          Add New Product
        </h2>
        <button
          type="button"
          onClick={onDone}
          className="text-gray-400 hover:text-gray-600 p-1.5 rounded-lg hover:bg-gray-100 transition-colors"
          title="Close"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      <p className="text-[#8D8D8D] mb-6 sm:mb-8 text-sm sm:text-base">
        Kindly upload your product details below
      </p>

      {/* ERROR ALERT */}
      {error && (
        <div className="mb-6 p-4 rounded-xl bg-red-50 border border-red-200 flex items-start gap-3 text-red-700 text-sm">
          <AlertCircle className="w-5 h-5 shrink-0 mt-0.5 text-red-500" />
          <div className="flex-1">
            <span className="font-semibold">Error: </span>
            {error}
          </div>
          <button
            type="button"
            onClick={() => setError("")}
            className="text-red-400 hover:text-red-600"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* IMAGE UPLOAD */}
      <div className="mb-8">
        <label className="block mb-2 text-[#8D8D8D] font-medium text-sm">
          Product Image
        </label>
        <label className="h-[220px] border-2 border-dashed border-[#D9D9D9] hover:border-[#150D5E] rounded-xl flex flex-col items-center justify-center cursor-pointer relative overflow-hidden group bg-[#FAFAFC] transition-colors">
          {preview ? (
            <>
              <img
                src={preview}
                alt="Product Preview"
                className="w-full h-full object-contain rounded-xl p-3"
              />
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3 text-white">
                <span className="flex items-center gap-1.5 bg-white/20 backdrop-blur-sm px-3 py-1.5 rounded-lg text-sm font-medium">
                  <Pencil className="w-4 h-4" /> Change Image
                </span>
                <button
                  type="button"
                  onClick={handleRemoveImage}
                  className="bg-red-600/80 hover:bg-red-600 p-1.5 rounded-lg text-white"
                  title="Remove image"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </>
          ) : (
            <div className="flex flex-col items-center justify-center text-center p-4">
              <div className="w-12 h-12 rounded-full bg-[#EEECF9] flex items-center justify-center mb-3">
                <Upload className="w-6 h-6 text-[#150D5E]" />
              </div>
              <p className="text-gray-700 font-medium text-sm sm:text-base">
                Upload your product image
              </p>
              <span className="text-xs sm:text-sm text-gray-400 mt-1">
                PNG, JPG or WEBP (click to browse)
              </span>
            </div>
          )}

          <input
            type="file"
            hidden
            accept="image/*"
            onChange={handleImageUpload}
          />
        </label>
      </div>

      <div className="space-y-6">
        {/* ROW 1: MEDICINE NAME & CATEGORY */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {/* PRODUCT NAME */}
          <div>
            <label className="block mb-2 text-[#8D8D8D] font-medium text-sm">
              Medicine Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  name: e.target.value,
                })
              }
              className="w-full bg-[#F7F7FC] rounded-lg px-4 py-3.5 outline-none border border-transparent focus:border-[#150D5E] text-gray-800 text-sm transition-colors"
              placeholder="e.g. Paracetamol"
            />
          </div>

          {/* CATEGORY (STRICTLY A SELECT DROPDOWN) */}
          <div>
            <label className="block mb-2 text-[#8D8D8D] font-medium text-sm">
              Category <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <select
                value={formData.category_id}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    category_id: e.target.value,
                  })
                }
                className="w-full bg-[#F7F7FC] rounded-lg px-4 py-3.5 pr-10 outline-none border border-transparent focus:border-[#150D5E] text-gray-800 text-sm appearance-none cursor-pointer transition-colors"
              >
                <option value="">
                  {isLoadingCategories
                    ? "Loading categories..."
                    : "Select a category"}
                </option>
                {categoryList.map((cat) => {
                  const catId = cat.id || cat._id;
                  return (
                    <option key={catId} value={catId}>
                      {cat.name}
                    </option>
                  );
                })}
              </select>
              <div className="absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400">
                {isLoadingCategories ? (
                  <Loader2 className="w-4 h-4 animate-spin text-[#150D5E]" />
                ) : (
                  <ChevronDown className="w-4 h-4" />
                )}
              </div>
            </div>
            {categoryList.length === 0 && !isLoadingCategories && (
              <p className="text-xs text-amber-600 mt-1">
                No categories found. Please add a category first on the products
                page.
              </p>
            )}
          </div>
        </div>

        {/* ROW 2: PRICE & DOSAGE */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {/* PRICE */}
          <div>
            <label className="block mb-2 text-[#8D8D8D] font-medium text-sm">
              Price (₦) <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={formData.price}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  price: e.target.value,
                })
              }
              className="w-full bg-[#F7F7FC] rounded-lg px-4 py-3.5 outline-none border border-transparent focus:border-[#150D5E] text-gray-800 text-sm transition-colors"
              placeholder="e.g. 1500"
            />
          </div>

          {/* DOSAGE */}
          <div>
            <label className="block mb-2 text-[#8D8D8D] font-medium text-sm">
              Dosage
            </label>
            <input
              type="text"
              value={formData.dosage}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  dosage: e.target.value,
                })
              }
              className="w-full bg-[#F7F7FC] rounded-lg px-4 py-3.5 outline-none border border-transparent focus:border-[#150D5E] text-gray-800 text-sm transition-colors"
              placeholder="e.g. 500mg, 1 tablet 3x daily"
            />
          </div>
        </div>

        {/* ROW 3: DESCRIPTION */}
        <div>
          <label className="block mb-2 text-[#8D8D8D] font-medium text-sm">
            Description
          </label>
          <textarea
            rows={4}
            value={formData.description}
            onChange={(e) =>
              setFormData({
                ...formData,
                description: e.target.value,
              })
            }
            className="w-full bg-[#F7F7FC] rounded-lg px-4 py-3 outline-none resize-none border border-transparent focus:border-[#150D5E] text-gray-800 text-sm transition-colors"
            placeholder="Enter product description, uses, and benefits..."
          />
        </div>

        {/* ROW 4: SIDE EFFECTS */}
        <div>
          <label className="block mb-2 text-[#8D8D8D] font-medium text-sm">
            Side Effects
          </label>
          <textarea
            rows={3}
            value={formData.sideEffect}
            onChange={(e) =>
              setFormData({
                ...formData,
                sideEffect: e.target.value,
              })
            }
            className="w-full bg-[#F7F7FC] rounded-lg px-4 py-3 outline-none resize-none border border-transparent focus:border-[#150D5E] text-gray-800 text-sm transition-colors"
            placeholder="e.g. May cause drowsiness, mild nausea, dizziness..."
          />
        </div>

        {/* ROW 5: COMPOSITION */}
        <div>
          <label className="block mb-2 text-[#8D8D8D] font-medium text-sm">
            Composition / Active Ingredients
          </label>
          <textarea
            rows={3}
            value={formData.composition}
            onChange={(e) =>
              setFormData({
                ...formData,
                composition: e.target.value,
              })
            }
            className="w-full bg-[#F7F7FC] rounded-lg px-4 py-3 outline-none resize-none border border-transparent focus:border-[#150D5E] text-gray-800 text-sm transition-colors"
            placeholder="e.g. Each tablet contains 500mg Paracetamol BP..."
          />
        </div>

        {/* ROW 6: LINK TO MED WEBSITE */}
        <div>
          <label className="block mb-2 text-[#8D8D8D] font-medium text-sm">
            Link to Medicine Website (Optional)
          </label>
          <input
            type="url"
            value={formData.linkToMedWebsite}
            onChange={(e) =>
              setFormData({
                ...formData,
                linkToMedWebsite: e.target.value,
              })
            }
            className="w-full bg-[#F7F7FC] rounded-lg px-4 py-3.5 outline-none border border-transparent focus:border-[#150D5E] text-gray-800 text-sm transition-colors"
            placeholder="https://example.com/medicine-information"
          />
        </div>

        {/* ROW 7: TOGGLES / CHECKBOXES */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-4 bg-[#F8F9FC] rounded-xl border border-[#EEF0F6]">
          <label className="flex items-center gap-3 cursor-pointer">
            <input
              type="checkbox"
              checked={formData.available}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  available: e.target.checked,
                })
              }
              className="w-4 h-4 accent-[#150D5E] rounded cursor-pointer"
            />
            <div>
              <span className="text-sm font-medium text-gray-800 block">
                Available in Stock
              </span>
              <span className="text-xs text-gray-500">
                Mark whether this product is ready for ordering
              </span>
            </div>
          </label>

          <label className="flex items-center gap-3 cursor-pointer">
            <input
              type="checkbox"
              checked={formData.requiresPrescription}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  requiresPrescription: e.target.checked,
                })
              }
              className="w-4 h-4 accent-[#150D5E] rounded cursor-pointer"
            />
            <div>
              <span className="text-sm font-medium text-gray-800 block">
                Requires Prescription
              </span>
              <span className="text-xs text-gray-500">
                Patient must provide doctor prescription
              </span>
            </div>
          </label>
        </div>

        {/* ACTION BUTTONS */}
        <div className="flex items-center justify-end gap-4 pt-6 border-t border-[#EEF0F6]">
          <button
            type="button"
            onClick={onDone}
            disabled={isSaving}
            className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Cancel
          </button>

          <button
            type="button"
            onClick={handleSubmit}
            disabled={isSaving}
            className="px-6 py-3 bg-[#150D5E] text-white rounded-lg hover:bg-[#22157d] disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2 min-w-[160px] font-medium shadow-sm transition-all"
          >
            {isSaving ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                <span>Saving Product...</span>
              </>
            ) : (
              <span>Save Product</span>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
