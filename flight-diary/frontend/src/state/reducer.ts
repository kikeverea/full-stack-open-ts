import { State } from './state'
import { NonSensitiveDiaryEntry } from '../types'

export type Action =
  | {
    type: 'SET_ENTRIES_LIST'
    payload: NonSensitiveDiaryEntry[]
  }
  | {
    type: 'ADD_ENTRY'
    payload: NonSensitiveDiaryEntry
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
      return {
        ...state,
        diaryEntries: state.diaryEntries.concat(action.payload)
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

export const setDiaryEntriesList = (patientList: NonSensitiveDiaryEntry[]): Action => {
  return {
    type: 'SET_ENTRIES_LIST',
    payload: patientList
  }
}

export const addDiaryEntry = (patient: NonSensitiveDiaryEntry): Action => {
  return {
    type: 'ADD_ENTRY',
    payload: patient
  }
}

export const updateDiaryEntry = (patient: NonSensitiveDiaryEntry): Action => {
  return {
    type: 'UPDATE_ENTRY',
    payload: patient
  }
}