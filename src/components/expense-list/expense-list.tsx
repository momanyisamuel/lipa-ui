import { FC } from 'react'
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
  } from "@/components/ui/table";
import { Expense } from '@/store/expenseSlice';
import {format} from "date-fns"

interface ExpenseListProps {
  expenses: Expense[];
}

const ExpenseList: FC<ExpenseListProps> = ({expenses}) => {
  return <div>
    <Table className='border'>
        <TableHeader>
            <TableRow>
                <TableHead>#</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Date</TableHead>
            </TableRow>
        </TableHeader>
        <TableBody>
            {
                 expenses && expenses.map((expense,i) =>(
                    <TableRow key={expense._id}>
                        <TableCell className='w-[30px]'>{i+1}</TableCell>
                        <TableCell>{expense.name}</TableCell>
                        <TableCell>{expense.amount}</TableCell>
                        <TableCell>{format(parseInt(expense.date.toString()), "mm/dd/yyyy")}</TableCell>
                    </TableRow>
                )) 
            }
        </TableBody>
    </Table>
  </div>
}

export default ExpenseList