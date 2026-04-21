import axios from "axios";

const BASE_URL = "https://t4e-testserver.onrender.com/api";
const credentials = {
  studentId: "E0123032",
  password: "384766",
  set: "setA",
};

export const ORDER_STATUS = ["Pending", "Preparing", "Out for Delivery", "Delivered", "Cancelled"];

export const isValidOrder = (order) => {
  return Boolean(
    order.orderid &&
      order.customerid &&
      order.restaurant &&
      Array.isArray(order.items) &&
      order.items.length > 0 &&
      order.items.every((item) => Number(item.quantity) > 0) &&
      Number(order.totalAmount) > 0 &&
      ORDER_STATUS.includes(order.status) &&
      Number(order.deliveryTime) > 0 &&
      order.rating !== "" &&
      Number(order.rating) >= 0 &&
      Number(order.rating) <= 5
  );
};

const toArray = (value) => {
  if (Array.isArray(value)) {
    return value;
  }

  if (typeof value === "string") {
    return value
      .split(",")
      .map((item) => ({ name: item.trim(), quantity: 1 }))
      .filter((item) => item.name);
  }

  return [];
};

const normalizeStatus = (status) => {
  const statusText = String(status || "").toLowerCase();

  if (statusText.includes("cancel")) {
    return "Cancelled";
  }

  if (statusText.includes("pending")) {
    return "Pending";
  }

  if (statusText.includes("deliver") && statusText.includes("out")) {
    return "Out for Delivery";
  }

  if (statusText.includes("deliver")) {
    return "Delivered";
  }

  if (statusText.includes("prepar")) {
    return "Preparing";
  }

  return status || "Unknown";
};

const normalizeOrder = (order, index) => {
  return {
    orderid: String(order.orderid || order.orderId || order.id || `ORD-${index + 1}`),
    customerid: String(
      order.customerid || order.customerId || order.customerName || order.customer || ""
    ),
    restaurant: String(order.restaurant || order.restaurantName || ""),
    items: toArray(order.items),
    totalAmount: Number(order.totalAmount || order.amount || order.total || 0),
    status: normalizeStatus(order.status),
    deliveryTime: Number(order.deliveryTime || order.delivery_time || order.eta || 0),
    rating: order.rating ?? "",
  };
};

export const getToken = async () => {
  const { data } = await axios.post(`${BASE_URL}/public/token`, credentials);
  return data;
};

export const getDataset = async (token, dataUrl) => {
  const { data } = await axios.get(`${BASE_URL}${dataUrl}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return data.data.orders;
};

export const getOrders = async () => {
  const { token, dataUrl } = await getToken();
  const orders = await getDataset(token, dataUrl);

  return orders.map(normalizeOrder);
};
