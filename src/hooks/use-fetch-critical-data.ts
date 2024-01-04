import { useDispatch } from "react-redux";
import { fetchAllFixedIncomeData, fetchAllStocksData, fetchCryptoData, fetchCryptoStatus, fetchFiats } from "~/features/investments-data/investments-data-slice";
import { fetchInvestments } from "~/features/investments/investments-slice";

/**
 * Hook responsible for triggering critical data for the application.
 * Mainly which investment the user has and its data
 * 
 * @returns A callback fn to trigger the async thunks
 */
export const useFetchCriticalData = () =>{
const dispatch = useDispatch()
    return ()=>{
        // Async thunks to fetch investments and investments data
        dispatch(fetchInvestments());
        dispatch(fetchAllStocksData());
        dispatch(fetchAllFixedIncomeData());
        dispatch(fetchFiats());
        dispatch(fetchCryptoStatus());
        dispatch(fetchCryptoData());
    }
}