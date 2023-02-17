import React from 'react'

type Props = {
  name: string
  values: string[]
  onChange: (value: string) => void
}

const RadioButtons = ({ name, values, onChange }: Props): JSX.Element =>
  <>
    { values.map(item =>
      <>
        <label htmlFor={ name }>{ item }</label>
        <input key={ item }
               name={ name }
               type='radio'
               value={ item }
               onChange={ ({ target })=> onChange(target.value)}/>
      </>
    )}
  </>

export default RadioButtons