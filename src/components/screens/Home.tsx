import PageContainer from "../containers/PageContainer";
import AddStocksForm from "../forms/AddStocksForm";
import AccountStats from "../shared/AccountStats";

export default function Home() {
  return (
    <PageContainer>
      <AccountStats />
      <AddStocksForm />
    </PageContainer>
  );
}
