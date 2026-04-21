import { useEffect, useMemo, useReducer } from "react";
import { AppReducer, initialState } from "../reducer/AppReducer";
import { getOrders, isValidOrder } from "../services/api";
import { AppContext } from "./AppContextObject";

export const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(AppReducer, initialState);

  useEffect(() => {
    const fetchOrders = async () => {
      dispatch({ type: "SET_LOADING", payload: true });

      try {
        const orders = await getOrders();
        dispatch({ type: "SET_ORDERS", payload: orders });
      } catch (err) {
        console.error("Error fetching orders:", err.message);
        dispatch({
          type: "SET_ERROR",
          payload: "Unable to fetch orders from the exam server.",
        });
      }
    };

    fetchOrders();
  }, []);

  const validOrders = useMemo(
    () => state.orders.filter((order) => isValidOrder(order)),
    [state.orders]
  );

  return (
    <AppContext.Provider value={{ state, dispatch, validOrders }}>
      {children}
    </AppContext.Provider>
  );
};
