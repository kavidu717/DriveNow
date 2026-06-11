import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { HiTruck, HiCurrencyDollar, HiDocumentText, HiArrowLeft, HiCloudUpload } from "react-icons/hi";
import API from "../api/axios";
import toast from "react-hot-toast";

export default function EditVehicle() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [type, setType] = useState("");
  const [brand, setBrand] = useState("");
  const [model, setModel] = useState("");
  const [description, setDescription] = useState("");
  const [pricePerKm, setPricePerKm] = useState("");
  const [image, setImage] = useState(null);
  const [currentImage, setCurrentImage] = useState("");

  const getVehicle = async () => {
    try {
      const { data } = await API.get(`/vehicles/${id}`);

      const vehicle = data.data;

      setName(vehicle.name);
      setType(vehicle.type);
      setBrand(vehicle.brand);
      setModel(vehicle.model);
      setDescription(vehicle.description);
      setPricePerKm(vehicle.pricePerKm);
      setCurrentImage(vehicle.image);
    } catch (error) {
      console.log(error);
      toast.error("Failed to load vehicle");
    }
  };

  useEffect(() => {
    getVehicle();
  }, []);

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

      await API.put(`/vehicles/${id}`, formData);

      toast.success("Vehicle updated successfully");

      navigate("/admin/vehicles");
    } catch (error) {
      console.log(error);
      toast.error("Failed to update vehicle");
    }
  };

  return (
    <div className="max-w-2xl mx-auto bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
      
      {/* Header */}
      <div className="p-6 border-b border-slate-100 bg-gradient-to-r from-slate-50 to-white">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 bg-orange-50 rounded-xl flex items-center justify-center border border-orange-100 text-orange-600">
            <HiTruck size={22} />
          </div>
          <div>
            <h1 className="text-xl font-bold text-slate-900">Edit Vehicle</h1>
            <p className="text-sm text-slate-500 mt-0.5">Modify specifications or update image records.</p>
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
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Vehicle Name"
              className="w-full px-4 py-2.5 bg-slate-50/50 border border-slate-200 rounded-xl focus:outline-none focus:border-orange-500 focus:bg-white transition-all text-sm text-slate-800"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-600 uppercase tracking-wider">Vehicle Type</label>
            <input
              type="text"
              value={type}
              onChange={(e) => setType(e.target.value)}
              placeholder="Type"
              className="w-full px-4 py-2.5 bg-slate-50/50 border border-slate-200 rounded-xl focus:outline-none focus:border-orange-500 focus:bg-white transition-all text-sm text-slate-800"
            />
          </div>
        </div>

        {/* Row 2: Brand & Model */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-600 uppercase tracking-wider">Brand / Make</label>
            <input
              type="text"
              value={brand}
              onChange={(e) => setBrand(e.target.value)}
              placeholder="Brand"
              className="w-full px-4 py-2.5 bg-slate-50/50 border border-slate-200 rounded-xl focus:outline-none focus:border-orange-500 focus:bg-white transition-all text-sm text-slate-800"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-600 uppercase tracking-wider">Model Year / Version</label>
            <input
              type="text"
              value={model}
              onChange={(e) => setModel(e.target.value)}
              placeholder="Model"
              className="w-full px-4 py-2.5 bg-slate-50/50 border border-slate-200 rounded-xl focus:outline-none focus:border-orange-500 focus:bg-white transition-all text-sm text-slate-800"
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
              value={pricePerKm}
              onChange={(e) => setPricePerKm(e.target.value)}
              placeholder="Price Per KM"
              className="w-full pl-10 pr-4 py-2.5 bg-slate-50/50 border border-slate-200 rounded-xl focus:outline-none focus:border-orange-500 focus:bg-white transition-all text-sm text-slate-800"
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
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Description"
              rows="3"
              className="w-full pl-10 pr-4 py-2.5 bg-slate-50/50 border border-slate-200 rounded-xl focus:outline-none focus:border-orange-500 focus:bg-white transition-all text-sm text-slate-800 resize-none"
            />
          </div>
        </div>

        {/* Row 5: Media Showcase & File Upload */}
        <div className="space-y-3">
          <label className="text-xs font-semibold text-slate-600 uppercase tracking-wider block">Vehicle Showcase Photo</label>
          
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 p-4 border border-slate-200 rounded-2xl bg-slate-50/30">
            {currentImage && (
              <div className="shrink-0 border border-slate-200 rounded-xl overflow-hidden shadow-sm bg-white">
                <img
                  src={currentImage}
                  alt="Vehicle"
                  className="w-24 h-24 object-cover"
                />
              </div>
            )}
            
            <div className="w-full relative flex flex-col justify-center border-2 border-dashed border-slate-200 hover:border-orange-400 rounded-xl p-4 bg-white transition-colors cursor-pointer group">
              <input
                type="file"
                accept="image/*"
                onChange={(e) => {
                  setImage(e.target.files[0]);
                  if (e.target.files[0]) {
                    setCurrentImage(URL.createObjectURL(e.target.files[0]));
                  }
                }}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
              />
              <div className="text-center flex flex-col items-center justify-center">
                <HiCloudUpload size={22} className="text-slate-400 group-hover:text-orange-500 transition-colors mb-1" />
                <p className="text-sm font-semibold text-slate-700">Choose a new file</p>
                <p className="text-xs text-slate-400 mt-0.5">Click to replace existing picture</p>
              </div>
            </div>
          </div>
        </div>

        {/* Submit Actions Layer */}
        <div className="flex flex-col sm:flex-row items-center gap-3 pt-2">
          <button
            type="submit"
            className="w-full sm:flex-1 bg-gradient-to-r from-orange-500 to-amber-500 text-white font-semibold py-3 px-4 rounded-xl shadow-md shadow-orange-500/10 hover:shadow-lg hover:shadow-orange-500/20 active:scale-[0.99] transition-all text-sm order-1 sm:order-2"
          >
            Update Vehicle
          </button>

          <button
            type="button"
            onClick={() => navigate("/admin/vehicles")}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-medium py-3 px-5 rounded-xl transition-all text-sm order-2 sm:order-1 active:scale-[0.99]"
          >
            <HiArrowLeft size={16} />
            <span>Cancel</span>
          </button>
        </div>

      </form>
    </div>
  );
}