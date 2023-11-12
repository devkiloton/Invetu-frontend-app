
export default function AccountStats() {
    return (
      <div className="w-full p-4">
            
    <div className="stats bg-primary text-primary-content w-full">
  
  <div className="stat">
    <div className="stat-title">Account balance</div>
    <div className="stat-value">$89,400</div>
    <div className="stat-actions">
      <button className="btn btn-sm btn-success">Add funds</button>
    </div>
  </div>
  
  <div className="stat">
    <div className="stat-title">Current balance</div>
    <div className="stat-value">$89,400</div>
    <div className="stat-actions gap-x-2 flex">
      <button className="btn btn-sm">Withdrawal</button> 
      <button className="btn btn-sm">deposit</button>
    </div>
  </div>
  <div className="stat">
    <div className="stat-title">Account balance</div>
    <div className="stat-value">$89,400</div>
                </div>
                <div className="stat">
    <div className="stat-title">Account balance</div>
    <div className="stat-value">$89,400</div>
  </div>
</div>

      </div>
  )
}
