import { createContext, useContext, useState, useCallback } from "react";

const OrderContext = createContext();

const ORDER_STEPS = [
  "Order placed",
  "Being prepared",
  "Ready to serve",
  "Served",
];

export function OrderProvider({ children }) {
  const [activeOrder, setActiveOrder] = useState(null);

  const placeOrder = useCallback((orderData) => {
    const order = {
      id: Math.floor(100 + Math.random() * 900),
      table: 1,
      items: orderData.items,
      grandTotal: orderData.grandTotal,
      step: 0, // "Order placed"
      createdAt: Date.now(),
    };
    setActiveOrder(order);

    // Simulate progress through steps
    setTimeout(() => {
      setActiveOrder((prev) => (prev ? { ...prev, step: 1 } : null));
    }, 3000);
    setTimeout(() => {
      setActiveOrder((prev) => (prev ? { ...prev, step: 2 } : null));
    }, 8000);
    setTimeout(() => {
      setActiveOrder((prev) => (prev ? { ...prev, step: 3 } : null));
    }, 14000);

    return order;
  }, []);

  const dismissOrder = useCallback(() => {
    setActiveOrder(null);
  }, []);

  return (
    <OrderContext.Provider
      value={{ activeOrder, placeOrder, dismissOrder, ORDER_STEPS }}
    >
      {children}
    </OrderContext.Provider>
  );
}

export const useOrder = () => {
  const context = useContext(OrderContext);
  if (!context) throw new Error("useOrder must be used within OrderProvider");
  return context;
};
