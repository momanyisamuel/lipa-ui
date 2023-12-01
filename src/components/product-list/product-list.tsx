import { FC } from 'react'
import { DataTable } from '../datatable/data-table'
import { columns } from './product-column'
import { CartItem } from '../Cart'

interface ProductListProps {
  products : CartItem[]
}

const ProductList: FC<ProductListProps> = ({products}) => {
  return (
    <div>
      <DataTable columns={columns} data={products}  searchBy='description'/>
    </div>
  )
}

export default ProductList