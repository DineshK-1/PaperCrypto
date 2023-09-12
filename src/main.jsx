import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import CryptoRoute from './Routes/Cryptos/Cryptos.route.jsx';

import {
    createBrowserRouter,
    RouterProvider,
} from "react-router-dom";
import ViewCoin from './Routes/ViewCoin/ViewCoin.component.jsx';
import AuthRoute from './Routes/Auth/Auth.route.jsx';
import { UserProvider } from './Contexts/user.context.jsx';
import ProfileRoute from './Routes/Profile/Profile.route.jsx';
import DashboardRoute from './Routes/Dashboard/Dashboard.component.jsx';
import { CreateDBUser } from './Routes/CreateDBUser/CreateDBUser.route.jsx';

const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        children: [
            {
                path: "Cryptos",
                element: <CryptoRoute />,
            },
            {
                path: "Cryptos/:uid",
                element: <ViewCoin />,
            },
            {
                path: "Auth",
                element: <AuthRoute />,
            },
            {
                path: "Profile",
                element: <ProfileRoute />,
            },
            {
                path: "Dashboard",
                element: <DashboardRoute />,
            },
            {
                path: "CompleteRegisteration",
                element: <CreateDBUser />,
            },
        ],
    },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
    <UserProvider>
        <RouterProvider router={router} />,
    </UserProvider>
);
