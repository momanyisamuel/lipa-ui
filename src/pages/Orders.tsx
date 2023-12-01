import OrderList from "@/components/order-list/order-list";
import { useAppDispatch, useAppSelector } from "@/hooks/store";
import { fetchOrders } from "@/store/orderSlice";
import { FC, useEffect } from "react";

interface OrdersProps {}

const Orders: FC<OrdersProps> = () => {
  const data = useAppSelector((state) => state.orders.orders);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchOrders());
  }, [dispatch]);
  return (
    <div>
      <div className="flex items-center justify-between px-4 my-4">
        <div className="flex items-center justify-between flex-1 space-x-2">
          <div>
            <h1 className="text-xl font-semibold">Orders</h1>
          </div>
          <div className="flex items-center gap-3"></div>
        </div>
      </div>
      <div className="px-4">
        <OrderList orders={data} />
      </div>
    </div>
  );
};

export default Orders;
