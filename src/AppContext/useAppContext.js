import Appcontext from "./Appcontext"; // ✅ default import

import { useContext } from "react";

const useAppContext = () => useContext(Appcontext);

export { useAppContext };
