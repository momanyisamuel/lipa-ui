import { FC, useEffect, useState } from "react";
import {
  Card,
  CardHeader,
} from "@/components/ui/card";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { BanIcon, Banknote, DeleteIcon, MinusIcon, PlusIcon, PrinterIcon, ShoppingBasketIcon } from "lucide-react";
import CustomerSwitcher from "./customer-switcher";
import { addToCart, clearCart, decreaseItemQuantity, fetchProducts, getCartTotal, increaseItemQuantity, removeItem } from "@/store/productSlice";
import { useAppDispatch, useAppSelector } from "@/hooks/store";
import FormDialog from "./form-dialog";
import PaymentForm from "./payment-form";

export interface CartItem {
  _id: number;
  buying_price: number;
  selling_price: number;
  category: string;
  quantity: number;
  name: string;
  stock: number;
  img: string;
}


interface CartProps {}

const Cart: FC<CartProps> = () => {
  const data = useAppSelector((state) => state.products.products);
  const {cart, totalQuantity, totalPrice} = useAppSelector((state) => state.products)
  const [searchTerm,setSearchTerm] = useState<string>("")
  const [isOpen, setIsOpen] = useState(false);
  const dispatch = useAppDispatch();

  const filterItems = (e: React.ChangeEvent<HTMLInputElement>) => {
    let searchTxt = e.target.value;
    searchTxt = searchTxt.toLowerCase().trim();
    console.log(searchTxt);
    setSearchTerm(searchTxt);
  }

  useEffect(() => {
    dispatch(fetchProducts());
    dispatch(getCartTotal())
  }, [dispatch, cart]);

  return (
    <div className="px-4 py-2">
      <div className="flex items-start justify-between w-full gap-2">
        <div className="flex flex-col  w-[65%] ">
          <div className="px-3 py-2 border border-slate-100 bg-slate-50">
            <Input type="search" name="filterItems" placeholder="Search..." className="" onChange={(e)=> filterItems(e)}/>
          </div>
          <div className="flex gap-3 max-h-[500px] overflow-y-auto py-4">
            {data && data.map((item) => {
              const tempName = item.name.toLowerCase()
              if(tempName.indexOf(searchTerm) != -1){
                return (
                  <div key={item._id} className="flex justify-between gap-3 cursor-pointer border shadow-sm p-3 h-[150px]">
                  <div className="flex flex-col justify-between font-bold h-[95px]">
                    <div className="">
                      <h3>{item.name}</h3>
                      <p className="text-xs">KES {item.selling_price}</p>
                    </div>
                    <div className="flex items-center gap-3">
                      <Button variant="outline" size="sm" className="" onClick={() => dispatch(addToCart(item))}>Add to cart</Button>
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-6 h-6"><path stroke-linecap="round" stroke-linejoin="round" d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3"></path></svg>
                      <p className="text-xs font-normal">Stock - {item.stock}</p>
                    </div>
                  </div>
                  <div className="flex flex-col items-center justify-between">
                    <button onClick={() => dispatch(increaseItemQuantity(item._id))}>
                      <PlusIcon className="w-6 h-6 bg-slate-100"/>
                    </button>
                    <p className="text-2xl font-semibold ">{item.quantity}</p>
                    <button onClick={() => dispatch(decreaseItemQuantity(item._id))}>
                      <MinusIcon className="w-6 h-6 bg-slate-100"/>
                    </button>
                  </div>
                </div>
                )
              }
            })}
          </div>
        </div>
        <div className="flex flex-col w-[35%] relative">
          <div className="flex items-start justify-between w-full px-3 py-2 border border-slate-100 bg-slate-50">
            <div className="w-1/2 h-full">
              <CustomerSwitcher className="w-full" />
            </div>
            <div className="flex items-center justify-end w-1/2 h-full gap-2 p-1 align-middle">
              <h2 className="block text-lg font-semibold tracking-tight scroll-m-20">
                Cart
              </h2>
              <ShoppingBasketIcon className="block" />
            </div>
          </div>
          <div className="flex flex-col gap-2 my-2 max-h-[500px] overflow-y-auto">
            {cart.length > 0 ? (
              cart.map((item: CartItem) => (
                <Card key={item._id} className="cursor-pointer">
                  <CardHeader>
                   
                      <div className="flex items-center justify-between gap-3 font-semibold">
                        <div className="">
                        <h3>{item.name}</h3>
                        <p className="text-xs font-normal">KES {item.selling_price}</p>
                        </div>
                        <div className="flex">
                          <Button variant="outline" size="icon" className="" onClick={() => dispatch(decreaseItemQuantity(item._id))}><MinusIcon/></Button>
                          <p className="px-3 text-2xl font-semibold">{item.quantity}</p>
                          <Button variant="outline" size="icon" className="" onClick={() => dispatch(increaseItemQuantity(item._id))}><PlusIcon/></Button>
                        </div>
                      <div className="">
                        <Button variant="ghost" size="icon" onClick={()=> dispatch(removeItem(item._id))}>
                          <DeleteIcon className="text-red-300" />
                        </Button>
                      </div>
                      </div>
                  </CardHeader>
                </Card>
              ))
            ) : (
              <div className="flex items-center justify-center gap-3 p-8">
                <div className="flex items-center gap-3">
                  <h3>Cart is empty</h3>
                </div>
              </div>
            )}
          </div>
          <div className="relative flex flex-col gap-3">
            <div className="absolute top-0 flex flex-col w-full ">
              <div className="flex w-full mb-4">
                <div className="w-[50%] bg-blue-400 px-3 py-1">
                  <p className="text-xl font-semibold tracking-tight scroll-m-20">
                   {totalQuantity}
                  </p>
                  <h4 className="text-xs font-medium leading-none">Total quantity</h4>
                </div>
                <div className="w-[50%] bg-green-400 px-3 py-1">
                  <p className="text-xl font-semibold tracking-tight scroll-m-20">
                    KES {totalPrice}
                  </p>
                  <h4 className="text-xs font-medium leading-none">Total</h4>
                </div>
              </div>
              <div className="flex items-center justify-between gap-3">
                <Button variant="destructive" size="default" onClick={()=> dispatch(clearCart())} className="flex w-full gap-2">
                <BanIcon className="w-4 h-4 text-red-300" /> Cancel 
                </Button>
                <Button variant="default" size="default" className="flex w-full gap-2" >
                <PrinterIcon className="w-4 h-4" /> Print 
                </Button>
                <div className="w-full">
                  <FormDialog
                setIsOpen={setIsOpen}
                isOpen={isOpen}
                title="Payment Details"
                btnText={`Pay`}
                btnIcon={<Banknote/>}
                >
                  <PaymentForm setIsOpen={setIsOpen} cart={cart} totalPrice={totalPrice}/>
                </FormDialog>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
