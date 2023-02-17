import { useAppState } from '../state/state'

const DiaryList = (): JSX.Element | null => {

  const [state,] = useAppState()

  if (!state)
    return null

  return (
    <>
      <h1>Diary Entries</h1>
      { state.diaryEntries.map(entry =>
        <div key={ entry.id }>
          <h2>{ entry.date }</h2>
          <div>{ `visibility: ${ entry.visibility }` }</div>
          <div>{ `weather: ${ entry.weather }` }</div>
        </div>
      )}
    </>
  )
}

export default DiaryList