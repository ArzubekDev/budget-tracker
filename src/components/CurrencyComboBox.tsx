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
import { Currencies } from '@/lib/currencies';
import { useQuery } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import SkeletonWrapper from './SkeletonWrapper';

export function CurrencyComboBox() {
  const [value, setValue] = useState<string>("");

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
      setValue(userCurrency.value); // ✅ туура
    }
  }, [userSettings.data]);

  return (
    <SkeletonWrapper isLoading={userSettings.isFetching}>
      <Combobox
        items={Currencies}
        value={value}
        onValueChange={(val) => setValue(val ?? "")}
      >
        <ComboboxInput placeholder="Set currency" />
        <ComboboxContent>
          <ComboboxEmpty>No items found.</ComboboxEmpty>
          <ComboboxList>
            {(item) => (
              <ComboboxItem key={item.value} value={item.value}>
                {item.label}
              </ComboboxItem>
            )}
          </ComboboxList>
        </ComboboxContent>
      </Combobox>
    </SkeletonWrapper>
  );
}