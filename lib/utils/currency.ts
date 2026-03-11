// Currency data with exchange rates from USD (approximate rates)
export const CURRENCIES: { code: string; symbol: string; name: string; rate: number }[] = [
  { code: "USD", symbol: "$", name: "US Dollar", rate: 1 },
  { code: "EUR", symbol: "€", name: "Euro", rate: 0.92 },
  { code: "GBP", symbol: "£", name: "British Pound", rate: 0.79 },
  { code: "JPY", symbol: "¥", name: "Japanese Yen", rate: 149.50 },
  { code: "CAD", symbol: "$", name: "Canadian Dollar", rate: 1.36 },
  { code: "AUD", symbol: "$", name: "Australian Dollar", rate: 1.53 },
  { code: "CHF", symbol: "Fr", name: "Swiss Franc", rate: 0.88 },
  { code: "CNY", symbol: "¥", name: "Chinese Yuan", rate: 7.24 },
  { code: "INR", symbol: "₹", name: "Indian Rupee", rate: 83.12 },
  { code: "MXN", symbol: "$", name: "Mexican Peso", rate: 17.15 },
  { code: "BRL", symbol: "R$", name: "Brazilian Real", rate: 4.97 },
  { code: "KRW", symbol: "₩", name: "South Korean Won", rate: 1320.50 },
  { code: "SGD", symbol: "$", name: "Singapore Dollar", rate: 1.34 },
  { code: "HKD", symbol: "$", name: "Hong Kong Dollar", rate: 7.82 },
  { code: "NOK", symbol: "kr", name: "Norwegian Krone", rate: 10.65 },
  { code: "SEK", symbol: "kr", name: "Swedish Krona", rate: 10.42 },
  { code: "DKK", symbol: "kr", name: "Danish Krone", rate: 6.87 },
  { code: "NZD", symbol: "$", name: "New Zealand Dollar", rate: 1.64 },
  { code: "ZAR", symbol: "R", name: "South African Rand", rate: 18.65 },
  { code: "RUB", symbol: "₽", name: "Russian Ruble", rate: 92.50 },
  { code: "TRY", symbol: "₺", name: "Turkish Lira", rate: 32.15 },
  { code: "PLN", symbol: "zł", name: "Polish Zloty", rate: 3.98 },
  { code: "THB", symbol: "฿", name: "Thai Baht", rate: 35.20 },
  { code: "IDR", symbol: "Rp", name: "Indonesian Rupiah", rate: 15750 },
  { code: "MYR", symbol: "RM", name: "Malaysian Ringgit", rate: 4.72 },
  { code: "PHP", symbol: "₱", name: "Philippine Peso", rate: 56.25 },
  { code: "CZK", symbol: "Kč", name: "Czech Koruna", rate: 22.85 },
  { code: "ILS", symbol: "₪", name: "Israeli Shekel", rate: 3.72 },
  { code: "AED", symbol: "د.إ", name: "UAE Dirham", rate: 3.67 },
  { code: "SAR", symbol: "﷼", name: "Saudi Riyal", rate: 3.75 },
  { code: "TWD", symbol: "NT$", name: "Taiwan Dollar", rate: 31.50 },
  { code: "ARS", symbol: "$", name: "Argentine Peso", rate: 875 },
  { code: "CLP", symbol: "$", name: "Chilean Peso", rate: 895 },
  { code: "COP", symbol: "$", name: "Colombian Peso", rate: 3950 },
  { code: "EGP", symbol: "£", name: "Egyptian Pound", rate: 30.90 },
  { code: "PKR", symbol: "₨", name: "Pakistani Rupee", rate: 278.50 },
  { code: "VND", symbol: "₫", name: "Vietnamese Dong", rate: 24500 },
  { code: "NGN", symbol: "₦", name: "Nigerian Naira", rate: 1550 },
  { code: "BDT", symbol: "৳", name: "Bangladeshi Taka", rate: 110.25 },
  { code: "RON", symbol: "lei", name: "Romanian Leu", rate: 4.58 },
  { code: "HUF", symbol: "Ft", name: "Hungarian Forint", rate: 355 },
  { code: "UAH", symbol: "₴", name: "Ukrainian Hryvnia", rate: 37.50 },
];

/**
 * Get currency info by code
 */
export function getCurrency(code: string) {
  return CURRENCIES.find((c) => c.code === code) || CURRENCIES[0];
}

/**
 * Convert amount from USD to target currency
 */
export function convertFromUSD(amountUSD: number, targetCurrency: string): number {
  const currency = getCurrency(targetCurrency);
  return amountUSD * currency.rate;
}

/**
 * Convert amount from source currency to USD
 */
export function convertToUSD(amount: number, sourceCurrency: string): number {
  const currency = getCurrency(sourceCurrency);
  return amount / currency.rate;
}

/**
 * Format amount with currency symbol
 */
export function formatCurrency(
  amountUSD: number,
  displayCurrency: string = "USD",
  options: { decimals?: number; showCode?: boolean } = {}
): string {
  const { decimals = 2, showCode = false } = options;
  const currency = getCurrency(displayCurrency);
  const convertedAmount = convertFromUSD(amountUSD, displayCurrency);
  
  // For currencies with high rates (like JPY, KRW), show no decimals
  const useDecimals = currency.rate > 100 ? 0 : decimals;
  
  const formatted = convertedAmount.toFixed(useDecimals);
  
  if (showCode) {
    return `${currency.symbol}${formatted} ${currency.code}`;
  }
  
  return `${currency.symbol}${formatted}`;
}

/**
 * Format amount for display with compact notation for large numbers
 */
export function formatCurrencyCompact(
  amountUSD: number,
  displayCurrency: string = "USD"
): string {
  const currency = getCurrency(displayCurrency);
  const convertedAmount = convertFromUSD(amountUSD, displayCurrency);
  
  if (convertedAmount >= 1000000) {
    return `${currency.symbol}${(convertedAmount / 1000000).toFixed(1)}M`;
  }
  if (convertedAmount >= 1000) {
    return `${currency.symbol}${(convertedAmount / 1000).toFixed(1)}K`;
  }
  
  const useDecimals = currency.rate > 100 ? 0 : 2;
  return `${currency.symbol}${convertedAmount.toFixed(useDecimals)}`;
}








