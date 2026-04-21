import { Link, useParams } from "react-router-dom";
import { ORDER_STATUS } from "../services/api";
import { useAppContext } from "../context/useAppContext";

const OrderDetails = () => {
  const { id } = useParams();
  const { dispatch, validOrders } = useAppContext();
  const order = validOrders.find((item) => item.orderid === id);

  if (!order) {
    return (
      <main className="page">
        <section className="empty-state">
          <h1>Order not found</h1>
          <p className="muted">This order is missing or did not pass validation.</p>
          <Link className="button" to="/orders">
            Back to orders
          </Link>
        </section>
      </main>
    );
  }

  return (
    <main className="page">
      <Link className="back-link" to="/orders">
        Back to orders
      </Link>

      <section className="details-panel">
        <div>
          <p className="eyebrow">{order.orderid}</p>
          <h1>{order.restaurant}</h1>
          <p className="muted">Customer {order.customerid}</p>
        </div>

        <label>
          Status
          <select
            value={order.status}
            onChange={(e) =>
              dispatch({
                type: "UPDATE_ORDER_STATUS",
                payload: { orderid: order.orderid, status: e.target.value },
              })
            }
          >
            {ORDER_STATUS.map((status) => (
              <option key={status}>{status}</option>
            ))}
          </select>
        </label>
      </section>

      <section className="details-grid">
        <article>
          <span>Total amount</span>
          <strong>Rs. {order.totalAmount}</strong>
        </article>
        <article>
          <span>Delivery time</span>
          <strong>{order.deliveryTime} min</strong>
        </article>
        <article>
          <span>Rating</span>
          <strong>{Number(order.rating).toFixed(1)}</strong>
        </article>
      </section>

      <section className="items-panel">
        <h2>Items</h2>
        {order.items.map((item) => (
          <p key={item.name}>
            {item.name} x{item.quantity}
          </p>
        ))}
      </section>
    </main>
  );
};

export default OrderDetails;
