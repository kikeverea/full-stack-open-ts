import React, { useEffect } from 'react'
import axios from 'axios'

import DiaryList from './diaries/DiaryList'
import { useAppState } from './state/state'
import { setDiaryEntriesList } from './state/reducer'
import { DiaryEntry } from './types'

function App() {

  const [, dispatch] = useAppState()

  useEffect(() => {
    const fetchDiaryEntries = async () => {
      try {
        const response = await axios.get<DiaryEntry[]>('http://localhost:3001/api/diaries')
        dispatch(setDiaryEntriesList(response.data))
      }
      catch (e) {
        if (axios.isAxiosError(e) && e.status && e.response) {
          console.log(`Failed with status ${ e.status }:`)
          console.log(e.response)
        }
        else {
          console.error(e)
        }
      }
    }
    void fetchDiaryEntries()
  },
  [dispatch])

  return (
    <div className="App">
      <DiaryList />
    </div>
  )
}

export default App
