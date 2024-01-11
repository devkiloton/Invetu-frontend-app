import { Stock } from "~/clients/firebase-client/models/Investments";
import { CashDividendLabel, Result, StockDividendLabel } from "~/clients/firebase-client/models/history-stock-br";
import { isCashDividend } from "~/type-guards/is-cash-dividend";

type Data = {
    result: Result
    stock: Stock
}

// Function dedicated to extract constants that should multiply and divide the result of an stock in a period of time
export const getExternalitiesConstants = (data: Data) => {
    const { result, stock } = data
    const now = new Date()
    const dividendsCashSinceStartDate = result.dividendsData?.cashDividends?.filter(dividend => new Date(dividend.lastDatePrior) >= new Date(stock.startDate) && new Date(dividend.paymentDate) <= now)
    
    const dividendsStockSinceStartDate = result.dividendsData?.stockDividends?.filter(dividend => new Date(dividend.lastDatePrior) >= new Date(stock.startDate))
    if (!dividendsCashSinceStartDate || !dividendsStockSinceStartDate) return ({
        stocksFactor: 1,
        cashDividends: 1,
    })
    const allAdvices = [...dividendsCashSinceStartDate, ...dividendsStockSinceStartDate].sort((a, b) => new Date(a.lastDatePrior).getTime() - new Date(b.lastDatePrior).getTime()).map(advice => {
        if(isCashDividend(advice)){ 
            return ({
            ...advice,
            type: CashDividendLabel
        })
        }else {
            return ({
                ...advice,
                type: StockDividendLabel
            })
        }
    })

    allAdvices.reduce((acc, advice) => {}, )

    return {
        stocksFactor: 1,
        cashDividends: 1,
    }
}