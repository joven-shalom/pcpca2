import { useAppContext } from "../context/useAppContext";
import OrderCard from "../components/OrderCard";
import AddOrder from "../components/AddOrder";

const Orders = () => {
  const { state, validOrders } = useAppContext();

  return (
    <main className="page">
      <section className="page-heading">
        <p className="eyebrow">Food delivery orders</p>
        <h1>Live Orders</h1>
        <p className="muted">
          Showing {validOrders.length} valid orders from {state.orders.length} total records.
        </p>
      </section>

      {state.loading && <p className="notice">Fetching orders from the exam server...</p>}
      {state.error && <p className="notice notice-error">{state.error}</p>}

      <AddOrder />

      <section className="orders-grid">
        {validOrders.map((order) => (
          <OrderCard key={order.orderid} order={order} />
        ))}
      </section>
    </main>
  );
};

export default Orders;
