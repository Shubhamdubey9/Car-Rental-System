import axios from "axios";

// Determine base URL
const baseURL =
  import.meta.env.MODE === "development"
    ? "/api" // Use Vite proxy for local dev
    : import.meta.env.VITE_API_URL; // Use Render URL in production

const api = axios.create({
  baseURL, // baseURL + "/api" is already handled by proxy
  withCredentials: true,
  headers: {
    "Cache-Control": "no-cache",
    Pragma: "no-cache",
    Expires: "0",
  },
});

console.log("Base URL:", baseURL);

export default api;
