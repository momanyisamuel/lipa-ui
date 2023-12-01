import { FC } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Order } from "@/store/orderSlice";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "../ui/collapsible";
import ItemList from "./item-list";
import { ChevronsUpDown } from "lucide-react";
import { Button } from "../ui/button";

interface OrderListProps {
  orders: Order[];
}

const OrderList: FC<OrderListProps> = ({ orders }) => {
  return (
    <div>
      <Table className="border">
        <TableHeader>
          <TableRow>
            <TableHead className="">Ref Number</TableHead>
            <TableHead>Customer</TableHead>
            <TableHead>Quantity</TableHead>
            <TableHead>Total</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {orders &&
            orders.map((order) => (
              <Collapsible key={order._id} className="w-full" asChild>
                <>
                  <TableRow>
                    <TableCell>{order.ref_number}</TableCell>
                    <TableCell>{order.customer}</TableCell>
                    <TableCell className="flex items-center gap-2">
                      <div>
                      {order.items.length} items
                      </div>
                      <CollapsibleTrigger>
                        <Button variant="ghost" size="icon">
                          <ChevronsUpDown className="w-4 h-4" />
                        </Button>
                      </CollapsibleTrigger>
                    </TableCell>
                    <TableCell>{order.total}</TableCell>
                  </TableRow>
                  <CollapsibleContent asChild>
                    <ItemList items={order.items} />
                  </CollapsibleContent>
                </>
              </Collapsible>
            ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default OrderList;
