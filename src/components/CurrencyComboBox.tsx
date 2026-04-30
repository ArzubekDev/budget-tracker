'use client';

import { UpadateUserCurrency } from '@/app/wizard/_actions/userSettings';
import {
  Combobox,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxInput,
  ComboboxItem,
  ComboboxList,
} from '@/components/ui/combobox';
import { UserSettings } from '@/generated/client';
import { Currencies, Currency } from '@/lib/currencies';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useCallback, useEffect, useState } from 'react';
import { toast } from 'sonner';
import SkeletonWrapper from './SkeletonWrapper';

export function CurrencyComboBox() {
  const [selectedOption, setSelectedOption] = useState<Currency | null>(null);

  const userSettings = useQuery<UserSettings>({
    queryKey: ['userSettings'],
    queryFn: () => fetch('/api/user-settings').then((res) => res.json()),
  });

  useEffect(() => {
    if (!userSettings.data) return;
    const userCurrency = Currencies.find(
      (currency) => currency.value === userSettings.data.currency,
    );
    if (userCurrency) {
      setSelectedOption(userCurrency);
    }
  }, [userSettings.data]);

  // 2. Mutation: Ийгиликтүү болсо билдирүү чыгарып, тандалганды жаңылайт
  const mutation = useMutation({
    mutationFn: UpadateUserCurrency,
    onSuccess: (data: UserSettings) => {
      toast.success(`Currency updated successfully 🎉`, {
        id: 'update-currency',
      });

      setSelectedOption(
        Currencies.find((c) => c.value === data.currency) || null
      );
    },
    onError: (e) => {
      toast.error('Something went wrong', {
        id: 'update-currency',
      });
    },
  });

  const selectOption = useCallback((currency: Currency | null) => {
    if (!currency) {
      toast.error("Please select a currency");
      return;
    }

    toast.loading("Updating currency...", {
      id: "update-currency",
    });

    mutation.mutate(currency.value);
  }, [mutation]);

  return (
    <SkeletonWrapper isLoading={userSettings.isFetching}>
      <Combobox
        items={Currencies}
        value={selectedOption?.value || ""}
        onValueChange={(val) => {
          const currency = Currencies.find((c) => c.value === val);
          if (currency) {
            selectOption(currency);
          }
        }}
      >
        <ComboboxInput placeholder="Set currency" />
        <ComboboxContent>
          <ComboboxEmpty>No items found.</ComboboxEmpty>
          <ComboboxList>
            {Currencies.map((item) => (
              <ComboboxItem key={item.value} value={item.value}>
                {item.label}
              </ComboboxItem>
            ))}
          </ComboboxList>
        </ComboboxContent>
      </Combobox>
    </SkeletonWrapper>
  );
}