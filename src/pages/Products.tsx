import ProductList from "@/components/product-list/product-list";
import { FC, useEffect, useState } from "react";
import ProductForm from "@/components/product-form";
import CategoryForm from "@/components/category-form";
import FormDialog from "@/components/form-dialog";
import { useAppDispatch, useAppSelector } from "@/hooks/store";
import { fetchProducts } from "@/store/productSlice";



interface ProductsProps {}

const Products: FC<ProductsProps> = () => {
  const data = useAppSelector((state) => state.products.products);
  const [isOpen, setIsOpen] = useState(false);
  const [isCategoryOpen, setIsCategoryOpen] = useState(false);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);
  return (
    <div>
      <div className="flex items-center justify-between px-4 my-4">
        <div className="flex items-center justify-between flex-1 space-x-2">
          <div>
            <h1 className="text-xl font-semibold">Products</h1>
          </div>
          <div className="flex items-center gap-3">
            <div>
              <FormDialog
                isOpen={isCategoryOpen}
                setIsOpen={setIsCategoryOpen}
                title="New category"
                btnText="New Category"
              >
                <CategoryForm setIsOpen={setIsCategoryOpen} />
              </FormDialog>
            </div>
            <div>
              <FormDialog
              isOpen={isOpen}
              setIsOpen={setIsOpen}
              title="New Product"
              btnText="New Product"
              >
              <ProductForm setIsOpen={setIsOpen}/>
              </FormDialog>
            </div>
          </div>
        </div>
      </div>
      <div className="px-4">
        <ProductList products={data} />
      </div>
    </div>
  );
};

export default Products;
