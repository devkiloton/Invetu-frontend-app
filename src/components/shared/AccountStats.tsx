export default function AccountStats(props: { investedAmount: number; currentBalance: number }) {
  
  return (
    <div className="w-full">
      <div className="stats bg-primary text-primary-content w-full bordered">
        <div className="stat border-base-100 border-opacity-20">
          <div className="stat-title text-neutral">Total invested</div>
          <div className="stat-value">R$ {props.investedAmount.toFixed(2)}</div>
        </div>

        <div className="stat border-base-100 border-opacity-20">
          <div className="stat-title text-neutral">Current balance</div>
          <div className="stat-value">R$ {props.currentBalance.toFixed(2)}</div>
        </div>
        <div className="stat border-base-100 border-opacity-20">
          <div className="stat-title text-neutral">Profit</div>
          <div className="stat-value">
            % {((props.currentBalance / (props.investedAmount === 0 ? 1 : props.investedAmount)) * 100).toFixed(2)}
          </div>
        </div>
        <div className="stat border-base-100 border-opacity-20">
          <div className="stat-title text-neutral">Profit this month</div>
          <div className="stat-value">% TBI</div>
        </div>
      </div>
    </div>
  );
}
