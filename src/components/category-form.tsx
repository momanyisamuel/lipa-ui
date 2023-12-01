import { FC, useEffect, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import {  useForm } from "react-hook-form";
import { z } from "zod";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { useAppDispatch, useAppSelector } from "@/hooks/store";
import { addCategories, fetchCategories } from "@/store/categorySlice";

export const CategorySchema = z.object({
  name: z.string().min(1, { message: "Name is required" }),
});

type CategoryFormInput = z.infer<typeof CategorySchema>;

interface CategoryFormProps {
  setIsOpen: (isOpen: boolean) => void;
}

const CategoryForm: FC<CategoryFormProps> = ({ setIsOpen }) => {
  const data = useAppSelector((state) => state.categories.categories);
  console.log(data);

  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useAppDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CategoryFormInput>({
    resolver: zodResolver(CategorySchema),
  });
  const onSubmit = (data: CategoryFormInput) => {
    console.log(data);
    setIsLoading(true);
    dispatch(addCategories(data)).then(() => {
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

export default CategoryForm;
