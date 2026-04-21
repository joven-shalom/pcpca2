import { Link } from "react-router-dom";
import { ORDER_STATUS } from "../services/api";
import { useAppContext } from "../context/useAppContext";

const OrderCard = ({ order }) => {
  const { dispatch } = useAppContext();
  const currentStatusIndex = ORDER_STATUS.indexOf(order.status);
  const nextStatus = ORDER_STATUS[currentStatusIndex + 1];
  const itemText = order.items.map((item) => `${item.name} x${item.quantity}`).join(", ");

  return (
    <article className="order-card">
      <div className="order-card__header">
        <div>
          <p className="eyebrow">{order.orderid}</p>
          <h3>{order.restaurant}</h3>
        </div>
        <span className={`status status-${order.status.toLowerCase().replaceAll(" ", "-")}`}>
          {order.status}
        </span>
      </div>

      <p className="muted">Customer: {order.customerid}</p>
      <p>{itemText}</p>

      <div className="order-card__meta">
        <strong>Rs. {order.totalAmount}</strong>
        <span>{order.deliveryTime} min</span>
        <span>{Number(order.rating).toFixed(1)} rating</span>
      </div>

      <div className="order-card__actions">
        <Link className="button button-light" to={`/orders/${order.orderid}`}>
          View details
        </Link>
        <button
          type="button"
          disabled={!nextStatus}
          onClick={() =>
            dispatch({
              type: "UPDATE_ORDER_STATUS",
              payload: { orderid: order.orderid, status: nextStatus },
            })
          }
        >
          {nextStatus ? `Move to ${nextStatus}` : "Completed"}
        </button>
      </div>
    </article>
  );
};

export default OrderCard;
