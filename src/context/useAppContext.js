import { useContext } from "react";
import { AppContext } from "./AppContextObject";

export const useAppContext = () => useContext(AppContext);
