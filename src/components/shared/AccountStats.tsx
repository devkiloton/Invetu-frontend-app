export default function AccountStats(props: {
  investedAmount: number;
  currentBalance: number;
}) {
  return (
    <div className="w-full">
      <div className="stats bg-primary text-primary-content w-full bordered">
        <div className="stat border-base-100 border-opacity-20">
          <div className="stat-title text-neutral">Total investido</div>
          <div className="stat-value">R$ {props.investedAmount.toFixed(2)}</div>
        </div>

        <div className="stat border-base-100 border-opacity-20">
          <div className="stat-title text-neutral">Saldo bruto</div>
          <div className="stat-value">R$ {props.currentBalance.toFixed(2)}</div>
        </div>
        <div className="stat border-base-100 border-opacity-20">
          <div className="stat-title text-neutral">Resultado</div>
          <div className="stat-value">
            %{' '}
            {(props.investedAmount === 0
              ? 0
              : (props.currentBalance / props.investedAmount) * 100 - 100
            ).toFixed(2)}
          </div>
        </div>
      </div>
    </div>
  );
}
