'use client';

import { GetCategoriesStatsType } from '@/app/api/stats/categories/route';
import SkeletonWrapper from '@/components/SkeletonWrapper';
import { Card, CardHeader, CardTitle } from '@/components/ui/card';
import { UserSettings } from '@/generated/client';
import { DateToUTCDate, GetFormatterForCurrency } from '@/lib/helpers';
import { TransactionType } from '@/lib/types';
import { useQuery } from '@tanstack/react-query';
import { useMemo } from 'react';

interface Props {
  userSettings: UserSettings;
  from: Date;
  to: Date;
}
const CategoriesStats = ({ userSettings, from, to }: Props) => {
  const statsQuery = useQuery<GetCategoriesStatsType>({
    queryKey: ['overview', 'stats', 'categories', from, to],
    queryFn: () =>
      fetch(`/api/stats/categories?from=${DateToUTCDate(from)}&to=${DateToUTCDate(to)}`).then(
        (res) => res.json(),
      ),
  });

  const formatter = useMemo(() => {
    return GetFormatterForCurrency(userSettings.currency);
  }, [userSettings.currency]);

  return (
    <div className="w-full flex flex-wrap gap-2 md:flex-nowrap">
      <SkeletonWrapper isLoading={statsQuery.isFetching}>
        <CategoriesCard formatter={formatter} type="income" data={statsQuery.data || []} />
      </SkeletonWrapper>
    </div>
  );
};

export default CategoriesStats;

function CategoriesCard({
  formatter,
  data,
  type,
}: {
  formatter: Intl.NumberFormat;
  data: GetCategoriesStatsType;
  type: TransactionType;
}) {
  const filteredData = data.filter((item) => item.type === type);
  const total = filteredData.reduce((acc, el) => acc + (el._sum?.amount || 0), 0);

  return (
    <Card className="h-80 w-full">
      <CardHeader>
        <CardTitle className='grid grid-flow-row justify-between gap-2 text-muted-foreground md:grid-flow-col'></CardTitle>
      </CardHeader>
    </Card>
  );
}
