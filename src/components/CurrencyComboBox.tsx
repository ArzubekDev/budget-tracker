'use client';

import {
  Combobox,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxInput,
  ComboboxItem,
  ComboboxList,
} from '@/components/ui/combobox';
import { Currencies } from '@/lib/currencies';
import { useQuery } from '@tanstack/react-query';
import SkeletonWrapper from './SkeletonWrapper';

export function CurrencyComboBox() {
  const userSettings = useQuery({
    queryKey: ['userSettings'],
    queryFn: () => fetch('/api/user-settings').then((res) => res.json()),
  });
  return (
    <SkeletonWrapper isLoading={userSettings.isFetching}>
      <Combobox items={Currencies}>
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
