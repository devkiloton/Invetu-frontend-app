import { Listbox, Transition } from '@headlessui/react';
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/react/20/solid';
import React, { FC, Fragment, useCallback, useState } from 'react';

const indexes = ['CDI', 'IPCA', 'Pré-fixado'];

interface IListboxIndexFixedIncome {
  onChange: (index: string) => void;
}

export const ListboxIndexFixedIncome: FC<IListboxIndexFixedIncome> = ({
  onChange,
}) => {
  const [selected, setSelected] = useState(indexes[0]);
  const handleChange = useCallback((index: string) => {
    setSelected(index);
    const indexValue = index === indexes[2] ? 'pre' : index.toLowerCase();
    onChange(indexValue);
  }, []);
  return (
    <div className="w-full glassy-border rounded-md h-12 flex items-center">
      <Listbox value={selected} onChange={handleChange}>
        <div className="relative w-full">
          <Listbox.Button className="relative w-full cursor-default rounded-lg bg-base pl-3 pr-10 text-left focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white/75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm">
            <span className="block truncate">{selected}</span>
            <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
              <ChevronUpDownIcon
                className="h-5 w-5 text-gray-400"
                aria-hidden="true"
              />
            </span>
          </Listbox.Button>
          <Transition
            as={Fragment}
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0">
            <Listbox.Options className="absolute mt-1 max-h-60 z-10 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black/5 focus:outline-none sm:text-sm">
              {indexes.map((economicalIndex, arrIndex) => (
                <Listbox.Option
                  key={arrIndex}
                  className={({ active }) =>
                    `relative cursor-default select-none py-2 pl-10 pr-4 ${
                      active ? 'bg-primary text-white' : 'text-gray-900'
                    }`
                  }
                  value={economicalIndex}>
                  {({ selected, active }) => (
                    <>
                      <span
                        className={`block truncate ${
                          selected ? 'font-medium' : 'font-normal'
                        }`}>
                        {economicalIndex}
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
                </Listbox.Option>
              ))}
            </Listbox.Options>
          </Transition>
        </div>
      </Listbox>
    </div>
  );
};

export default React.memo(ListboxIndexFixedIncome);
