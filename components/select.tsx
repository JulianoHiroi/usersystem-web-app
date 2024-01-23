import React from 'react'

type SelectProps = {
  id: string
  name: string
  value?: string
  text: string

  options: { name: string; value: string }[]
  error?: boolean
  className?: string
  handleOnChange: (e: React.ChangeEvent<HTMLSelectElement>) => void
}

const Select: React.FC<SelectProps> = ({
  id,
  name,
  value,
  text,
  options,
  className,
  error,
  handleOnChange,
}) => {
  return (
    <div className="mb-4">
      <label className={className || ''}>{text}</label>
      <select
        id={id}
        name={name}
        value={value}
        onChange={handleOnChange}
        className={
          'block h-10 w-full rounded-md border border-gray-400 p-2 shadow-sm focus:border-black ' +
          (error ? ' border-red-500' : '')
        }
      >
        <option value="">Selecione uma opção</option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.name}
          </option>
        ))}
      </select>
    </div>
  )
}

export default Select
