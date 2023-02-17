import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'

import { StateProvider } from './state/state'
import { reducer } from './state/reducer'

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
)
root.render(
  <StateProvider reducer={ reducer }>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </StateProvider>
)
