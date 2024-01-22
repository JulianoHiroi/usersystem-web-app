type InputProps = {
  placeholder?: string
  value?: string
  name: string
  type?: string
  error?: boolean
  className?: string
  text: string
  errorMsg?: string
  handleOnChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}
const inputCSS = 'rounded-md border border-gray-400 p-2 h-10'

const Input: React.FC<InputProps> = ({
  placeholder,
  value,
  name,
  type,
  error,
  className,
  text,
  errorMsg,
  handleOnChange,
}) => {
  'use client'

  return (
    <div className={'flex flex-col' + (className ? ' ' + className : '')}>
      <label>{text}</label>
      <input
        className={(error ? ' border-red-500' : ' ') + ' ' + inputCSS}
        name={name}
        value={value}
        onChange={handleOnChange}
        type={type || 'text'}
        placeholder={placeholder}
      />
      {error && errorMsg && (
        <p className="pl-2 text-xs text-red-700">{errorMsg}</p>
      )}
    </div>
  )
}

export default Input
