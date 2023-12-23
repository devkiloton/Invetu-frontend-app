import { Fragment, useEffect, useState } from 'react';
import { Combobox, Transition } from '@headlessui/react';
import { CheckIcon } from '@heroicons/react/20/solid';
import { useCustomSelector } from '~/hooks/use-custom-selector';
import Fuse from 'fuse.js';

export default function DropdownCryptoInput({
  setCryptoCurrency,
}: {
  setCryptoCurrency: (ticker: string) => void;
}) {
  const [selected, setSelected] = useState<{
    name: string;
    imageUrl: string;
  }>({ name: '', imageUrl: '' });
  const [query, setQuery] = useState('');
  const [filteredCryptocurrencies, setFilteredCryptocurrencies] = useState<
    Array<{
      name: string;
      imageUrl: string;
    }>
  >([]);
  const statusCryptos = useCustomSelector(
    state => state.investmentsData.cryptos.statusCryptos,
  );

  useEffect(() => {
    const cryptos = statusCryptos.map(crypto => {
      return {
        id: crypto.id,
        symbol: crypto.symbol,
        name: crypto.name,
        imageUrl: crypto.icon,
      };
    });
    const fuseOptions = {
      keys: ['id', 'symbol', 'name'],
    };

    const fuse = new Fuse(cryptos, fuseOptions);

    const fuseResult = fuse.search(query).map(result => result.item);
    setFilteredCryptocurrencies(fuseResult);
  }, [query]);

  useEffect(() => {
    if (selected.name !== '') {
      setCryptoCurrency(selected.name);
    }
  }, [selected]);

  useEffect(() => {
    setSelected({
      name: '',
      imageUrl: '',
    });
  }, [statusCryptos]);

  return (
    <Combobox value={selected} onChange={setSelected}>
      <div className="relative">
        <div className="relative w-full cursor-default overflow-hidden rounded-lg bg-white text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-white/75 focus-visible:ring-offset-2 focus-visible:ring-offset-teal-300 sm:text-sm">
          <Combobox.Input
            className="input input-bordered w-full max-w-xs"
            placeholder="Bitcoin, Ethereum, Tether, etc."
            displayValue={() => selected.name}
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
            {filteredCryptocurrencies.length === 0 && query !== '' ? (
              <div className="relative cursor-default select-none py-2 px-4 text-gray-700">
                Hmm, nada por aqui...
              </div>
            ) : (
              filteredCryptocurrencies.map(crypto => (
                <Combobox.Option
                  key={crypto.name}
                  className={({ active }) =>
                    `relative cursor-default select-none py-2 pl-4 pr-4 ${
                      active ? 'bg-primary text-white' : 'text-gray-900'
                    }`
                  }
                  value={crypto}>
                  {({ selected, active }) => (
                    <div className="flex gap-3">
                      <img
                        className="w-5"
                        src={crypto.imageUrl}
                        alt={`${crypto.name} photo`}
                      />
                      <span
                        className={`block truncate ${
                          selected ? 'font-medium' : 'font-normal'
                        }`}>
                        {crypto.name}
                      </span>
                      {selected ? (
                        <span
                          className={`absolute inset-y-0 left-0 flex items-center pl-3 ${
                            active ? 'text-white' : 'text-primary'
                          }`}>
                          <CheckIcon className="h-5 w-5" aria-hidden="true" />
                        </span>
                      ) : null}
                    </div>
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
