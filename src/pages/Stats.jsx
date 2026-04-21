import { useAppContext } from "../context/useAppContext";

const Stats = () => {
  const { validOrders } = useAppContext();

  const totalOrders = validOrders.length;
  const revenue = validOrders.reduce((sum, order) => sum + order.totalAmount, 0);
  const averageRating = totalOrders
    ? validOrders.reduce((sum, order) => sum + Number(order.rating), 0) / totalOrders
    : 0;
  const averageDelivery = totalOrders
    ? validOrders.reduce((sum, order) => sum + order.deliveryTime, 0) / totalOrders
    : 0;

  const byStatus = validOrders.reduce((acc, order) => {
    acc[order.status] = (acc[order.status] || 0) + 1;
    return acc;
  }, {});

  const topRestaurants = [...validOrders]
    .sort((a, b) => b.totalAmount - a.totalAmount)
    .slice(0, 3);

  return (
    <main className="page">
      <section className="page-heading">
        <p className="eyebrow">Analytics dashboard</p>
        <h1>Orders Stats</h1>
      </section>

      <section className="stats-grid">
        <article>
          <span>Total orders</span>
          <strong>{totalOrders}</strong>
        </article>
        <article>
          <span>Total revenue</span>
          <strong>Rs. {revenue}</strong>
        </article>
        <article>
          <span>Average rating</span>
          <strong>{averageRating.toFixed(1)}</strong>
        </article>
        <article>
          <span>Average delivery</span>
          <strong>{averageDelivery.toFixed(0)} min</strong>
        </article>
      </section>

      <section className="dashboard-columns">
        <div>
          <h2>Orders by status</h2>
          {Object.entries(byStatus).map(([status, count]) => (
            <div className="metric-row" key={status}>
              <span>{status}</span>
              <strong>{count}</strong>
            </div>
          ))}
        </div>

        <div>
          <h2>Highest value orders</h2>
          {topRestaurants.map((order) => (
            <div className="metric-row" key={order.orderid}>
              <span>{order.restaurant}</span>
              <strong>Rs. {order.totalAmount}</strong>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
};

export default Stats;
