export const initialState = {
  orders: [],
  loading: false,
  error: "",
  filter: {
    status: "All",
    restaurant: "",
    minRating: 0,
  },
};

export const AppReducer = (state, action) => {
  switch (action.type) {
    case "SET_LOADING":
      return { ...state, loading: action.payload };

    case "SET_ORDERS":
      return { ...state, orders: action.payload, loading: false, error: "" };

    case "SET_ERROR":
      return { ...state, loading: false, error: action.payload };

    case "ADD_ORDER":
      return { ...state, orders: [action.payload, ...state.orders] };

    case "UPDATE_ORDER_STATUS":
      return {
        ...state,
        orders: state.orders.map((order) =>
          order.orderid === action.payload.orderid
            ? { ...order, status: action.payload.status }
            : order
        ),
      };

    case "SET_FILTER":
      return {
        ...state,
        filter: { ...state.filter, ...action.payload },
      };

    case "RESET_FILTER":
      return {
        ...state,
        filter: initialState.filter,
      };

    default:
      return state;
  }
};
