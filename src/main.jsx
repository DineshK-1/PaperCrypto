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
        ],
    },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
    <RouterProvider router={router} />,
);
