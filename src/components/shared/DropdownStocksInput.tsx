import React, { Fragment, useEffect, useState } from 'react';
import { Combobox, Transition } from '@headlessui/react';
import { CheckIcon } from '@heroicons/react/20/solid';
import { useCustomSelector } from '~/hooks/use-custom-selector';
import { firebaseClient } from '~/clients/firebase-client/firebase-client';
import { useDebounce } from '@uidotdev/usehooks';
import useFuzzyStocksUS from '~/hooks/use-fuzzy-stocks-us';

function DropdownStocksInput({
  setTicker,
  country = 'BR',
}: {
  setTicker: (ticker: string) => void;
  country?: 'BR' | 'USA';
}) {
  const [selected, setSelected] = useState('');
  const [query, setQuery] = useState('');
  const debouncedQuery = useDebounce(query, 400);
  const [filteredStocks, setFilteredStocks] = useState<string[]>([]);
  const investments = useCustomSelector(state => state.investments);
  const fuzzyStocksUS = useFuzzyStocksUS();

  useEffect(() => {
    if (query !== '' && query.length > 1 && query.length < 10) {
      if (country === 'USA') {
        fuzzyStocksUS(query, setFilteredStocks);
      } else {
        firebaseClient()
          .functions.fuzzyStocksBR(query)
          .then(response => {
            setFilteredStocks(response);
          });
      }
    }
  }, [debouncedQuery]);

  useEffect(() => {
    if (selected !== '') {
      setTicker(selected);
    }
  }, [selected]);

  useEffect(() => {
    setSelected('');
  }, [investments]);

  return (
    <Combobox value={selected} onChange={setSelected}>
      <div className="relative">
        <div className="relative w-full cursor-default overflow-hidden rounded-lg bg-white text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-white/75 focus-visible:ring-offset-2 focus-visible:ring-offset-teal-300 sm:text-sm">
          <Combobox.Input
            className="input input-bordered w-full max-w-xs"
            placeholder={
              country === 'BR'
                ? 'PETR4, VALE3, MXRF11, etc.'
                : 'AAPL, MSFT, BA, etc.'
            }
            displayValue={() => selected}
            onChange={event => setQuery(event.target.value)}
          />
        </div>
        <Transition
          as={Fragment}
          leave="transition ease-in duration-100"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
          afterLeave={() => setQuery('')}>
          <Combobox.Options className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black/5 focus:outline-none sm:text-sm">
            {filteredStocks.length === 0 && query !== '' ? (
              <div className="relative cursor-default select-none py-2 px-4 text-gray-700">
                Hmm, nada por aqui...
              </div>
            ) : (
              filteredStocks.map(stock => (
                <Combobox.Option
                  key={crypto.randomUUID()}
                  className={({ active }) =>
                    `relative cursor-default select-none py-2 pl-10 pr-4 ${
                      active ? 'bg-primary text-white' : 'text-gray-900'
                    }`
                  }
                  value={stock}>
                  {({ selected, active }) => (
                    <>
                      <span
                        className={`block truncate ${
                          selected ? 'font-medium' : 'font-normal'
                        }`}>
                        {stock}
                      </span>
                      {selected ? (
                        <span
                          className={`absolute inset-y-0 left-0 flex items-center pl-3 ${
                            active ? 'text-white' : 'text-primary'
                          }`}>
                          <CheckIcon className="h-5 w-5" aria-hidden="true" />
                        </span>
                      ) : null}
                    </>
                  )}
                </Combobox.Option>
              ))
            )}
          </Combobox.Options>
        </Transition>
      </div>
    </Combobox>
  );
}

export default React.memo(DropdownStocksInput);
