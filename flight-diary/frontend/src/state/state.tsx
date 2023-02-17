import React, { createContext, useContext, useReducer } from 'react'

import { Action } from './reducer'
import { NonSensitiveDiaryEntry } from '../types'

export type State = {
  diaryEntries: NonSensitiveDiaryEntry[];
}

const initialState: State = {
  diaryEntries: []
}

export const StateContext = createContext<[State, React.Dispatch<Action>]>([
  initialState,
  () => initialState
])

type StateProviderProps = {
  reducer: React.Reducer<State, Action>;
  children: React.ReactElement;
}

export const StateProvider = ({ reducer, children }: StateProviderProps) => {
  const [state, dispatch] = useReducer(reducer, initialState)
  return (
    <StateContext.Provider value={[state, dispatch]}>
      {children}
    </StateContext.Provider>
  )
}
export const useAppState = () => useContext(StateContext)
