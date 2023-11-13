import { useEffect, useState } from 'react';
import PageContainer from '../containers/PageContainer';
import AddStocksForm from '../forms/AddStocksForm';
import AccountStats from '../shared/AccountStats';
import InvestmentCard from '../shared/InvestmentCard';
import { firebaseClient } from '~/clients/firebase-client/firebase-client';
import { useAuth } from '~/lib/firebase';
import { Stock } from '~/clients/firebase-client/models/Investments';

export default function Home() {
  const [investments, setInvestments] = useState<Array<Stock>>([]);
  const [investedAmount, setInvestedAmount] = useState(0);
  const auth = useAuth();
  useEffect(() => {
    if (auth.currentUser?.uid !== undefined) {
      firebaseClient()
        .firestore.investments.stocks.get(auth.currentUser.uid)
        .then(investiments => {
          setInvestments(investiments.stocks);
          setInvestedAmount(investiments.investedAmount);
        });
    }
  }, []);
  return (
    <PageContainer>
      <AccountStats />
      <div className="flex gap-x-4">
        <AddStocksForm />
        <div className="w-full flex flex-col gap-4">
          {investments.map(investment => {
            return <InvestmentCard key={crypto.randomUUID()} {...investment} investedAmount={investedAmount} />;
          })}
        </div>
      </div>
    </PageContainer>
  );
}
