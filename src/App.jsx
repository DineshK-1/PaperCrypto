import { Outlet } from 'react-router-dom'
import './App.css'
import NavBar from './Components/NavBar/NavBar.component'

function App() {

  return (
    <>
      <NavBar />
      <div className="main-wrapper flex flex-col">
        <Outlet />
      </div>
      <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200" />
    </>
  )
}

export default App
