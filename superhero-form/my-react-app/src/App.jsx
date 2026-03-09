import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import {SuperheroForm} from "./components/SuperheroForm.jsx";

function App() {
  const [count, setCount] = useState(0)

  return (
    <SuperheroForm/>
  )
}

export default App
