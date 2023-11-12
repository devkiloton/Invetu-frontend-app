export default function AddStocksForm() {
  return (
  <div className="hero-content  max-w-120">
    
    
    <div className="card flex-shrink-0 w-full bg-base-100">
      <form className="card-body">
        <div className="form-control">
        
  <label className="label" >
    <span className="label-text">Ticker</span>
            </label>
      <input type="text" placeholder="PETR4, SANB3..." className="input input-bordered w-full max-w-[200px]" />
            </div>
      <div className="form-control">
        
  <label className="label">
    <span className="label-text">Enter price</span>
  </label>
  <label className="input-group">
    <input type="text" placeholder="10" className="input input-bordered" />
    <span>BRL</span>
  </label>
          </div>
          <div className="form-control">
  <label className="label">
    <span className="label-text">Enter amount</span>
  </label>
  <label className="input-group">
    <input type="text" placeholder="ex. 134" className="input input-bordered" />
    <span>Stocks</span>
  </label>
</div>
        <div className="form-control mt-6">
          <button className="btn btn-primary">Login</button>
        </div>
      </form>
    </div>
  </div>

  )
}
