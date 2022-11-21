import {Routes, Route} from "react-router-dom";
import {lazy, Suspense} from "react";

import "./assets/styles/app.scss";
import HomePage from "./pages/HomePage";
import MainLayout from "./layouts/MainLayout";


const CartPage = lazy(() => import(/* webpackChunkName: "CartPage" */ "./pages/CartPage"));
const ErrorPage = lazy(() => import(/* webpackChunkName: "ErrorPage" */ "./pages/ErrorPage"));

function App() {

    return (
        <Routes>
            <Route path='/' element={<MainLayout/>}>
                <Route path='' element={<HomePage/>}/>
                <Route path='cart' element={
                    <Suspense fallback={<div>Cart loading...</div>}>
                        <CartPage/>
                    </Suspense>
                }/>
                <Route path='*' element={
                    <Suspense fallback={<div>Error loading...</div>}>
                        <ErrorPage/>
                    </Suspense>
                }/>
            </Route>
        </Routes>
    );
}

export default App;