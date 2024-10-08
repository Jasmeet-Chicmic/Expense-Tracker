import { createSlice } from '@reduxjs/toolkit';
export enum CurrencyType {
    "USD" = "USD",
    "INR" = "INR",
    "EUR" = "EUR",
    "GBP" = "GBP",
    "AUD" = "AUD",
    "CAD" = "CAD",
    "JPY" = "JPY",
    "CNY" = "CNY",
    "CHF" = "CHF",
    "SEK" = "SEK",
    "NZD" = "NZD",
    "ZAR" = "ZAR",
    "RUB" = "RUB",
    "BRL" = "BRL",
    "SGD" = "SGD",
    "HKD" = "HKD",
    "MXN" = "MXN"
    // Add more currencies as needed
}

type UserState = {
    userName?: string,
    photoUrl?: string
    income?: number,
    expenses?: number,
    balance?: number,
    currentCurrency?: string
    currencyConversionRate?: {}
    selectedCurrency?: string
}

const initialState: UserState = {
    userName: "",
    photoUrl: "",
    income: 0,
    expenses: 0,
    balance: 0,
    currentCurrency: CurrencyType.INR,
    currencyConversionRate: {
        "INR": 1,
        "AED": 0.04371,
        "AFN": 0.8172,
        "ALL": 1.0727,
        "AMD": 4.6199,
        "ANG": 0.02131,
        "AOA": 11.0593,
        "ARS": 11.611,
        "AUD": 0.01758,
        "AWG": 0.02131,
        "AZN": 0.02023,
        "BAM": 0.02122,
        "BBD": 0.02381,
        "BDT": 1.4235,
        "BGN": 0.02122,
        "BHD": 0.004475,
        "BIF": 34.6762,
        "BMD": 0.0119,
        "BND": 0.01552,
        "BOB": 0.0824,
        "BRL": 0.06502,
        "BSD": 0.0119,
        "BTN": 1,
        "BWP": 0.1578,
        "BYN": 0.03883,
        "BZD": 0.02381,
        "CAD": 0.01619,
        "CDF": 34.028,
        "CHF": 0.01019,
        "CLP": 11.0013,
        "CNY": 0.08376,
        "COP": 49.7283,
        "CRC": 6.1867,
        "CUP": 0.2857,
        "CVE": 1.1963,
        "CZK": 0.2751,
        "DJF": 2.1153,
        "DKK": 0.08092,
        "DOP": 0.7186,
        "DZD": 1.5829,
        "EGP": 0.5761,
        "ERN": 0.1785,
        "ETB": 1.4228,
        "EUR": 0.01085,
        "FJD": 0.02603,
        "FKP": 0.009103,
        "FOK": 0.08093,
        "GBP": 0.009103,
        "GEL": 0.03265,
        "GGP": 0.009103,
        "GHS": 0.19,
        "GIP": 0.009103,
        "GMD": 0.8419,
        "GNF": 103.3053,
        "GTQ": 0.09217,
        "GYD": 2.4904,
        "HKD": 0.09248,
        "HNL": 0.2966,
        "HRK": 0.08174,
        "HTG": 1.5708,
        "HUF": 4.3588,
        "IDR": 186.8594,
        "ILS": 0.0451,
        "IMP": 0.009103,
        "IQD": 15.6266,
        "IRR": 506.0249,
        "ISK": 1.6132,
        "JEP": 0.009103,
        "JMD": 1.8828,
        "JOD": 0.008439,
        "JPY": 1.7646,
        "KES": 1.5373,
        "KGS": 1.005,
        "KHR": 48.5467,
        "KID": 0.01758,
        "KMF": 5.3375,
        "KRW": 16.0083,
        "KWD": 0.003646,
        "KYD": 0.009919,
        "KZT": 5.78,
        "LAK": 262.1627,
        "LBP": 1065.2852,
        "LKR": 3.4943,
        "LRD": 2.301,
        "LSL": 0.2072,
        "LYD": 0.0568,
        "MAD": 0.1169,
        "MDL": 0.2085,
        "MGA": 54.3433,
        "MKD": 0.6632,
        "MMK": 34.1549,
        "MNT": 40.1339,
        "MOP": 0.09526,
        "MRU": 0.4731,
        "MUR": 0.5558,
        "MVR": 0.1838,
        "MWK": 20.7753,
        "MXN": 0.2301,
        "MYR": 0.05099,
        "MZN": 0.7609,
        "NAD": 0.2072,
        "NGN": 19.5083,
        "NIO": 0.4385,
        "NOK": 0.1267,
        "NPR": 1.6,
        "NZD": 0.01941,
        "OMR": 0.004577,
        "PAB": 0.0119,
        "PEN": 0.04436,
        "PGK": 0.04671,
        "PHP": 0.6764,
        "PKR": 3.3099,
        "PLN": 0.04689,
        "PYG": 93.1426,
        "QAR": 0.04333,
        "RON": 0.05401,
        "RSD": 1.2701,
        "RUB": 1.1455,
        "RWF": 16.5693,
        "SAR": 0.04463,
        "SBD": 0.0976,
        "SCR": 0.1642,
        "SDG": 5.3231,
        "SEK": 0.1234,
        "SGD": 0.01552,
        "SHP": 0.009103,
        "SLE": 0.2688,
        "SLL": 268.8367,
        "SOS": 6.8056,
        "SRD": 0.3727,
        "SSP": 38.1088,
        "STN": 0.2658,
        "SYP": 153.1791,
        "SZL": 0.2072,
        "THB": 0.3981,
        "TJS": 0.1272,
        "TMT": 0.04168,
        "TND": 0.03656,
        "TOP": 0.02768,
        "TRY": 0.4081,
        "TTD": 0.0808,
        "TVD": 0.01758,
        "TWD": 0.3827,
        "TZS": 32.468,
        "UAH": 0.4908,
        "UGX": 43.8065,
        "USD": 0.0119,
        "UYU": 0.4979,
        "UZS": 152.6118,
        "VES": 0.4409,
        "VND": 297.1397,
        "VUV": 1.4054,
        "WST": 0.03218,
        "XAF": 7.1166,
        "XCD": 0.03214,
        "XDR": 0.00889,
        "XOF": 7.1166,
        "XPF": 1.2947,
        "YER": 2.9782,
        "ZAR": 0.2072,
        "ZMW": 0.3151,
        "ZWL": 0.306
    },
    selectedCurrency: "INR"

};
const userSlice = createSlice({
    name: 'userData',
    initialState: initialState,
    reducers: {
        updateUserData: (state, action: { payload: UserState }) => {
            state.userName = action.payload.userName;
            state.photoUrl = action.payload.photoUrl;
            state.balance = action.payload.balance;
            state.income = action.payload.income;
            state.expenses = action.payload.expenses;


            state.currentCurrency = action.payload.currentCurrency;
            state.selectedCurrency = action.payload.currentCurrency;

        },
        updateAmount: (state, action: { payload: UserState }) => {
            state.balance = action.payload.balance;
            state.income = action.payload.income;
            state.expenses = action.payload.expenses;
        },
        updateExpense: (state, action: { payload: number }) => {
            if (state.expenses != undefined) {
                state.expenses = state.expenses + action.payload;
                if (state.balance !== undefined)
                    state.balance = state.balance - action.payload;
            }



        },
        updateIncome: (state, action: { payload: number }) => {
            if (state.income != undefined && state.balance != undefined) {


                state.income = state.income + action.payload;
                state.balance = state.balance + action.payload;
            }

        },
        updateUserName: (state, action: { payload: string }) => {
            state.userName = action.payload;
        },

        setCurrencyConversionRate: (state, action: { payload: {} }) => {


            state.currencyConversionRate = action.payload;
        },
        setSelectedCurrency: (state, action: { payload: string }) => {
            state.selectedCurrency = action.payload;
        },
        setCurrentCurrency: (state, action: { payload: string }) => {
            state.currentCurrency = action.payload;
        }
    },
});

export const { updateUserData, updateExpense, updateIncome, updateAmount, updateUserName, setCurrentCurrency, setSelectedCurrency, setCurrencyConversionRate } = userSlice.actions;

export default userSlice.reducer;
