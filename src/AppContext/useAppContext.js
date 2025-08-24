import AppContext from "./AppContext"; // ✅ default import

import { useContext } from "react";

const useAppContext = () => useContext(AppContext);

export { useAppContext };
