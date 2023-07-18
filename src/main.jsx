import React, { createContext, useState } from 'react'
import ReactDOM from 'react-dom/client'
import { App } from './App'
import "./styles/app.scss"

export const Context = createContext({ isAuthenticated: false })

const AppWraper = () => {
  const [ isAuthenticated, setIsAuthenticated ] = useState(true)
  const [loading,setLoading]=useState(false)
  const [user,setUser]=useState({})
  return (
    <Context.Provider
      value={{
        isAuthenticated,
        setIsAuthenticated,
        loading,
        setLoading,
        user,
        setUser
      }}>
      < App />
    </Context.Provider>
  )

}




ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AppWraper />
  </React.StrictMode>,
)
