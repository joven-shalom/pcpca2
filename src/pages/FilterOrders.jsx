import { useAppContext } from "../context/useAppContext";
import { ORDER_STATUS } from "../services/api";
import OrderCard from "../components/OrderCard";

const FilterOrders = () => {
  const { state, dispatch, validOrders } = useAppContext();

  const restaurants = [...new Set(validOrders.map((order) => order.restaurant))];
  const filteredOrders = validOrders.filter((order) => {
    const statusMatches = state.filter.status === "All" || order.status === state.filter.status;
    const restaurantMatches =
      !state.filter.restaurant || order.restaurant === state.filter.restaurant;
    const ratingMatches = order.rating >= Number(state.filter.minRating);

    return statusMatches && restaurantMatches && ratingMatches;
  });

  return (
    <main className="page">
      <section className="page-heading">
        <p className="eyebrow">Filter orders</p>
        <h1>Find Orders</h1>
        <p className="muted">{filteredOrders.length} orders match the current filters.</p>
      </section>

      <section className="filter-panel">
        <label>
          Status
          <select
            value={state.filter.status}
            onChange={(e) => dispatch({ type: "SET_FILTER", payload: { status: e.target.value } })}
          >
            <option>All</option>
            {ORDER_STATUS.map((status) => (
              <option key={status}>{status}</option>
            ))}
          </select>
        </label>

        <label>
          Restaurant
          <select
            value={state.filter.restaurant}
            onChange={(e) =>
              dispatch({ type: "SET_FILTER", payload: { restaurant: e.target.value } })
            }
          >
            <option value="">All restaurants</option>
            {restaurants.map((restaurant) => (
              <option key={restaurant}>{restaurant}</option>
            ))}
          </select>
        </label>

        <label>
          Minimum rating
          <input
            max="5"
            min="0"
            step="0.5"
            type="number"
            value={state.filter.minRating}
            onChange={(e) =>
              dispatch({ type: "SET_FILTER", payload: { minRating: e.target.value } })
            }
          />
        </label>

        <button type="button" onClick={() => dispatch({ type: "RESET_FILTER" })}>
          Reset filters
        </button>
      </section>

      <section className="orders-grid">
        {filteredOrders.map((order) => (
          <OrderCard key={order.orderid} order={order} />
        ))}
      </section>
    </main>
  );
};

export default FilterOrders;
