import React, { useState } from 'react'
import { useAppState } from '../state/state'
import { addDiaryEntry } from '../state/reducer'
import axios from 'axios'
import { DiaryEntry, NewDiaryEntry, Visibility, Weather } from '../types'
import RadioButtons from '../components/RadioButtons'

const NewEntryForm = (): JSX.Element => {

  const [date, setDate] = useState('')
  const [visibility, setVisibility] = useState('')
  const [weather, setWeather] = useState('')
  const [comment, setComment] = useState('')
  const [error, setError] = useState('')

  const [, dispatch] = useAppState()

  const submit = (action: React.FormEvent) => {
    action.preventDefault()

    const newEntry: NewDiaryEntry = {
      date,
      visibility: visibility as Visibility,
      weather: weather as Weather,
      comment
    }

    setDate('')
    setWeather('')
    setVisibility('')
    setComment('')

    void createNewEntry(newEntry)
  }

  const createNewEntry = async (newEntry: NewDiaryEntry) => {
    try {
      const response = await axios.post<DiaryEntry>('http://localhost:3001/api/diaries', newEntry)
      const created: DiaryEntry = response.data

      dispatch(addDiaryEntry(created))
    }
    catch (e) {
      if (axios.isAxiosError(e) && e.response) {
        console.log(e.status)
        console.error(e.response)
        setErrorMessage(e.response.data as string)
      }
      else {
        console.error(e)
      }
    }
  }

  const setErrorMessage = (message: string) => {
    setError(message)
    setTimeout(() => {
      setError('')
    },
      5000)
  }

  return (
    <>
      <h1>Add new entry</h1>
      { error && <h3 style={{ color: 'red' }}>{ error }</h3>}
      <form onSubmit={ submit }>
        <div>
          <label htmlFor='date'>date</label>
          <input name='date' type='date' value={ date }
                 onChange={ ({ target })=> setDate(target.value)}/>
        </div>

        <div>
          visibility&emsp;
          <RadioButtons name='visibility'
                        values={ Object.values(Visibility) }
                        onChange={ setVisibility }/>
        </div>

        <div>
          weather&emsp;
          <RadioButtons name='weather'
                        values={ Object.values(Weather) }
                        onChange={ setWeather }/>
        </div>

        <div>
          <label htmlFor='comment'>comment</label>
          <input name='comment' type='text' value={ comment }
                 onChange={ ({ target })=> setComment(target.value)}/>
        </div>

        <input type="submit" value='submit'/>
      </form>
    </>
  )
}

export default NewEntryForm