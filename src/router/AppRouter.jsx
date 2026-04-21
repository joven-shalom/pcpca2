import { BrowserRouter, Navigate, NavLink, Route, Routes } from "react-router-dom";
import Orders from "../pages/Orders";
import FilterOrders from "../pages/FilterOrders";
import Stats from "../pages/Stats";
import OrderDetails from "../pages/OrderDetails";

const AppRouter = () => {
  return (
    <BrowserRouter>
      <nav>
        <NavLink to="/orders">Orders</NavLink>
        <NavLink to="/filter">Filter</NavLink>
        <NavLink to="/stats">Stats</NavLink>
      </nav>

      <Routes>
        <Route path="/" element={<Navigate to="/orders" replace />} />
        <Route path="/orders" element={<Orders />} />
        <Route path="/orders/:id" element={<OrderDetails />} />
        <Route path="/filter" element={<FilterOrders />} />
        <Route path="/stats" element={<Stats />} />
        <Route path="*" element={<Navigate to="/orders" replace />} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRouter;
