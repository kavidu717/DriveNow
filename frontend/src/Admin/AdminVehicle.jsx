import { useState, useRef } from "react";
import { HiCloudUpload, HiTruck, HiCurrencyDollar, HiDocumentText, HiArrowLeft } from "react-icons/hi";
import API from "../api/axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export default function CreateVehicle() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [type, setType] = useState("");
  const [brand, setBrand] = useState("");
  const [model, setModel] = useState("");
  const [description, setDescription] = useState("");
  const [pricePerKm, setPricePerKm] = useState("");
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState("");

  const fileInputRef = useRef(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("type", type);
      formData.append("brand", brand);
      formData.append("model", model);
      formData.append("description", description);
      formData.append("pricePerKm", pricePerKm);

      if (image) {
        formData.append("image", image);
      }

      const { data } = await API.post("/vehicles", formData);

      toast.success("Vehicle created successfully");

      // Reset form states
      setName("");
      setType("");
      setBrand("");
      setModel("");
      setDescription("");
      setPricePerKm("");
      setImage(null);
      setImagePreview("");
      if (fileInputRef.current) fileInputRef.current.value = "";

      console.log(data);
    } catch (error) {
      console.log(error);
      toast.error("Failed to create vehicle");
    }
  };

  return (
    <div className="max-w-2xl mx-auto bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
       
      {/* Header */}
      <div className="p-6 border-b border-slate-100 bg-gradient-to-r from-slate-50 to-white flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 bg-orange-50 rounded-xl flex items-center justify-center border border-orange-100 text-orange-600">
            <HiTruck size={22} />
          </div>
          <div>
            <h1 className="text-xl font-bold text-slate-900">Add New Vehicle</h1>
            <p className="text-sm text-slate-500 mt-0.5">Register a new asset to the fleet inventory.</p>
          </div>
        </div>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="p-6 space-y-5">
        
        {/* Row 1: Name & Type */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-600 uppercase tracking-wider">Vehicle Title / Name</label>
            <input
              type="text"
              placeholder="e.g., Tesla Model X Premium"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-2.5 bg-slate-50/50 border border-slate-200 rounded-xl focus:outline-none focus:border-orange-500 focus:bg-white transition-all text-sm text-slate-800"
              required
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-600 uppercase tracking-wider">Vehicle Type</label>
            <input
              type="text"
              placeholder="e.g., Sedan, SUV, EV"
              value={type}
              onChange={(e) => setType(e.target.value)}
              className="w-full px-4 py-2.5 bg-slate-50/50 border border-slate-200 rounded-xl focus:outline-none focus:border-orange-500 focus:bg-white transition-all text-sm text-slate-800"
              required
            />
          </div>
        </div>

        {/* Row 2: Brand & Model */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-600 uppercase tracking-wider">Brand / Make</label>
            <input
              type="text"
              placeholder="e.g., Tesla"
              value={brand}
              onChange={(e) => setBrand(e.target.value)}
              className="w-full px-4 py-2.5 bg-slate-50/50 border border-slate-200 rounded-xl focus:outline-none focus:border-orange-500 focus:bg-white transition-all text-sm text-slate-800"
              required
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-600 uppercase tracking-wider">Model Year / Version</label>
            <input
              type="text"
              placeholder="e.g., 2024 Plaid"
              value={model}
              onChange={(e) => setModel(e.target.value)}
              className="w-full px-4 py-2.5 bg-slate-50/50 border border-slate-200 rounded-xl focus:outline-none focus:border-orange-500 focus:bg-white transition-all text-sm text-slate-800"
              required
            />
          </div>
        </div>

        {/* Row 3: Price Per KM */}
        <div className="space-y-1.5">
          <label className="text-xs font-semibold text-slate-600 uppercase tracking-wider">Rate (Price per KM)</label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
              <HiCurrencyDollar size={18} />
            </div>
            <input
              type="number"
              placeholder="0.00"
              value={pricePerKm}
              onChange={(e) => setPricePerKm(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-slate-50/50 border border-slate-200 rounded-xl focus:outline-none focus:border-orange-500 focus:bg-white transition-all text-sm text-slate-800"
              required
            />
          </div>
        </div>

        {/* Row 4: Description */}
        <div className="space-y-1.5">
          <label className="text-xs font-semibold text-slate-600 uppercase tracking-wider">Description</label>
          <div className="relative">
            <div className="absolute top-3 left-3.5 pointer-events-none text-slate-400">
              <HiDocumentText size={18} />
            </div>
            <textarea
              placeholder="Provide a detailed breakdown of vehicle features, condition, specifications..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows="3"
              className="w-full pl-10 pr-4 py-2.5 bg-slate-50/50 border border-slate-200 rounded-xl focus:outline-none focus:border-orange-500 focus:bg-white transition-all text-sm text-slate-800 resize-none"
              required
            />
          </div>
        </div>

        {/* Row 5: Dynamic Media Uploader Dragbox */}
        <div className="space-y-1.5">
          <label className="text-xs font-semibold text-slate-600 uppercase tracking-wider">Vehicle Showcase Photo</label>
          
          <div 
            onClick={() => fileInputRef.current?.click()}
            className="group cursor-pointer border-2 border-dashed border-slate-200 hover:border-orange-400 rounded-2xl p-5 bg-slate-50/50 hover:bg-orange-50/10 transition-all text-center flex flex-col items-center justify-center min-h-[140px]"
          >
            <input
              type="file"
              ref={fileInputRef}
              accept="image/*"
              onChange={handleImageChange}
              className="hidden"
            />

            {imagePreview ? (
              <div className="relative w-full max-h-48 overflow-hidden rounded-xl border border-slate-200">
                <img 
                  src={imagePreview} 
                  alt="Preview" 
                  className="w-full h-full object-cover max-h-48"
                />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center text-white text-xs font-medium transition-opacity">
                  Click to replace photo
                </div>
              </div>
            ) : (
              <>
                <div className="p-3 bg-white rounded-xl shadow-sm text-slate-400 group-hover:text-orange-500 group-hover:scale-105 transition-all mb-2 border border-slate-100">
                  <HiCloudUpload size={24} />
                </div>
                <p className="text-sm font-semibold text-slate-700">Upload vehicle display image</p>
                <p className="text-xs text-slate-400 mt-1">Supports PNG, JPG, or WEBP formats</p>
              </>
            )}
          </div>
        </div>

        {/* Action Buttons Container */}
        <div className="flex flex-col sm:flex-row items-center gap-3 pt-2">
          <button
            type="submit"
            className="w-full sm:flex-1 bg-gradient-to-r from-orange-500 to-amber-500 text-white font-semibold py-3 px-4 rounded-xl shadow-md shadow-orange-500/10 hover:shadow-lg hover:shadow-orange-500/20 active:scale-[0.99] transition-all text-sm order-1 sm:order-2"
          >
            Create Vehicle Fleet Listing
          </button>

          <button
            type="button"
            onClick={() => navigate("/admin/vehicles/all")}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-medium py-3 px-5 rounded-xl transition-all text-sm order-2 sm:order-1 active:scale-[0.99]"
          >
            <HiArrowLeft size={16} />
            <span>Back to Fleet List</span>
          </button>
        </div>
      </form>
    </div>
  );
}