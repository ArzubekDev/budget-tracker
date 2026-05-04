import { GetBalanceStatsResponseType } from '@/app/api/stats/balance/routes';
import { UserSettings } from '@/generated/client';
import { DateToUTCDate, GetFormatterForCurrency } from '@/lib/helpers';
import { useQuery } from '@tanstack/react-query';
import { useMemo } from 'react';

interface Props {
  from: Date;
  to: Date;
  userSettings: UserSettings;
}

const StatsCards = ({ from, to, userSettings }: Props) => {
  const statsQuery = useQuery<GetBalanceStatsResponseType>({
    queryKey: ['overview', 'stats', from, to],
    queryFn: () =>
      fetch(`/api/stats/balance?from=${DateToUTCDate(from)}&to=${DateToUTCDate(to)}`).then((res) =>
        res.json(),
      ),
  });

  const formatter = useMemo(() => {
    return GetFormatterForCurrency(userSettings.currency);
  }, [userSettings.currency]);

  const income = statsQuery.data?.income || 0;
  const expense = statsQuery.data?.expense || 0;

  const balance = income - expense;

  return <div className='relative flex w-full flex-wrap gap-2 md:flex-nowrap'></div>;
};

export default StatsCards;
