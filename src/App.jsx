import { Outlet } from 'react-router-dom'
import './App.css'
import NavBar from './Components/NavBar/NavBar.component'

function App() {

  return (
    <>
      <NavBar />
      <div className="main-wrapper">
        <Outlet />
      </div>
    </>
  )
}

export default App
