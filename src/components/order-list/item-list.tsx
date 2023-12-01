import { FC } from "react";
import {
  TableCell,
  TableRow,
} from "@/components/ui/table";
import { CartItem } from "../Cart";

interface ItemListProps {
  items: CartItem[];
}

const ItemList: FC<ItemListProps> = ({ items }) => {
  return (
    <>
     
          {items &&
            items.map((item) => (
              <TableRow key={item._id}>
                <TableCell>{item.name}</TableCell>
                <TableCell></TableCell>
                <TableCell>{item.quantity}</TableCell>
                <TableCell>{item.selling_price}</TableCell>
              </TableRow>
            ))}
    </>
  );
};

export default ItemList;
