import { ColumnDef } from "@tanstack/react-table";
import { Checkbox } from "@/components/ui/checkbox";
import { DataTableColumnHeader } from "@/components/datatable/column-header";
import { Order } from "@/store/orderSlice";


// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.


export const columns: ColumnDef<Order>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <div className="flex items-center justify-center">
        <Checkbox
          checked={table.getIsAllPageRowsSelected()}
          onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
          aria-label="Select all"
          className="translate-y-[2px]"
        />
      </div>
    ),
    cell: ({ row }) => (
      <div className="flex items-center justify-center">
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={(value) => row.toggleSelected(!!value)}
          aria-label="Select row"
          className="translate-y-[2px]"
        />
      </div>
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "ref_number",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Product Name" />
    ),
    cell: ({ row }) => (
      <div className="">{row.getValue("ref_number")}</div>
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "customer",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Category" />
    ),
    cell: ({ row }) => {
      return (
        <div className="flex space-x-2">
            {row.getValue("customer")}
        </div>
      );
    },
  },
  {
    accessorKey: "total",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Price" />
    ),
    cell: ({ row }) => {
          return (
        <div className="flex items-center">
          {row.getValue("total")}
        </div>
      );
    }
  },
  {
    accessorKey: "paid",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Current Stock" />
    ),
    cell: ({ row }) => {
      return (
        <div className="flex space-x-2">
          {row.getValue("paid")}
        </div>
      );
    },
  }
];
