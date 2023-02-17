import React, { useState } from 'react'
import { useAppState } from '../state/state'
import { addDiaryEntry } from '../state/reducer'
import axios from 'axios'
import { DiaryEntry, NewDiaryEntry, Visibility, Weather } from '../types'

const NewEntryForm = (): JSX.Element => {

  const [date, setDate] = useState('')
  const [visibility, setVisibility] = useState('')
  const [weather, setWeather] = useState('')
  const [comment, setComment] = useState('')

  const [, dispatch] = useAppState()

  const submit = (action: React.FormEvent) => {
    action.preventDefault()
    void createNewEntry()

    setDate('')
    setWeather('')
    setVisibility('')
    setComment('')
  }

  const createNewEntry = async () => {
    const parsedVisibility = Object.values(Visibility).find(v => v === visibility)
    const parsedWeather = Object.values(Weather).find(w => w === weather)

    if (!parsedVisibility || !parsedWeather)
      return

    const newEntry: NewDiaryEntry = {
      date,
      visibility: parsedVisibility,
      weather: parsedWeather,
      comment
    }

    try {
      const response = await axios.post<DiaryEntry>('http://localhost:3001/api/diaries', newEntry)
      const created: DiaryEntry = response.data

      dispatch(addDiaryEntry(created))
    }
    catch (e) {
      if (axios.isAxiosError(e)) {
        console.log(e.status)
        console.log(e.message)
      }
      else {
        console.error(e)
      }
    }
  }

  return (
    <form onSubmit={ submit }>
      <div>
        <label htmlFor='date'>date</label>
        <input name='date' type='text' value={ date }
               onChange={ ({ target })=> setDate(target.value)}/>
      </div>

      <div>
        <label htmlFor='visibility'>visibility</label>
        <input name='visibility' type='text' value={ visibility }
               onChange={ ({ target })=> setVisibility(target.value)}/>
      </div>

      <div>
        <label htmlFor='weather'>weather</label>
        <input name='weather' type='text' value={ weather }
               onChange={ ({ target })=> setWeather(target.value)}/>
      </div>

      <div>
        <label htmlFor='comment'>comment</label>
        <input name='comment' type='text' value={ comment }
               onChange={ ({ target })=> setComment(target.value)}/>
      </div>

      <input type="submit" value='submit'/>
    </form>
  )
}

export default NewEntryForm