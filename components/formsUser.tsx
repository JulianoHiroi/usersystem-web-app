import Input from './input'
import Select from './select'
import { errorFormsUserProps } from '../app/register/page'
import ButtonLoading from './buttonLoading'

type userProps = {
  name: string
  email: string
  gender: string
  date_of_birth: Date
}
export type formsUserProps = {
  handleOnChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  handleOnChangeSelect: (e: React.ChangeEvent<HTMLSelectElement>) => void
  handleOnSubmit: (e: React.FormEvent<HTMLFormElement>) => void
  errors: errorFormsUserProps
  textButton: string
  user?: userProps
  passwordInput: boolean
  DateGenderInput: boolean
  Loading?: boolean
}

export function FormsUser({
  handleOnChange,
  handleOnChangeSelect,
  handleOnSubmit,
  errors,
  textButton,
  user,
  passwordInput,
  DateGenderInput,
  Loading,
}: formsUserProps) {
  const options = [
    { name: 'Masculino', value: 'M' },
    { name: 'Feminino', value: 'F' },
  ]
  return (
    <form className="flex flex-col" onSubmit={handleOnSubmit}>
      <Input
        placeholder="Nome"
        name="name"
        handleOnChange={handleOnChange}
        error={errors.name.value}
        text="Nome completo"
        className="h-20"
        errorMsg="Nome inválido"
        value={user && user.name}
      />
      {DateGenderInput && (
        <div className=" flex justify-between space-x-5 ">
          <Select
            name="gender"
            id="genderSelect"
            text="Genêro : "
            handleOnChange={handleOnChangeSelect}
            options={options}
            error={errors.gender.value}
            value={user && user.gender}
          />
          <div className={'flex flex-col'}>
            <label>Data de nascimento: </label>
            <input
              className={
                (errors.date_of_birth.value ? ' border-red-500' : ' ') +
                ' h-10 rounded-md border border-gray-400 p-2'
              }
              name="date_of_birth"
              value={user && user.date_of_birth.toString()}
              onChange={handleOnChange}
              type="date"
            />
            {errors.date_of_birth.value && (
              <p className="pl-2 text-xs text-red-700">Data é inválida</p>
            )}
          </div>
        </div>
      )}

      <Input
        placeholder="Email"
        name="email"
        handleOnChange={handleOnChange}
        error={errors.email.value}
        text="Email"
        className="h-20"
        errorMsg={errors.email.msg || 'Email inválido'}
        value={user && user.email}
      />
      {passwordInput && (
        <div>
          <Input
            placeholder="Password"
            name="password"
            type="password"
            handleOnChange={handleOnChange}
            error={errors.password.value}
            text="Senha"
            className="h-20"
          />
          <Input
            placeholder="Verify Password"
            name="verifyPassword"
            type="password"
            handleOnChange={handleOnChange}
            error={errors.password.value}
            text="Confirme a senha"
            errorMsg={errors.password.msg || 'Senha inválida'}
            className="h-20"
          />
        </div>
      )}
      {Loading ? (
        <ButtonLoading />
      ) : (
        <button className="rounded-md bg-[#163029] py-2 text-white">
          {textButton}
        </button>
      )}
    </form>
  )
}
