import { FC, useEffect, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { Button } from "./ui/button";
import { useAppDispatch, useAppSelector } from "@/hooks/store";
import { addProducts } from "@/store/productSlice";
import { fetchCategories } from "@/store/categorySlice";

export const ProductSchema = z.object({
  name: z.string().min(1, { message: "Name is required" }),
  buying_price: z.coerce.number({
    required_error: "Price is required",
  }),
  selling_price: z.coerce.number({
    required_error: "Price is required",
  }),
  category: z.string().min(1, { message: "Category is required" }),
  stock: z.coerce.number({
    required_error: "stock is required",
  }),
});

type ProductFormInput = z.infer<typeof ProductSchema>;

interface ProductFormProps {
  setIsOpen: (isOpen: boolean) => void;
}

const ProductForm: FC<ProductFormProps> = ({ setIsOpen }) => {
  const data = useAppSelector((state) => state.categories.categories);
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useAppDispatch();
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<ProductFormInput>({
    resolver: zodResolver(ProductSchema),
  });
  const onSubmit = (data: ProductFormInput) => {
    console.log(data);
    setIsLoading(true);
    dispatch(addProducts(data)).then(() => {
      setIsLoading(false);
      setIsOpen(false);
    });
  };
  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);
  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="py-2 pb-4 space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Name</Label>
            <Input id="name" placeholder="Product name" {...register("name")} />
            {errors.name && (
              <span className="text-sm text-red-500">
                {errors.name.message}
              </span>
            )}
          </div>
          <div className="space-y-2">
            <Label htmlFor="category">Category</Label>
            <Controller
              name="category"
              control={control}
              render={({ field: { onChange, value } }) => (
                <Select onValueChange={onChange} value={value}>
                  <SelectTrigger className="">
                    <SelectValue placeholder="Select..." />
                  </SelectTrigger>
                  <SelectContent>
                    {data.map((category)=>(
                        <SelectItem key={category._id} value={category._id}>{category.name}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}
            />
            {errors.category && (
              <span className="text-sm text-red-500">
                {errors.category.message}
              </span>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="buying_price">Buying Price</Label>
            <Input id="buying_price" placeholder="0.00" {...register("buying_price")} />
            {errors.buying_price && (
              <span className="text-sm text-red-500">
                {errors.buying_price.message}
              </span>
            )}
          </div>
          <div className="space-y-2">
            <Label htmlFor="selling_price">Selling Price</Label>
            <Input id="selling_price" placeholder="0.00" {...register("selling_price")} />
            {errors.selling_price && (
              <span className="text-sm text-red-500">
                {errors.selling_price.message}
              </span>
            )}
          </div>
          <div className="space-y-2">
            <Label htmlFor="stock">Stock</Label>
            <Input id="stock" placeholder="0" {...register("stock")} />
            {errors.stock && (
              <span className="text-sm text-red-500">
                {errors.stock.message}
              </span>
            )}
          </div>
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
    </>
  );
};

export default ProductForm;
