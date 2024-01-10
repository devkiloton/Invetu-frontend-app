import { Stock } from "~/clients/firebase-client/models/Investments";
import { Result } from "~/clients/firebase-client/models/history-stock-br";

type Data = {
    result: Result
    stock: Stock
}

// Function dedicated to extract constants that should multiply and divide the result of an stock in a period of time
export const getExternalitiesConstants = (data: Data) => {
    const { result, stock } = data
    const dividendsCashSinceStartDate = result.dividendsData?.cashDividends?.filter(dividend => new Date(dividend.lastDatePrior) >= new Date(stock.startDate)
    )
    const dividendsStockSinceStartDate = result.dividendsData?.stockDividends?.filter(dividend => new Date(dividend.lastDatePrior) >= new Date(stock.startDate))
    
    const sum = dividendsCashSinceStartDate

    const multiply = dividendsStockSinceStartDate

    return {
        stocks: {
            sum: 0,
            multiply: 0,
            divide: 0,
        },
        cash: {
            sum: 0,
            multiply: 0,
            divide: 0,
        },
    }
}