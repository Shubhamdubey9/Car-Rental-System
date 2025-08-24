import api from "../../Api/Axios";
import React, { useState } from "react";
import { toast } from "sonner";

const AddCar = () => {
  const [image, setImage] = useState(null);
  const [form, setForm] = useState({
    brand: "",
    model: "",
    year: "",
    pricePerDay: "", 
    category: "",
    transmission: "",
    fuel_Type: "", 
    seating_Capacity: "", 
    location: "",
    description: "",
  });

  const handleChange = (e) => {
    if (e.target.name === "image") {
      setImage(e.target.files[0]);
    } else {
      setForm({ ...form, [e.target.name]: e.target.value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("image", image);
      formData.append("carData", JSON.stringify(form));

      const response = await api.post("/owner/add-car", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        withCredentials: true,
      });

      if (response.data.success) {
        toast.success(response.data.message);
        setForm({
          brand: "",
          model: "",
          year: "",
          pricePerDay: "", // ✅ reset correctly
          category: "",
          transmission: "",
          fuel_Type: "",
          seating_Capacity: "",
          location: "",
          description: "",
        });
        setImage(null);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(
        error?.response?.data?.message ||
          "An error occurred while adding the car."
      );
    }
  };

  return (
    <div className="w-full h-screen">
      <form
        onSubmit={handleSubmit}
        className="max-w-7xl w-full mx-auto p-4 sm:p-8 bg-white rounded-2xl shadow-xl border border-gray-100  mb-8"
      >
        <h2 className="text-2xl sm:text-3xl font-bold mb-6 text-blue-700 text-center">
          List Your Car
        </h2>

        {/* Image Upload */}
        <div className="flex flex-col items-center gap-2 mb-8">
          <label
            htmlFor="image"
            className="w-28 h-28 flex items-center justify-center bg-gray-100 rounded-full border-2 border-dashed border-blue-300 cursor-pointer hover:bg-blue-50 transition"
          >
            {image ? (
              <img
                src={URL.createObjectURL(image)}
                alt="preview"
                className="w-full h-full object-cover rounded-full"
              />
            ) : (
              <span className="text-blue-400 text-sm">Upload Image</span>
            )}
          </label>
          <input
            type="file"
            id="image"
            name="image"
            accept="image/*"
            onChange={handleChange}
            className="hidden"
          />
          <span className="text-xs text-gray-400">
            Click to upload car image
          </span>
        </div>

        {/* Input Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
          <input
            type="text"
            name="brand"
            placeholder="Brand (e.g. BMW)"
            value={form.brand}
            onChange={handleChange}
            className="input bg-gray-50 border border-gray-200 focus:border-blue-400 focus:ring-2 focus:ring-blue-100 rounded-lg px-4 py-2"
          />
          <input
            type="text"
            name="model"
            placeholder="Model (e.g. X5)"
            value={form.model}
            onChange={handleChange}
            className="input bg-gray-50 border border-gray-200 focus:border-blue-400 focus:ring-2 focus:ring-blue-100 rounded-lg px-4 py-2"
          />
          <input
            type="number"
            name="year"
            placeholder="Year"
            value={form.year}
            onChange={handleChange}
            className="input bg-gray-50 border border-gray-200 focus:border-blue-400 focus:ring-2 focus:ring-blue-100 rounded-lg px-4 py-2"
          />
          <input
            type="number"
            name="pricePerDay"
            placeholder="Daily Price ($)"
            value={form.pricePerDay} // ✅ fixed here
            onChange={handleChange}
            className="input bg-gray-50 border border-gray-200 focus:border-blue-400 focus:ring-2 focus:ring-blue-100 rounded-lg px-4 py-2"
          />
          <select
            name="category"
            value={form.category}
            onChange={handleChange}
            className="input bg-gray-50 border border-gray-200 focus:border-blue-400 focus:ring-2 focus:ring-blue-100 rounded-lg px-4 py-2"
          >
            <option value="">Select a category</option>
            <option>Luxury</option>
            <option>Economy</option>
            <option>SUV</option>
            <option>Convertible</option>
          </select>
          <select
            name="transmission"
            value={form.transmission}
            onChange={handleChange}
            className="input bg-gray-50 border border-gray-200 focus:border-blue-400 focus:ring-2 focus:ring-blue-100 rounded-lg px-4 py-2"
          >
            <option value="">Select a transmission</option>
            <option>Automatic</option>
            <option>Manual</option>
          </select>
          <select
            name="fuel_Type"
            value={form.fuel_Type}
            onChange={handleChange}
            className="input bg-gray-50 border border-gray-200 focus:border-blue-400 focus:ring-2 focus:ring-blue-100 rounded-lg px-4 py-2"
          >
            <option value="">Select a fuel type</option>
            <option>Petrol</option>
            <option>Diesel</option>
            <option>Electric</option>
            <option>Hybrid</option>
          </select>
          <input
            type="number"
            name="seating_Capacity"
            placeholder="Seating Capacity"
            value={form.seating_Capacity}
            onChange={handleChange}
            className="input bg-gray-50 border border-gray-200 focus:border-blue-400 focus:ring-2 focus:ring-blue-100 rounded-lg px-4 py-2"
          />
          <select
            name="location"
            value={form.location}
            onChange={handleChange}
            className="input bg-gray-50 border border-gray-200 focus:border-blue-400 focus:ring-2 focus:ring-blue-100 rounded-lg px-4 py-2 sm:col-span-2"
          >
            <option value="">Select a location</option>
            <option>Los Angeles</option>
            <option>New York</option>
            <option>San Francisco</option>
            <option>Miami</option>
          </select>
        </div>

        {/* Description */}
        <textarea
          name="description"
          value={form.description}
          onChange={handleChange}
          placeholder="e.g. A luxurious SUV with a spacious interior and a powerful engine."
          rows={4}
          className="input w-full bg-gray-50 border border-gray-200 focus:border-blue-400 focus:ring-2 focus:ring-blue-100 rounded-lg px-4 py-2 mb-6"
        ></textarea>

        {/* Submit */}
        <button
          type="submit"
          className="w-full bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition font-semibold text-lg shadow"
        >
          ✓ List Your Car
        </button>
      </form>
    </div>
  );
};

export default AddCar;
