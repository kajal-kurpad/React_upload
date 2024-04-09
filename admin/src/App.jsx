import { useState } from 'react'
import viteLogo from '/vite.svg'
import './App.css'
import Navbar from './Components/Navbar/Navbar'
import Admin from './Pages/Admin/Admin'


const App = () => {
  return (
    <div>
    <Navbar />
    <Admin />
    </div>
  )
}

export default App