"use client";
import { useCountries } from '@/app/hooks';
import Select from 'react-select';

export interface CountrySelectValue {
  flag: string;
  label: string;
  region: string;
  value: string;
  latlng: number[];
}

interface CountrySelectProps {
  value?: CountrySelectValue;
  onChange: (value: CountrySelectValue) => void;
}

export default function CountrySelect({ value, onChange }: CountrySelectProps) {
  const { getAll } = useCountries();

  return (
    <div>
      <Select
        placeholder="Anywhere"
        isClearable
        options={getAll()}
        value={value}
        onChange={value => onChange(value as CountrySelectValue)}
        formatOptionLabel={(option) => (
          <div className='flex items-center gap-3'>
            <div>
              {option.flag}
            </div>
            <div>
              {option.label}, 
              <span className='text-neutral-500 ml-1'>
                {option.region}
              </span>
            </div>
          </div>
        )}
        classNames={{
          control: () => 'p-3 border-2',
          input: () => 'text-lg',
          option: () => 'text-lg',
        }}
        theme={(theme) => ({
          ...theme,
          borderRadius: 6,
          colors: {
            ...theme.colors,
            primary: 'black',
            primary25: '#ffe4e6'
          }
        })}
      />
    </div>
  )
}