import React from 'react'
import './utils/multilang/i18nconfig'
import ThemeContext from './utils/theme/ThemeContext'
import { Provider } from 'react-redux'
import { RouterProvider } from 'react-router-dom'
import route from './routes'
import store from './redux/store'
import ThemeButton from './utils/theme/ThemeButton'
import './App.css'
import CanvasProvider, { CanvasContext } from './utils/canvas/CanvasProvider'
const App = () => {
  return (
          <ThemeContext>
            <CanvasProvider>
    <Provider store={store}>
        <RouterProvider router={route}/>
    </Provider>
    </CanvasProvider>
    </ThemeContext>
  )
}

export default App