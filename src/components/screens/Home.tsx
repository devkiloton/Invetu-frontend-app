import { useEffect, useState } from 'react';
import PageContainer from '../containers/PageContainer';
import AddStocksForm from '../forms/AddStocksForm';
import AccountStats from '../shared/AccountStats';
import InvestmentCard from '../shared/InvestmentCard';
import { Stock } from '~/clients/firebase-client/models/Investments';
import { joinStockData } from '~/helpers/join-stock-data';
import { Dialog } from '@headlessui/react';
import { invetuClient } from '~/clients/invetu-client/invetu-client';
import { Head } from '../shared/Head';
import RadialChart from '../shared/RadialChart';
import { HistoryAPI } from '~/clients/invetu-client/models/HistoryAPI';
import Dividends from '../shared/Dividends';
import EvolutionChart from '../shared/EvolutionChart';
import { useCustomSelector } from '~/hooks/use-custom-selector';
import { useDispatch } from 'react-redux';
import { fetchInvestments } from '~/features/investments/investments-slice';

export default function Home() {
  const [investmentsJoined, setInvestmentsJoined] = useState<Array<Stock>>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [currentBalance, setCurrentBalance] = useState(0);
  const [stocksHistory, setStocksHistory] = useState<Array<HistoryAPI>>();
  const investmentsStore = useCustomSelector(state => state.investments);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchInvestments());
  }, []);

  useEffect(() => {
    if (investmentsStore.asyncState.isLoaded === false) return;
    const stocks = investmentsStore.stocks;
    setInvestmentsJoined(joinStockData(stocks));
    const tickers = stocks.map(stock => stock.ticker);
    invetuClient()
      .stocks.findHistory({
        ticker: tickers,
        range: '1mo',
        interval: '1d',
      })
      .then(response => {
        setStocksHistory(response);
        // take the current price of each stock and multiply by the amount
        const currentBalance = stocks.reduce((acc, stock) => {
          const currentPrice = response[0].results.find(
            stockResponse => stockResponse.symbol === stock.ticker,
          )?.regularMarketPrice;
          return acc + (currentPrice as number) * stock.amount;
        }, 0);
        setCurrentBalance(currentBalance);
      });
  }, [investmentsStore]);
  return (
    <>
      <Head title="Home" />
      <PageContainer>
        <AccountStats
          investedAmount={investmentsStore.investedAmount}
          currentBalance={currentBalance}
        />
        <div className="flex flex-col lg:flex-row gap-4">
          <div className="flex flex-col md:flex-row w-full gap-4">
            <div className="glassy-border rounded-2xl p-4 md:p-8">
              <h1 className="font-semibold">Resultados desse mês</h1>
              <div className="flex justify-center">
                <RadialChart
                  investments={investmentsJoined}
                  stocksHistory={stocksHistory!}
                />
              </div>
            </div>
            <div
              className="tooltip tooltip-error w-full z-0"
              data-tip="Ops, funcionalidade em desenvolvimento">
              <div className="glassy-border rounded-2xl w-full p-4 md:p-8">
                <h1 className="font-semibold mb-3 text-start">
                  Evolução patrimonial
                </h1>
                <EvolutionChart />
              </div>
            </div>
          </div>
          <div className="glassy-border rounded-2xl min-w-80 p-4 md:p-8 max-h-[388px] overflow-scroll">
            <h1 className="font-semibold mb-3">Próximos rendimentos</h1>
            {investmentsJoined.length > 0 && (
              <Dividends stocks={investmentsStore.stocks} />
            )}
          </div>
        </div>
        <div className="flex gap-x-4">
          <div className="w-full h-full sticky top-24 max-w-120 hidden min-[1024px]:block ">
            <AddStocksForm />
          </div>
          <div className="w-full flex flex-col gap-4">
            {investmentsJoined.map(investment => {
              return (
                <InvestmentCard
                  key={crypto.randomUUID()}
                  {...investment}
                  currentBalance={currentBalance}
                  investedAmount={investmentsStore.investedAmount}
                />
              );
            })}
          </div>
        </div>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="btn btn-primary btn-circle fixed bottom-5 right-5 ">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 rotate-45"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
        <Dialog
          open={isOpen}
          onClose={() => setIsOpen(false)}
          className="relative z-[100]">
          <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
          <div className="fixed inset-0 flex w-screen items-center justify-center p-4">
            <Dialog.Panel className="max-w-120 w-full overflow-scroll max-h-[90vh]">
              <AddStocksForm />
            </Dialog.Panel>
          </div>
        </Dialog>
      </PageContainer>
    </>
  );
}
