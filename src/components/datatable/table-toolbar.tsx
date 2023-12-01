import { Table } from "@tanstack/react-table"

import { Input } from "@/components/ui/input"
import { DataTableViewOptions } from "@/components/datatable/view-options"

interface DataTableToolbarProps<TData> {
  table: Table<TData>
  searchBy: string
}

export function DataTableToolbar<TData>({
  table,
  searchBy,
}: DataTableToolbarProps<TData>) {

  return (
    <div className="flex items-center justify-between mb-4">
      <div className="flex items-center flex-1 space-x-2">
        <Input
          placeholder={`Search...`}
          value={(table.getColumn(`${searchBy}`)?.getFilterValue() as string) ?? ""}
          onChange={(event) =>
            table.getColumn("title")?.setFilterValue(event.target.value)
          }
          className="h-8 w-[350px] lg:w-[450px]"
        />
      </div>
      <DataTableViewOptions table={table} />
    </div>
  )
}