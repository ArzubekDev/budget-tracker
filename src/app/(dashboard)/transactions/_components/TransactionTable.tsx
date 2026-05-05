'use client';

import { GetTransactionsHistoryResponseType } from '@/app/api/transactions-history/route';
import { DateToUTCDate } from '@/lib/helpers';
import { useQuery } from '@tanstack/react-query';
import { ColumnDef } from '@tanstack/react-table';

interface Props {
  from: Date;
  to: Date;
}

type TransactionHistoryRow = GetTransactionsHistoryResponseType[0];

export const columns: ColumnDef<TransactionHistoryRow>[] = [
  {
    accessorKey: 'category',
    cell: ({ row }) => (
      <div className="flex gap2 capitalize">
        {row.original.categoryIcon}
        <div className="capitalize">{row.original.category}</div>
      </div>
    ),
  },
];
const TransactionTable = ({ from, to }: Props) => {
  const history = useQuery<GetTransactionsHistoryResponseType>({
    queryKey: ['transactions', 'history', from, to],
    queryFn: () =>
      fetch(`/api/transactions-history?from=${DateToUTCDate(from)}to=${DateToUTCDate(to)}`).then(
        (res) => res.json(),
      ),
  });
  return <div>TransactionTable</div>;
};

export default TransactionTable;
