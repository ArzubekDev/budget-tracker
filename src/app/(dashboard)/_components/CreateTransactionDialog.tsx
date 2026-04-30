'use client';

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { 
  Form
} from "@/components/ui/form";
import { TransactionType } from '@/lib/types';
import { cn } from '@/lib/utils';
import {
  CreateTransactionSchema,
  CreateTransactionSchemaInput,
  CreateTransactionSchemaType,
} from '@/schema/transaction';
import { zodResolver } from '@hookform/resolvers/zod';
import { ReactNode } from 'react';
import { useForm } from 'react-hook-form';

interface Props {
  trigger: ReactNode;
  type: TransactionType;
}

const CreateTransactionDialog = ({ trigger, type }: Props) => {
  const form = useForm<CreateTransactionSchemaInput, any, CreateTransactionSchemaType>({
    resolver: zodResolver(CreateTransactionSchema),
    defaultValues: {
      type,
      date: new Date(),
    },
  });
  return (
    <Dialog>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            Create a new{' '}
            <span className={cn('m-1', type === 'income' ? 'text-emerald-500' : 'text-rose-500')}>
              {type}
            </span>{' '}
            transaction
          </DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form className="space-y-4"></form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default CreateTransactionDialog;
