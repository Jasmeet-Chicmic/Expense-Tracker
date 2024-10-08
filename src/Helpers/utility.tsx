// eslint-disable-next-line import/prefer-default-export
import getSymbolFromCurrency from 'currency-symbol-map';
export const firstLetterUpperCase = (message: string) => {
  if (message && message.length > 0) {
    return (
      message[0].toUpperCase() +
      message.substring(1, message.length).toLowerCase()
    );
  }
  return '';
};

export const convertCurrency = (
  amount: number,
  conversionRate: number,
  currency: string
) => {


  const ans = amount * conversionRate;

  return getSymbolFromCurrency(currency) + ans.toFixed(2);
};
