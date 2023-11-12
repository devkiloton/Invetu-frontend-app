import { Stock } from '~/clients/firebase-client/models/Investments'

export default function InvestmentCard(props: Stock) {
  return (
      <>
          
          <div className="card w-full bg-base-100 shadow-xl bordered border-2 z-0">
  <div className="card-body">
                  <h2 className="card-title">{props.ticker}</h2>
                  <div className='flex gap-x-2'>
                      

                  <span className='text-sm  font-semibold'><span className='text-xs font-normal'>Amount:</span> {props.amount}</span>
                  <span className='text-sm  font-semibold'><span className='text-xs font-normal'>Price:</span> R$ {props.price}</span>
                  </div>
                  <span>Profit:</span>
                    <span>Wallet %:</span>
    <div className="card-actions">
      <button className="btn btn-primary w-full">Edit</button>
    </div>
  </div>
</div>
    </>
  )
}
