
import api from "../api";



export const currencyApi = api.injectEndpoints({
    endpoints: (build) => ({
        currencyApi: build.mutation({
            query: (currencyType) => ({
                url: currencyType,
                method: 'GET',

            }),
        })

    }),
    overrideExisting: false,
});

// We can use the Lazy Query as well for GET requests depends on our Requirements.
// For POST request we will use mutations.
export const { useCurrencyApiMutation } = currencyApi;
