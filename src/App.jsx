import { Outlet, useLocation, useNavigate } from 'react-router-dom'
import './App.css'
import NavBar from './Components/NavBar/NavBar.component'
import { useContext, useEffect, useState } from 'react'
import { UserContext } from './Contexts/user.context'
import { FetchDBData } from './Helpers/API_Calls'

function App() {
  const { user, setDBUser } = useContext(UserContext);

  const navigate = useNavigate();

  const location = useLocation();

  const [userCreated, setUserCreated] = useState(false);

  useEffect(() => {
    if (location.pathname != "/CompleteRegisteration") {
      if (user) {
        if (!userCreated) {
          FetchDBData(user.uid).then((res) => {
            if (!res) {
              setUserCreated(false);
              navigate("/CompleteRegisteration")
            } else {
              setUserCreated(true);
            }
            return res
          })
        }
      }
    }
  }, [user, userCreated, location])

  useEffect(() => {
    if (user) {
      FetchDBData(user.uid).then((res) => {
        setDBUser(res);
      })
    }

  }, [user, location])

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

export default App;
