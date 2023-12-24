import React, { useMemo, useState } from 'react';
import useAddFixedIncome from '~/hooks/use-add-fixed-income';
import {
  FixedIncome,
  FixedIncomeIndex,
} from '~/clients/firebase-client/models/Investments';
import ListboxIndexFixedIncome from '../shared/ListboxIndexFixedIncome';

export default function AddFixedIncomeForm() {
  const [fixedIncomeData, setFixedIncomeData] = useState<FixedIncome>({
    index: FixedIncomeIndex.CDI,
    rateIndex: 0,
    rate: 0,
    startDate: '',
    endDate: '',
    investedAmount: 0,
    currency: 'BRL',
  });

  const addFixedIncome = useAddFixedIncome();

  const handleDateDeposit = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFixedIncomeData({
      ...fixedIncomeData,
      startDate: new Date(event.target.value).toISOString(),
    });
  };

  const handleDateExpire = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFixedIncomeData({
      ...fixedIncomeData,
      endDate: new Date(event.target.value).toISOString(),
    });
  };

  const handleIndexChange = (index: string) => {
    setFixedIncomeData({
      ...fixedIncomeData,
      index: index as FixedIncomeIndex,
    });
  };

  const handleAmountChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFixedIncomeData({
      ...fixedIncomeData,
      investedAmount: event.target.valueAsNumber,
    });
  };

  const rateInput = useMemo(() => {
    switch (fixedIncomeData.index) {
      case FixedIncomeIndex.PRE:
        return <></>;
      case FixedIncomeIndex.IPCA:
        return (
          <span className="uppercase font-semibold min-w-[85px]">ipca +</span>
        );
      default:
        return (
          <span className="uppercase font-semibold min-w-[64px]">cdi</span>
        );
    }
  }, [fixedIncomeData.index]);

  const handleRateIndexChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setFixedIncomeData({
      ...fixedIncomeData,
      rate: event.target.valueAsNumber,
    });
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (fixedIncomeData.investedAmount === 0)
      return alert('Amount is required');
    if (fixedIncomeData.rate === 0) return alert('Rate is required');
    if (fixedIncomeData.startDate === '')
      return alert('Start date is required');
    addFixedIncome(fixedIncomeData);
    setFixedIncomeData({
      ...fixedIncomeData,
      rateIndex: 0,
      rate: 0,
      startDate: '',
      endDate: '',
      investedAmount: 0,
      currency: 'BRL',
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="form-control">
        <label className="label">
          <span className="label-text">Indexador</span>
        </label>
        <ListboxIndexFixedIncome onChange={handleIndexChange} />
      </div>

      <div className="form-control">
        <label className="label">
          <span className="label-text">Rentabilidade %</span>
        </label>
        <label className="input-group">
          {rateInput}
          <input
            onChange={handleRateIndexChange}
            type="number"
            min={0.01}
            step={0.01}
            required
            placeholder={
              fixedIncomeData.index === FixedIncomeIndex.CDI ? '102' : '5,8'
            }
            className="input input-bordered w-full"
          />
          <span>%</span>
        </label>
      </div>
      <div className="form-control">
        <label className="label">
          <span className="label-text">Total investido</span>
        </label>
        <label className="input-group">
          <input
            onChange={handleAmountChange}
            type="number"
            min={0.01}
            step={0.01}
            required
            placeholder="120"
            className="input input-bordered w-full"
          />
          <span>R$</span>
        </label>
      </div>
      <div className="form-control">
        <label className="label">
          <span className="label-text">Data de depósito</span>
        </label>
        <label className="input-group">
          <input
            onChange={handleDateDeposit}
            type="date"
            placeholder="ex. 134"
            required
            className="input input-bordered w-full"
          />
          <span>Data</span>
        </label>
      </div>
      <div className="form-control">
        <label className="label">
          <span className="label-text">Data de vencimento (opcional)</span>
        </label>
        <label className="input-group">
          <input
            onChange={handleDateExpire}
            type="date"
            placeholder="ex. 134"
            className="input input-bordered w-full"
          />
          <span>Data</span>
        </label>
      </div>
      <div className="form-control mt-6">
        <button className="btn btn-primary">Adicionar</button>
      </div>
    </form>
  );
}
