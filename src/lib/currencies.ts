export const Currencies = [
  { value: "USD", label: "$ US Dollar", locale: "en-US" },
  { value: "EUR", label: "€ Euro", locale: "de-DE" },
  { value: "JPY", label: "¥ Japanese Yen", locale: "ja-JP" },
  { value: "GBP", label: "£ British Pound", locale: "en-GB" },
];

export type Currency = (typeof Currencies)[0]