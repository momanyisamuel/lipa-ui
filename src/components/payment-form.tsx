import { Label } from "@radix-ui/react-dropdown-menu";
import { FC, useState } from "react";
import { Input } from "./ui/input";
import { z } from "zod";
import { useAppDispatch } from "@/hooks/store";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "./ui/button";
import { submitOrder } from "@/store/orderSlice";
import { CartItem } from "./Cart";
import { v4 as uuidv4 } from 'uuid';

export const PaymentSchema = z.object({
  payment: z.coerce.number().min(1, { message: "Payment is required" }),
  discount: z.coerce.number().min(1, { message: "Discount is required" }),
});

type PaymentFormInput = z.infer<typeof PaymentSchema>;

interface PaymentFormProps {
  setIsOpen: (isOpen: boolean) => void;
  cart: CartItem[];
  totalPrice: number;
}

const PaymentForm: FC<PaymentFormProps> = ({ setIsOpen, totalPrice, cart }) => {
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useAppDispatch();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<PaymentFormInput>({
    resolver: zodResolver(PaymentSchema),
  });

  const onSubmit = (data: PaymentFormInput) => {
    console.log(data);
    
    setIsLoading(true);
    const order = {
        ref_number: uuidv4(),
        discount: data.discount,
        customer: "user",
        subtotal: totalPrice,
        tax: "0",
        items: cart,
        date: new Date(),
        payment_type: "cash",
        payment_info: "none",
        total: totalPrice,
        paid: "true",
        // user: uuidv4(),
    }
    dispatch(submitOrder(order));
  };

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <Label>Price</Label>
          <Input type="number" value={totalPrice} disabled />
        </div>
        <div>
          <Label>Payment</Label>
          <Input type="number" placeholder="0.00" {...register("payment")} />
          {errors.payment && (
            <span className="text-sm text-red-500">
              {errors.payment.message}
            </span>
          )}
        </div>
        <div className="">
            <Label>Discount</Label>
            <Input type="number" placeholder="0.00" {...register("discount")} />
            {errors.discount && (
                <span className="text-sm text-red-500">
                    {errors.discount.message}
                </span>
            )}
        </div>
        <div className="flex justify-end space-x-2">
          <Button variant="default" onClick={() => setIsOpen(false)}>
            Cancel
          </Button>
          <Button type="submit" disabled={isLoading}>
            Submit
          </Button>
        </div>
      </form>
    </div>
  );
};

export default PaymentForm;
