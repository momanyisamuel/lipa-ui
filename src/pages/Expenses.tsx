import ExpenseForm from "@/components/expense-form";
import ExpenseList from "@/components/expense-list/expense-list";
import FormDialog from "@/components/form-dialog";
import { useAppDispatch, useAppSelector } from "@/hooks/store";
import { fetchExpenses } from "@/store/expenseSlice";
import { FC, useEffect, useState } from "react";

interface ExpensesProps {}

const Expenses: FC<ExpensesProps> = () => {
  const [isOpen, setIsOpen] = useState(false);
  const expenses = useAppSelector((state) => state.expenses.expenses)
  console.log(expenses)
  const dispatch = useAppDispatch()

  useEffect(()=>{
    dispatch(fetchExpenses())
  },[dispatch])
  return (
    <div>
      <div className="flex items-center justify-between px-4 my-4">
        <div className="flex items-center justify-between flex-1 space-x-2">
          <div>
            <h1 className="text-xl font-semibold">Expenses</h1>
          </div>
          <div className="flex items-center gap-3">
            <div>
              <FormDialog
                isOpen={isOpen}
                setIsOpen={setIsOpen}
                title="New expense"
                btnText="New Expense"
              >
                <ExpenseForm setIsOpen={setIsOpen} />
              </FormDialog>
            </div>
          </div>
        </div>
      </div>
      <div className="px-4 my-4">
        <ExpenseList expenses={expenses} />
      </div>
    </div>
  );
};

export default Expenses;
