'use client';

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
import SkeletonWrapper from './SkeletonWrapper';
import { UpadateUserCurrency } from '@/app/wizard/_actions/userSettings';
import { toast } from 'sonner';

export function CurrencyComboBox() {
  const [value, setValue] = useState<string>("");
  const queryClient = useQueryClient();

  const userSettings = useQuery<UserSettings>({
    queryKey: ['userSettings'],
    queryFn: () => fetch('/api/user-settings').then((res) => res.json()),
  });

  useEffect(() => {
    if (!userSettings.data) return;
    const userCurrency = Currencies.find(
      (currency) => currency.value === userSettings.data.currency
    );
    if (userCurrency) {
      setValue(userCurrency.value);
    }
  }, [userSettings.data]);

  const mutation = useMutation({
    mutationFn: UpadateUserCurrency,
    onSuccess: (updatedSettings) => {
      toast.success("Currency updated successfully 🎉", {
        id: "update-currency",
      });

      queryClient.invalidateQueries({
        queryKey: ["userSettings"],
      });
    },
    onError: (e) => {
      toast.error("Something went wrong", {
        id: "update-currency",
      });
    },
  });

  const selectOption = useCallback((currencyValue: string) => {
    const currency = Currencies.find((c) => c.value === currencyValue);
    
    if (!currency) {
      toast.error("Please select a valid currency");
      return;
    }

    toast.loading("Updating currency...", {
      id: "update-currency"
    });

    mutation.mutate(currency.value);
  }, [mutation]);

  return (
    <SkeletonWrapper isLoading={userSettings.isFetching}>
      <Combobox
        items={Currencies}
        value={value}
        onValueChange={(val) => {
          if (!val) return;
          setValue(val);
          selectOption(val);
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