import React, {lazy, Suspense} from 'react';
import {Navigate} from "react-router-dom";

const Loading = <div>Loading....</div>
const ProductsList =  lazy(() => import("../pages/products/ListPage"))

const ProductsRouter = () => {
    return [
        {
            path: "list",
            element: <Suspense fallback={Loading}><ProductsList/></Suspense>
        },
        {
            path: "",
            element: <Navigate replace to="/products/list"/>
        },
    ]
}

export default ProductsRouter;