import { State } from './state'
import { DiaryEntry, NonSensitiveDiaryEntry } from '../types'

export type Action =
  | {
    type: 'SET_ENTRIES_LIST'
    payload: NonSensitiveDiaryEntry[]
  }
  | {
    type: 'ADD_ENTRY'
    payload: DiaryEntry
  }
  | {
    type: 'UPDATE_ENTRY'
    payload: NonSensitiveDiaryEntry
  }

export const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case 'SET_ENTRIES_LIST':
      return {
        ...state,
        diaryEntries: action.payload
      }
    case 'ADD_ENTRY':
      const entry: DiaryEntry = action.payload
      const nonSensitiveEntry: NonSensitiveDiaryEntry = {
        id: entry.id,
        date: entry.date,
        visibility: entry.visibility,
        weather: entry.weather
      }

      return {
        ...state,
        diaryEntries: state.diaryEntries.concat(nonSensitiveEntry)
      }
    case 'UPDATE_ENTRY':
      const toUpdate = action.payload
      return {
        ...state,
        diaryEntries: state.diaryEntries.map(
          entry => entry.id === toUpdate.id ? toUpdate : entry)
      }
    default:
      return state
  }
}

export const setDiaryEntriesList = (entryList: NonSensitiveDiaryEntry[]): Action => {
  return {
    type: 'SET_ENTRIES_LIST',
    payload: entryList
  }
}

export const addDiaryEntry = (entry: DiaryEntry): Action => {
  return {
    type: 'ADD_ENTRY',
    payload: entry
  }
}

export const updateDiaryEntry = (entry: NonSensitiveDiaryEntry): Action => {
  return {
    type: 'UPDATE_ENTRY',
    payload: entry
  }
}