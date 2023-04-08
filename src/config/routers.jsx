import React from "react";
import {
    createBrowserRouter,
} from "react-router-dom";

// import HOME from "../pages/Home"
const LOGIN = React.lazy(() => import("../pages/Login"));
const HOME = React.lazy(() => import("../pages/Home"));

const router = createBrowserRouter([
    {
        path: "/",
        element: <LOGIN />
    },
    {
        path: "/home",
        element: <HOME />
    }
])

export default router;