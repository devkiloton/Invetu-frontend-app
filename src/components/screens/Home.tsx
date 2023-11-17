import { useEffect, useState } from 'react';
import PageContainer from '../containers/PageContainer';
import AddStocksForm from '../forms/AddStocksForm';
import AccountStats from '../shared/AccountStats';
import InvestmentCard from '../shared/InvestmentCard';
import { firebaseClient } from '~/clients/firebase-client/firebase-client';
import { useAuth } from '~/lib/firebase';
import { Stock } from '~/clients/firebase-client/models/Investments';
import { joinStockData } from '~/helpers/join-stock-data';
import { Dialog } from '@headlessui/react';
import { foxbatClient } from '~/clients/foxbat-client/foxbat-client';
import { Head } from '../shared/Head';

export default function Home() {
  const [investments, setInvestments] = useState<Array<Stock>>([]);
  const [investedAmount, setInvestedAmount] = useState(0);
  const [isOpen, setIsOpen] = useState(false);
  const auth = useAuth();
  const [currentBalance, setCurrentBalance] = useState(0);

  useEffect(() => {
    firebaseClient()
      .firestore.investments.get(auth.currentUser?.uid as string)
      .then(response => {
        setInvestedAmount(response.investedAmount);
        const stocks = response.stocks;
        const tickers = stocks.map(stock => stock.ticker);
        foxbatClient()
          .stocks.findMany(tickers)
          .then(response => {
            // take the current price of each stock and multiply by the amount
            const currentBalance = stocks.reduce((acc, stock) => {
              const currentPrice = response.results.find(
                stockResponse => stockResponse.symbol === stock.ticker,
              )?.regularMarketPrice;
              return acc + (currentPrice as number) * stock.amount;
            }, 0);
            setCurrentBalance(currentBalance);
          });
      });
  }, []);

  useEffect(() => {
    if (auth.currentUser?.uid !== undefined) {
      firebaseClient()
        .firestore.investments.stocks.get(auth.currentUser.uid)
        .then(investiments => {
          setInvestments(joinStockData(investiments.stocks));
          setInvestedAmount(investiments.investedAmount);
        });
    }
  }, []);
  return (
    <>
    <Head title="Foxbat | Home" />
    <PageContainer>
      <AccountStats
        investedAmount={investedAmount}
        currentBalance={currentBalance}
      />
      <div className="flex gap-x-4">
        <div className="w-full h-full sticky top-24 max-w-120 hidden min-[768px]:block ">
          <AddStocksForm />
        </div>
        <div className="w-full flex flex-col gap-4">
          {investments.map(investment => {
            return (
              <InvestmentCard
                key={crypto.randomUUID()}
                {...investment}
                currentBalance={currentBalance}
                investedAmount={investedAmount}
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
