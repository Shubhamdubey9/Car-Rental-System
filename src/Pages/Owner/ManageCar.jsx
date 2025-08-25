import React, { useEffect } from "react";
import { Eye, Trash2 } from "lucide-react";
import api from "../../Api/Axios";
import { toast } from "sonner";
import { useAppContext } from "@/AppContext/useAppContext";

const ManageCar = () => {
  const { cars, setCars } = useAppContext();

  useEffect(() => {
    const fetchCars = async () => {
      try {
        const { data } = await api.get("/owner/cars");
        if (data.success) setCars(data.cars);
      } catch (error) {
        console.error(error.response?.data?.message || "Error fetching cars");
      }
    };
    fetchCars();
  }, []);

  //  Delete a car
  const handleDelete = async (carId) => {
    if (!window.confirm("Are you sure you want to delete this car?")) return;
    try {
      const { data } = await api.post("/owner/delete-car", { carId });
      if (data.success) {
        toast.success(data.message);
        setCars(cars.filter((car) => car._id !== carId));
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error?.response?.data?.message || "Failed to delete car");
    }
  };

  // Toggle availability
  const handleToggleAvailability = async (carId, currentStatus) => {
    try {
      const { data } = await api.post("/owner/toggle-car", { carId });
      if (data.success) {
        toast.success(
          `Car marked as ${currentStatus ? "Not Available" : "Available"}`
        );
        setCars(
          cars.map((car) =>
            car._id === carId ? { ...car, isAvailable: !currentStatus } : car
          )
        );
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(
        error?.response?.data?.message || "Failed to update availability"
      );
    }
  };

  return (
    <div className="w-full mx-auto p-3 sm:p-6 md:p-8 bg-white rounded-xl sm:rounded-2xl shadow-lg sm:shadow-xl border border-gray-100 mb-6 sm:mb-8">
      <div className="mb-6">
        <h1 className="text-xl sm:text-2xl md:text-3xl font-semibold mb-2">
          Manage Cars
        </h1>
        <p className="text-sm sm:text-base text-gray-500">
          View all listed cars, update details, or remove them from the platform
        </p>
      </div>

      {/* Desktop Table */}
      <div className="hidden sm:block bg-white shadow-sm rounded-lg sm:rounded-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full text-xs sm:text-sm text-left">
            <thead className="bg-gray-50 text-gray-600 uppercase text-xs">
              <tr>
                <th className="px-3 sm:px-4 md:px-6 py-3 sm:py-4 font-medium">
                  Car
                </th>
                <th className="px-3 sm:px-4 md:px-6 py-3 sm:py-4 font-medium hidden sm:table-cell">
                  Category
                </th>
                <th className="px-3 sm:px-4 md:px-6 py-3 sm:py-4 font-medium">
                  Price
                </th>
                <th className="px-3 sm:px-4 md:px-6 py-3 sm:py-4 font-medium">
                  Status
                </th>
                <th className="px-3 sm:px-4 md:px-6 py-3 sm:py-4 font-medium">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {cars.length > 0 ? (
                cars.map((car) => (
                  <tr
                    key={car._id}
                    className="border-t border-gray-100 hover:bg-gray-50 transition-colors"
                  >
                    <td className="px-3 sm:px-4 md:px-6 py-3 sm:py-4">
                      <div className="flex items-center gap-2 sm:gap-4">
                        <img
                          src={car.image}
                          alt={car.brand + " " + car.model}
                          className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg object-cover"
                        />
                        <div className="min-w-0 flex-1">
                          <div className="font-medium text-sm sm:text-base truncate">
                            {car.brand} {car.model}
                          </div>
                          <div className="text-gray-500 text-xs sm:text-sm">
                            {car.seating_Capacity} seats • {car.transmission}
                          </div>
                          <div className="text-gray-500 text-xs sm:hidden">
                            {car.category} • {car.pricePerDay}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-3 sm:px-4 md:px-6 py-3 sm:py-4 hidden sm:table-cell">
                      <span className="text-sm">{car.category}</span>
                    </td>
                    <td className="px-3 sm:px-4 md:px-6 py-3 sm:py-4">
                      <span className="font-medium text-sm sm:text-base">
                        ₹{car.pricePerDay}
                      </span>
                    </td>
                    <td className="px-3 sm:px-4 md:px-6 py-3 sm:py-4">
                      <span
                        className={`px-2 sm:px-3 py-1 rounded-full text-xs font-medium cursor-pointer ${
                          car.isAvailable
                            ? "bg-green-100 text-green-700"
                            : "bg-red-100 text-red-700"
                        }`}
                        onClick={() =>
                          handleToggleAvailability(car._id, car.isAvailable)
                        }
                      >
                        {car.isAvailable ? "Available" : "Not Available"}
                      </span>
                    </td>
                    <td className="px-3 sm:px-4 md:px-6 py-3 sm:py-4">
                      <div className="flex items-center gap-2 sm:gap-3">
                        <button className="p-1 sm:p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-md transition-colors">
                          <Eye size={16} className="sm:w-4 sm:h-4" />
                        </button>
                        <button
                          onClick={() => handleDelete(car._id)}
                          className="p-1 sm:p-2 text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-md transition-colors"
                        >
                          <Trash2 size={16} className="sm:w-4 sm:h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={5} className="text-center py-4 text-gray-400">
                    No cars found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Mobile  */}
      <div className="sm:hidden flex flex-col gap-4">
        {cars.length > 0 ? (
          cars.map((car) => (
            <div
              key={car._id}
              className="bg-gray-50 rounded-xl p-4 shadow-sm border border-gray-100"
            >
              <div className="flex items-center gap-3 mb-2">
                <img
                  src={car.image}
                  alt={`${car.brand} ${car.model}`}
                  className="w-14 h-14 rounded-lg object-cover"
                />
                <div>
                  <h3 className="font-medium text-base truncate">
                    {car.brand} {car.model}
                  </h3>
                  <p className="text-gray-500 text-xs">
                    {car.seating_Capacity} seats • {car.transmission}
                  </p>
                  <p className="text-gray-500 text-xs mt-1">
                    {car.category} • ₹{car.pricePerDay}
                  </p>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span
                  className={`px-3 py-1 rounded-full text-xs font-medium cursor-pointer ${
                    car.isAvailable
                      ? "bg-green-100 text-green-700"
                      : "bg-red-100 text-red-700"
                  }`}
                  onClick={() =>
                    handleToggleAvailability(car._id, car.isAvailable)
                  }
                >
                  {car.isAvailable ? "Available" : "Not Available"}
                </span>
                <div className="flex items-center gap-2">
                  <button className="p-1 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-md transition-colors">
                    <Eye size={16} />
                  </button>
                  <button
                    onClick={() => handleDelete(car._id)}
                    className="p-1 text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-md transition-colors"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-500 py-6">No cars found</p>
        )}
      </div>
    </div>
  );
};

export default ManageCar;
