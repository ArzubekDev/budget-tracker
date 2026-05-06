'use client';

import { CurrencyComboBox } from '@/components/CurrencyComboBox';
import SkeletonWrapper from '@/components/SkeletonWrapper';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Category } from '@/generated/client';
import { TransactionType } from '@/lib/types';
import { cn } from '@/lib/utils';
import { useQuery } from '@tanstack/react-query';
import { PlusSquare, TrashIcon, TrendingDown, TrendingUp } from 'lucide-react';
import CreateCategoryDialog from '../_components/CreateCategoryDialog';
import DeleteCategoryDialog from '../_components/DeleteCategoryDialog';

function Page() {
  return (
    <>
      {/* Header start*/}
      <div className="border-b bg-card">
        <div className="container flex flex-wrap items-center justify-between gap-6 py-8">
          <div>
            <p className="text-3xl font-bold">Manage</p>
            <p className="text-muted-foreground">Manage your account settings and categories</p>
          </div>
        </div>
      </div>
      {/* Header end*/}
      <div className="container flex flex-col gap-4 p-4">
        <Card>
          <CardHeader>
            <CardTitle>Currency</CardTitle>
            <CardDescription>Set your default currency for transactions</CardDescription>
          </CardHeader>
          <CardContent>
            <CurrencyComboBox />
          </CardContent>
        </Card>
        <CategoryList type="income" />
        <CategoryList type="expense" />
      </div>
    </>
  );
}
export default Page;

function CategoryList({ type }: { type: TransactionType }) {
  const categoriesQuery = useQuery({
    queryKey: ['categories', type],
    queryFn: () => fetch(`/api/categories?type=${type}`).then((res) => res.json()),
  });

  const dataAvailable = categoriesQuery.data && categoriesQuery.data.length > 0;
  return (
    <SkeletonWrapper isLoading={categoriesQuery.isLoading}>
      <Card>
        <CardHeader>
          <CardTitle className="flex flex-col gap-4 items-start justify-between sm:flex-row sm:items-center sm:gap-2">
            <div className="flex items-center gap-2">
              {type === 'expense' ? (
                <TrendingDown className="h-12 w-12 items-center rounded-lg bg-rose-400/10 p-2 text-rose-500" />
              ) : (
                <TrendingUp className="h-12 w-12 items-center rounded-lg bg-emerald-400/10 p-2 text-emerald-500" />
              )}
              <div>
                {type === 'income' ? 'Incomes' : 'Expenses'} categories
                <div className="text-sm text-muted-foreground">Sorted by name</div>
              </div>
            </div>
            <CreateCategoryDialog
              type={type}
              successCallback={() => categoriesQuery.refetch()}
              trigger={
                <Button className="gap-2 text-sm">
                  <PlusSquare className="w-4 h-4" />
                  Create category
                </Button>
              }
            />
          </CardTitle>
        </CardHeader>
        <Separator />
        {!dataAvailable && (
          <div className="flex h-40 w-full flex-col items-center justify-center">
            <p>
              No{' '}
              <span className={cn('m-1', type === 'income' ? 'text-emerald-500' : 'text-rose-500')}>
                {type}
              </span>{' '}
              categories yet
            </p>
            <p className="text-sm text-muted-foreground">Create one to get started</p>
          </div>
        )}
        {dataAvailable && (
          <div className="grid grid-flow-row gap-2 p-2 sm:grid-flow-row sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {categoriesQuery.data.map((category: Category) => (
              <CategoryCard category={category} key={category.name} />
            ))}
          </div>
        )}
      </Card>
    </SkeletonWrapper>
  );
}

function CategoryCard({ category }: { category: Category }) {
  return (
    <div className="flex flex-col border-separate justify-between rounded-md border shadow-md shadow-black/10 dark:shadow-white/10">
      <div className="flex flex-col items-center gap-2 p-4">
        <span className="text-3xl" role="img">
          {category.icon}
        </span>
        <span>{category.name}</span>
      </div>
      <DeleteCategoryDialog
        category={category}
        trigger={
          <Button
            className="cursor-pointer flex w-full border-separate items-center gap-2 rounded-t-none rounded-b-md text-muted-foreground hover:bg-red-500/20"
            variant={'secondary'}
          >
            <TrashIcon className="w-4 h-4" /> Remove
          </Button>
        }
      />
    </div>
  );
}
