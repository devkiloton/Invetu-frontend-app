/* eslint-disable no-case-declarations */
import { isNil, isNull } from 'lodash-es';
import React, { useCallback, useEffect, useState } from 'react';
import {
  FixedIncome,
  FixedIncomeIndex,
} from '~/clients/firebase-client/models/Investments';
import { getProfitCdi } from '~/helpers/get-profit-cdi';
import { useCustomSelector } from '~/hooks/use-custom-selector';
import InvestementCardChart from './InvestementCardChart';
import { getProfitPre } from '~/helpers/get-profit-pre';
import { useDeleteFixedIncome } from '~/hooks/use-delete-fixed-income';

function FixedIncomeCard(
  props: FixedIncome & { investedAmount: number; currentBalance: number },
) {
  const fixedIncomeData = useCustomSelector(
    state => state.investmentsData.fixedIncomes,
  );
  const [chartData, setChartData] = useState<{
    dates: string[];
    prices: number[];
  } | null>(null);
  const [profit, setProfit] = useState(0);

  const investmentsDataStore = useCustomSelector(
    state => state.investmentsData.fixedIncomes,
  );
  const deleteFixedIncome = useDeleteFixedIncome();
  useEffect(() => {
    switch (props.index) {
      case FixedIncomeIndex.CDI:
        getProfitCdi(
          new Date(props.startDate),
          isNil(props?.endDate) ? new Date() : new Date(props.endDate),
          props.amount,
          props.rate,
        ).then(profit => {
          setProfit(profit);
        });
        break;
      case FixedIncomeIndex.PRE:
        const data = getProfitPre(
          new Date(props.startDate),
          isNil(props?.endDate) ? new Date() : new Date(props.endDate),
          props.amount,
          props.rate,
        );
        setProfit(data.totalProfit / props.amount);
        setChartData({
          dates: data.dates.map(date => date.toISOString()),
          prices: data.prices,
        });
        console.log(profit);
        break;
      default:
        break;
    }
  }, [fixedIncomeData]);

  useEffect(() => {
    if (!investmentsDataStore.asyncState.isLoaded) return;
    switch (props.index) {
      case FixedIncomeIndex.CDI:
        const data = investmentsDataStore.cdi.daily
          .map(daily => {
            return {
              date: new Date(daily.data.split('/').reverse().join('-')),
              value: Number(daily.valor),
            };
          })
          .filter(
            dailyFormatted =>
              dailyFormatted.date.getTime() >
                new Date(props.startDate).getTime() &&
              dailyFormatted.date.getTime() <=
                new Date(props?.endDate ?? new Date()).getTime() + 86400000,
          )
          .map(finalValue => ({
            date: finalValue.date.toISOString(),
            value: Number(finalValue.value),
          }));
        const dates = data.map(daily => daily.date);
        // Calculate the daily earnings using the daily taxes with reduce
        const prices = data.reduce(
          (acc, curr) => {
            const lastValue = acc[acc.length - 1];
            const newValue = lastValue * (1 + curr.value / 100);
            return [...acc, newValue];
          },
          [props.amount],
        );
        setChartData({ dates, prices });
        break;
      case FixedIncomeIndex.PRE:
        // Already solved in the useEffect above
        break;
      default:
        break;
    }
  }, [investmentsDataStore]);

  const deleteSelectedFixedIncome = useCallback(() => {
    deleteFixedIncome(props.name);
  }, []);
  return (
    <div className="card bg-base-100 shadow-xl glassy-border z-0">
      <div className="card-body p-4 md:p-8">
        <div className="flex justify-between">
          <div className="flex items-center gap-x-2">
            <img
              className="h-8 w-8 rounded"
              src="https://i1.wp.com/www.showmetech.com.br/wp-content/uploads/2017/04/Negao_da_picona-1.jpg?w=700&ssl=1"
            />

            <h2 className="card-title">{props.name}</h2>
          </div>

          <details className="dropdown dropdown-end">
            <summary className="m-1 btn btn-ghost btn-circle">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 20 20">
                <circle cx="10" cy="4" r="2" fill="currentColor" />
                <circle cx="10" cy="10" r="2" fill="currentColor" />
                <circle cx="10" cy="16" r="2" fill="currentColor" />
              </svg>
            </summary>
            <ul className="p-2 shadow menu dropdown-content z-[1] bg-base-100 rounded-box w-52 glassy-border">
              <li>
                <button onClick={deleteSelectedFixedIncome}>Deletar</button>
              </li>
              <li className="disabled">
                <button>Atualizar</button>
              </li>
              <li className="disabled">
                <button>Informar erro</button>
              </li>
            </ul>
          </details>
        </div>
        {!!profit && (
          <div className="flex flex-col min-[768px]:flex-row gap-x-2">
            <span className="text-sm  font-semibold">
              <span className="text-xs font-normal">Total investido:</span>{' '}
              {new Intl.NumberFormat('pt-BR', {
                style: 'currency',
                currency: 'BRL',
              }).format(props.amount)}
            </span>
            <span className="text-sm  font-semibold">
              <span className="text-xs font-normal">Resultado:</span>{' '}
              {new Intl.NumberFormat('pt-BR', {
                style: 'percent',
                maximumFractionDigits: 2,
              }).format((profit / 100) * 100 - 1)}
            </span>
            {/* <span className="text-sm  font-semibold">
              <span className="text-xs font-normal">Carteira:</span> %{' '}
              {new Intl.NumberFormat('pt-BR', {
                style: 'percent',
                maximumFractionDigits: 2,
              }).format((props.amount * profit) / props.investedAmount)}
            </span> */}
            <span className="text-sm  font-semibold">
              <span className="text-xs font-normal">Balanço: </span>
              {new Intl.NumberFormat('pt-BR', {
                style: 'currency',
                currency: 'BRL',
              }).format(props.amount * profit)}
            </span>
          </div>
        )}
        {!isNull(chartData) && (
          <>
            <h1 className="font-semibold">Variação de preço desde a compra</h1>
            <InvestementCardChart
              dates={chartData.dates}
              prices={chartData.prices}
            />
          </>
        )}

        <div className="card-actions">
          <button disabled className="btn btn-primary w-full">
            Mais detalhes
          </button>
        </div>
      </div>
    </div>
  );
}

export default React.memo(FixedIncomeCard);
