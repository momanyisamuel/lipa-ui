import { FC, useState } from 'react'
import {z} from "zod"
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from '@hookform/resolvers/zod';
import { Label } from './ui/label';
import { Input } from './ui/input';
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover';
import { Button } from './ui/button';
import { CalendarIcon } from 'lucide-react';
import { format } from 'date-fns';
import { Calendar } from './ui/calendar';
import { cn } from '@/lib/utils';
import { useAppDispatch } from '@/hooks/store';
import { addExpenses } from '@/store/expenseSlice';

const ExpenseSchema = z.object({
    name: z.string({
        required_error: "name not provided"
    }),
    amount: z.coerce.number({required_error: "amount not provided"}).min(1),
    date: z.coerce.date({required_error: "date not provided"}),
})

type ExpenseFormInput = z.infer<typeof ExpenseSchema>;

interface ExpenseFormProps {
  setIsOpen: (isOpen: boolean) => void
}

const ExpenseForm: FC<ExpenseFormProps> = ({setIsOpen}) => {
    const [isLoading, setIsLoading] = useState(false)
    const dispatch = useAppDispatch()
    const {
        register,
        handleSubmit,
        control,
        formState: { errors },
      } = useForm<ExpenseFormInput>({
        resolver: zodResolver(ExpenseSchema),
      });

      const onSubmit = (data: ExpenseFormInput) => {
        setIsLoading(true)
        dispatch(addExpenses(data)).then(() => {
            setIsLoading(false)
            setIsOpen(false)
        })
      }
  return <div>
    <form onSubmit={handleSubmit(onSubmit)}>
        <div className=''>
            <Label htmlFor="name">Name</Label>
            <Input type="text" placeholder="Name" {...register("name")}/>
            {errors.name && (
              <>
                <p className="text-red-500">
                  {errors?.name?.message?.toString()}
                </p>
              </>
            )}
        </div>
        <div>
            <Label htmlFor="amount">Amount</Label>
            <Input type="number" placeholder="Amount" {...register("amount")}/>
            {errors.amount && (
              <>
                <p className="text-red-500">
                  {errors?.amount?.message?.toString()}
                </p>
              </>
            )}
        </div>
        <div>
            <Label htmlFor="date">Date</Label>
            <Controller
              name="date"
              control={control}
              render={({ field: { onChange, value } }) => (
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant={"outline"}
                      className={cn(
                        "w-full justify-start text-left font-normal",
                        !value && "text-muted-foreground"
                      )}
                    >
                      <CalendarIcon className="w-4 h-4 mr-2" />
                      {value ? format(value, "PPP") : <span>Pick a date</span>}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar
                      mode="single"
                      selected={value}
                      onSelect={onChange}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              )}
            />
            {errors.date && (
              <>
                <p className="text-red-500">
                  {errors?.date?.message?.toString()}
                </p>
              </>
            )}
        </div>
        <div className="">
            <Button onClick={()=>setIsOpen(false)}>Cancel</Button>
            <Button type='submit' disabled={isLoading}>Submit</Button>
        </div>
    </form>
  </div>
}

export default ExpenseForm