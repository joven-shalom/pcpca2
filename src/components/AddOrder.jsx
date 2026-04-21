import { useState } from "react";
import { useAppContext } from "../context/useAppContext";
import { isValidOrder } from "../services/api";

const AddOrder = () => {
  const { dispatch } = useAppContext();

  const [form, setForm] = useState({
    customerid: "",
    restaurant: "",
    items: "",
    totalAmount: "",
    deliveryTime: "",
    rating: "",
  });

  const updateField = (field, value) => {
    setForm((current) => ({ ...current, [field]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const newOrder = {
      orderid: `ORD-${Date.now().toString().slice(-5)}`,
      customerid: form.customerid.trim(),
      restaurant: form.restaurant.trim(),
      items: form.items
        .split(",")
        .map((item) => item.trim())
        .filter(Boolean)
        .map((item) => ({ name: item, quantity: 1 })),
      totalAmount: Number(form.totalAmount),
      status: "Pending",
      deliveryTime: Number(form.deliveryTime),
      rating: Number(form.rating),
    };

    if (!isValidOrder(newOrder)) {
      alert("Please enter a valid order before adding it.");
      return;
    }

    dispatch({ type: "ADD_ORDER", payload: newOrder });
    setForm({
      customerid: "",
      restaurant: "",
      items: "",
      totalAmount: "",
      deliveryTime: "",
      rating: "",
    });
  };

  return (
    <form className="order-form" onSubmit={handleSubmit}>
      <input
        value={form.customerid}
        onChange={(e) => updateField("customerid", e.target.value)}
        placeholder="Customer ID"
      />
      <input
        value={form.restaurant}
        onChange={(e) => updateField("restaurant", e.target.value)}
        placeholder="Restaurant"
      />
      <input
        value={form.items}
        onChange={(e) => updateField("items", e.target.value)}
        placeholder="Items, comma separated"
      />
      <input
        min="1"
        type="number"
        value={form.totalAmount}
        onChange={(e) => updateField("totalAmount", e.target.value)}
        placeholder="Total amount"
      />
      <input
        min="1"
        type="number"
        value={form.deliveryTime}
        onChange={(e) => updateField("deliveryTime", e.target.value)}
        placeholder="Delivery time"
      />
      <input
        max="5"
        min="0"
        step="0.1"
        type="number"
        value={form.rating}
        onChange={(e) => updateField("rating", e.target.value)}
        placeholder="Rating"
      />
      <button type="submit">Add order</button>
    </form>
  );
};

export default AddOrder;
