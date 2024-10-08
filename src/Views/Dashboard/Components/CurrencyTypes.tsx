import {
  CurrencyType,
  setCurrencyConversionRate,
  
} from '../../../Store/User';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../Store';

import useFirbase from '../../../Hooks/useFirbase';
import { auth } from '../../../firebase/firebase';
import { useCurrencyApiMutation } from '../../../Services/Api/currencyApi';
import { useEffect } from 'react';

const CurrencyTypes = () => {
  const { selectedCurrency } = useSelector((state: RootState) => state.user);

  const dispatch = useDispatch();
  const [currencyApi] = useCurrencyApiMutation();
  const currentCurrency = useSelector(
    (state: RootState) => state.user.currentCurrency
  );
  const fetchCurrencies = async () => {
    const currency = await currencyApi(currentCurrency).unwrap();

    dispatch(setCurrencyConversionRate(currency.conversion_rates));
  };
  useEffect(() => {
    fetchCurrencies();
  }, []);
  const { updateUserCurrency } = useFirbase();

  return (
    <div className="flex flex-col">
      <label>Currency</label>
      <select
        className="border border-gray-300 bg-transparent rounded-md p-2"
        value={selectedCurrency}
        onChange={(e) => {
          updateUserCurrency(auth?.currentUser?.uid as string, e.target.value);
        }}
      >
        {Object.keys(CurrencyType).map((key) => {
          return (
            <option
              key={key}
              value={CurrencyType[key as keyof typeof CurrencyType]}
            >
              {CurrencyType[key as keyof typeof CurrencyType]}
            </option>
          );
        })}
      </select>
    </div>
  );
};

export default CurrencyTypes;
