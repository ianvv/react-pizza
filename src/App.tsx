import {RouteObject, useRoutes} from "react-router-dom";

import HomePage from "./pages/HomePage";
import MainLayout from "./layouts/MainLayout";
import CartPage from "./pages/CartPage";
import ErrorPage from "./pages/ErrorPage";
import "./assets/styles/app.scss";


type TRouteItem = RouteObject;

const routes: TRouteItem[] = [
    {
        path: '',
        element: <HomePage/>
    },
    {
        path: '/cart',
        element: <CartPage/>
    },
    {
        path: '/*',
        element: <ErrorPage/>
    }
]


function App() {
    return useRoutes([{path: "/", element: <MainLayout/>, children: routes}]);
}

export default App;